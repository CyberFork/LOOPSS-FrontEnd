from simple_http_server import request_map
from simple_http_server import Request
import simple_http_server.server as server
import time
import networkx as nx
from web3 import Web3
import numpy as np
import threading
import json
import simple_http_server.server as server
from simple_http_server import request_map, Request

def event_filter():
    w3 = Web3(Web3.HTTPProvider('https://bsc-dataseed.binance.org/'))
    contract = w3.eth.contract(address="0x697c8EF8f85cddD090Bb126746C71d72637c04F4",abi=json.load(open("P:/share/devFolder/truffle/Loops.funV2/web3/Graph/loop_abi.json","r")))
    event_filter = contract.events.TrustEvent().createFilter(fromBlock=0,toBlock="latest")
    return event_filter

event_filter = event_filter()

def on_event(graph,event):
    if event.TrustType == 1:
        graph.add_edge(event.BeenTrusted.lower(), event.TrustSender.lower(), weight=0)
    elif event.TrustType == 2:
        ratio = event.TrustValue/1e18
        graph.add_edge(event.BeenTrusted.lower(), event.TrustSender.lower(), weight=np.log(ratio))

def init_graph():
    global event_filter

    graph = nx.DiGraph()

    for event in event_filter.get_all_entries():
        print(f"Get Event {event}")
        on_event(graph,event.args)

    return graph

graph = init_graph()

def graph_refresher_slave():
    global graph, event_filter
    for event in event_filter.get_new_entries():
        print(f"Get Event {event}")
        on_event(graph,event.args)


def graph_refresher():
    while True:
        graph_refresher_slave()
        time.sleep(2)


graph_refresher_thread = threading.Thread(target=graph_refresher)
graph_refresher_thread.start()

def shortest_path(requester, aim):
    global graph

    try:
        path = nx.bellman_ford_path(graph,requester.lower(),aim.lower())
        answer = dict(outcomeStatus=0, result=path)
    except nx.NetworkXUnbounded:
        answer = dict(outcomeStatus=1, errorMsg="Arbitrage opportunities found, but we can not do it automatically now")
    except:
        answer = dict(outcomeStatus=1, errorMsg="No avaliable path found")
    finally:
        return answer

@request_map("/", method=["GET"])
def http_query(req=Request()):
    param = req.parameter
    print(param)
    answer = shortest_path(param["requester"],param["aim"])
    return json.dumps(answer)

server.start(host="127.0.0.1", port=9999)