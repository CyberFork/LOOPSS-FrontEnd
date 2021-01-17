// import w3 from "../assets/js/web3.js";
// console.log('index.js', w3)
// import { icLoopsMeContract, icLOOPTokenContract, icPoolContract } from 'assets/js/web3';
import store from '@/store'
import LoopssMe_ABI from '../assets/js/ABI_LoopssMe.json'
import LOOPToken_ABI from '../assets/js/ABI_LOOPToken.json'
import LOOPPool_ABI from '../assets/js/ABI_LOOPPool.json'
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Fortmatic from "fortmatic";
import Portis from "@portis/web3";
import Torus from "@toruslabs/torus-embed";
import Authereum from "authereum";
import ethProvider from "eth-provider";
import BurnerConnectProvider from "@burner-wallet/burner-connect-provider";
const { MaxUint256 } = require('@ethersproject/constants')
const INFURA_ID = "1dda3dbddd50408985bc9d37e709db89"
const FORTMATIC_KEY = "pk_test_8F16BED4B4CD6116" // for FORTMATIC testing
//const FORTMATIC_KEY = "pk_live_2B03A1C18B07A58D" //for FORTMATIC production
const PORTIS_ID = "1de60dd1-e77a-4efa-9278-93319070fef9" //https://dashboard.portis.io/
export const CONNECT_EVENT = "connect";
export const ERROR_EVENT = "error";
export const CLOSE_EVENT = "close";

const providerOptions = {
  /* See Provider Options Section */
  injected: {
    display: {
      // logo: "data:image/gif;base64,INSERT_BASE64_STRING",
      // name: "Injected",
      description: "Connect with the provider in your Browser"
    },
    package: null
  },
  // Example with WalletConnect provider
  walletconnect: {
    display: {
      //logo: "data:image/gif;base64,INSERT_BASE64_STRING",
      //name: "Mobile",
      description: "Scan qrcode with your mobile wallet"
    },
    package: WalletConnectProvider,
    options: {
      infuraId: INFURA_ID // required
    }
  },
  fortmatic: {
    package: Fortmatic, // required
    options: {
      key: FORTMATIC_KEY // required
    }
  },
  portis: {
    package: Portis, // required
    options: {
      id: PORTIS_ID // required
    }
  },
  torus: {
    package: Torus, // required
    options: {
      networkParams: {
        host: "https://localhost:8545", // optional
        chainId: 1337, // optional
        networkId: 1337 // optional
      },
      config: {
        buildEnv: "development" // optional
      }
    }
  },
  authereum: {
    package: Authereum // required
  },
  frame: {
    package: ethProvider // required
  },
  // bitski: {  // 无法完成注册
  //   package: Bitski, // required
  //   options: {
  //     clientId: "BITSKI_CLIENT_ID", // required
  //     callbackUrl: "BITSKI_CALLBACK_URL" // required
  //   }
  // }
  // arkane: { // 依赖包无法安装
  //   package: Arkane, // required
  //   options: {
  //     clientId: ARKANE_CLIENT_ID // required
  //   }
  // },
  // dcentwallet: { //需要搭建服务器
  //   package: DcentProvider, // required
  //   options: {
  //     rpcUrl: "INSERT_RPC_URL" // required
  //   }
  // }
  burnerconnect: {
    package: BurnerConnectProvider, // required
    options: {
      defaultNetwork: "100"
    }
  }
};

// connect wallet
export const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/

const web3js = async () => {
  // return Promise.resolve(await initProvider())
  const { web3 } = await Api.login()
  console.log('web3js, web3 :', web3)
  return Promise.resolve(web3)
}

// ethereum.autoRefreshOnNetworkChange = true
// ethereum.send('eth_requestAccounts').then((res) => {
//   console.log(res)
// })
// Address
var adLoopssMe = '0x8E4DfCF7fa2425eC9950f9789D2EB92142bb0C86'
var adLOOPToken = '0x880E7Df34378712107AcdaCF705c2257Bf42b1A5'
var adLOOPPool = '0x8e4A3E9280f53c0b82c9b64998D4847BCA2AD9A7'
// console.log(parseInt(ethereum.chainId), adLOOPPool);
// //TODO:ethereum.chainId 有时候获取不到，这里就需要阻塞等待，当ethereum.chainId获取到了之后才继续执行后面的。否则会报错。
// switch (parseInt(ethereum.chainId)) {
//   case 42:
//     adLOOPPool = '0xD1E97844Ad40c9B53Aa51EA38e6928011D027f1A';
//     break;
//   case 100:
//     adLOOPPool = '0x89434bfc9708623317F964774708cF9f11963e01';
//     break;
//   default:
//     adLOOPPool = '0x89434bfc9708623317F964774708cF9f11963e01';
//     break;
// }
// Contract Instance
let icLoopsMeContract
let icLOOPTokenContract
let icPoolContract
function initContract(web3) {
  icLoopsMeContract = new web3.eth.Contract(LoopssMe_ABI, adLoopssMe)
  icLOOPTokenContract = new web3.eth.Contract(LOOPToken_ABI, adLOOPToken)
  icPoolContract = new web3.eth.Contract(LOOPPool_ABI, adLOOPPool)
}

const Api = {
  async login(params) {
    let provider
    let web3 = store.state.web3
    //登录
    console.log('Api login')
    if (web3) {
      let account = await web3.eth.getAccounts().then((res) => { return res[0] })
      store.dispatch('SetUser', account)
      store.dispatch('SetWeb3', web3)
      return { web3, account }
    }

    console.log('Api login new web3')
    const web3Modal = new Web3Modal({
      //network: "mainnet", // optional
      cacheProvider: false, // optional
      providerOptions, // required
      theme: {
        background: "#00C1DCaa",
        main: "rgb(255, 255, 255,.721)",
        secondary: "rgb(255, 255, 255,.65)",
        border: "#1890ffbb",
        hover: "#00E983"
      }
    });
    web3Modal.onConnect((aa) => {
      console.log('web3Modal.onConnect aa:', aa)
      web3Modal.toggleModal()
    })
    web3Modal.on(CONNECT_EVENT, (aa) => {
      console.log('CONNECT_EVENT aa:', aa)
      store.dispatch('SetWalletSelecting', false)
    })
    console.log('Api login before connect')
    store.dispatch('SetWalletSelecting', true) //set loading
    provider = await web3Modal.connect();
    if (!provider) {
      console.log('provider is null:', provider)
      return {}
    }
    console.log('Api login after connect')
    console.log('provider:', provider)
    web3 = new Web3(provider);
    store.dispatch('SetWeb3', web3)
    console.log('web3:', web3)
    // Subscribe to accounts change
    provider.on("accountsChanged", (accounts) => {
      console.log('accountsChanged', accounts);
      store.dispatch('Logout')
      store.dispatch('Login')
    });

    // Subscribe to chainId change
    provider.on("chainChanged", (chainId) => {
      console.log('chainChanged', chainId);
      switch (parseInt(chainId)) {
        case 42:
          adLOOPPool = '0x8e4A3E9280f53c0b82c9b64998D4847BCA2AD9A7'
          initContract(web3)
          break
        case 56://BSC
          adLOOPPool = "0x697c8EF8f85cddD090Bb126746C71d72637c04F4";
          initContract(web3)
          break
        case 100:
          adLOOPPool = '0x8e4A3E9280f53c0b82c9b64998D4847BCA2AD9A7'
          initContract(web3)
          break
        default:
          // adLOOPPool = '0x89434bfc9708623317F964774708cF9f11963e01';
          break
      }
    });

    // Subscribe to provider connection
    provider.on("connect", (info) => {
      console.log('connect', info);
    });

    // Subscribe to provider disconnection
    provider.on("disconnect", (error) => {
      console.log('disconnect', error);
    });

    initContract(web3)

    console.log('icLoopsMeContract:', icLoopsMeContract)
    console.log('icLOOPTokenContract:', icLOOPTokenContract)
    console.log('icPoolContract:', icPoolContract)

    const account = await web3.eth.getAccounts().then((res) => { return res[0] })
    store.dispatch('SetUser', account)
    return { web3, account }
  },
  logout() {
    //登出
    return Promise.resolve()
  },
  async getInfo() {
    if (!web3js()) return
    return web3js().then(async (web3) => {
      // 理论产出
      const myDate = new Date()
      const dTime = parseInt(myDate.getTime() / 10000) - 160897528//直接得到的第三个Trust时间戳
      const theoryP = ((dTime) * 0.01)
      // 已挖出并包装：
      const _minedTotal = this._formatBigNumber(await icPoolContract.methods.totalMined().call())
      // await icLOOPTokenContract.methods.totalSupply().call()
      // 挖矿信任数：
      const _trustTotal = await icPoolContract.methods.totalMiningTrust().call() //全网信任量
      //首页-总量信息
      return Promise.resolve({
        total: theoryP, //总计已产出
        minedTotal: _minedTotal, //已经被挖出
        trustTotal: _trustTotal
      })
    })
  },
  getPrice() {
    //首页-获取当前loop价格
    return Promise.resolve('∞')
  },
  // 数据处理方法
  _formatBigNumber(_bn) {
    if (!web3js()) return
    return web3js().then(async (web3) => {
      // return web3js.utils.fromWei(_bn, 'ether');
      console.log('web3.utils!!!!')
      console.log('web3!:', web3)
      return parseFloat(web3.utils.fromWei(_bn, 'ether'))//.toLocaleString();
      // parseFloat().toLocaleString();
    })
  },
  //时间格式化
  _getDateTime(time) {
    if (time >= 60 && time <= 3600) {
      time = parseInt(time / 60) + ':' + time % 60
    } else {
      if (time > 3600) {
        time = parseInt(time / 3600) + ':' + parseInt(((time % 3600) / 60)) + ':' + time % 60
      } else {
        time = time + '秒'
      }
    }
    return time
  },
  async getMyInfo() {
    if (!web3js()) return
    return web3js().then(async (web3) => {
      console.log('store.state.user:', store.state.user)
      const account = store.state.user
      // 被信任数量计算还需信任数量
      const myTrustCount = (await icLoopsMeContract.methods.getAccountInfoOf(account).call()).beenTrustCount
      const needTrust = myTrustCount > 3 ? 0 : 3 - myTrustCount
      // 获取未领取数量
      const unClaim = this._formatBigNumber(await icPoolContract.methods.unClaimOf(account).call())
      // 获取当前未包装余额
      const unWrappedLOOP = this._formatBigNumber(await icLoopsMeContract.methods.minterBalanceOf(adLOOPToken, account).call())
      // 获取当前已经包装余额
      // 获取当前信任挖矿算力
      const myMiningTrustCount = await icPoolContract.methods.minerTrustCount(account).call()
      // 获取上次挖矿时间，以及计算离24小时距离
      const myLastUpdateTime = await icPoolContract.methods.minerLastUpdateTime(account).call()
      const myDate = new Date()
      const dTime = 86400 - (parseInt(myDate.getTime() / 1000) - (myLastUpdateTime))//直接得到的第三个Trust时间戳
      const remindTime = this._getDateTime(dTime)
      // 判定是否Trust了LOOP
      let _ifTrustLOOP
      if (parseInt(await icLoopsMeContract.methods.getProportionReceiverTrustedSender(account, adLOOPToken).call()) > 0) {
        _ifTrustLOOP = true
      } else {
        _ifTrustLOOP = false
      }
      console.log(_ifTrustLOOP)
      //挖矿-获取个人信息
      return Promise.resolve({
        needInviteCount: needTrust, //仍然需要邀请人数
        unClaimTokens: unClaim, //待领取
        curToken: unWrappedLOOP, //当前未包装余额
        trustCalc: myMiningTrustCount, //信任算力
        time: remindTime,
        ifTrustLOOP: _ifTrustLOOP
        // time: parseInt(myLastUpdateTime) === 0 ? 'Never' : myLastUpdateTime // 最近挖矿的更新时间
      })
    })
  },
  async updateAndClaim() {
    if (!web3js()) return
    return web3js().then(async (web3) => {
      const account = store.state.user
      //挖矿-收取token & 更新算力
      const myTrustCount = (await icLoopsMeContract.methods.getAccountInfoOf(account).call()).beenTrustCount
      const needTrust = myTrustCount > 3 ? 0 : 3 - myTrustCount

      if (parseInt(needTrust) === 0) {
        await icPoolContract.methods.claim().send({ from: account })
        return Promise.resolve(true)
      } else {
        return Promise.resolve(false)
      }
    })
  },
  async wrappToken(_curToken) {
    if (!web3js()) return
    return web3js().then(async (web3) => {
      const account = store.state.user
      //检测是否Approve给LOOPToken合约
      const approved = await icLoopsMeContract.methods.allowance(account, adLOOPToken, adLOOPToken).call()
      if (parseInt(approved) === parseInt(0)) {
        // await icLoopsMeContract.methods.approve(adLOOPToken, adLOOPToken, web3js.utils.toBN('115792089237316195423570985008687907853269984665640564039457584007913129639935')).send({ from: account });
        await icLoopsMeContract.methods.approve(adLOOPToken, adLOOPToken, MaxUint256).send({ from: account })
        return Promise.resolve(false)
      } else {
        await icLOOPTokenContract.methods.wrap(web3.utils.toBN(web3.utils.toWei(String(_curToken)))).send({ from: account })
        return Promise.resolve(true)
      }
      // 如果是，则调用wrap方法
      // 如果不是，则调用approve
      // await icLOOPTokenContract.methods
    })
  },
  async getTrustMe() {
    if (!web3js()) return
    return web3js().then(async (web3) => {
      const account = store.state.user
      const allTrustMe = (await icLoopsMeContract.getPastEvents('TrustEvent', { filter: { BeenTrusted: account }, fromBlock: 0 })).reverse()
      const trustSet = []
      const filter = {}
      for (let i = 0; i < allTrustMe.length; i++) {
        if (filter[allTrustMe[i].returnValues.TrustSender] === undefined && allTrustMe[i].returnValues.TrustType < 2) {
          filter[allTrustMe[i].returnValues.TrustSender] = true
          if (parseInt(allTrustMe[i].returnValues.TrustType) !== 0) {
            trustSet.push(allTrustMe[i])
          }
        }
      }
      //挖矿-获取我信任的人
      // console.log(trustSet)
      return Promise.resolve({
        total: trustSet.length,
        list: trustSet
      })
    })
  },
  async getMyTrusts() {
    if (!web3js()) return
    return web3js().then(async (web3) => {
      const account = store.state.user
      const allTrustMe = (await icLoopsMeContract.getPastEvents('TrustEvent', { filter: { TrustSender: account }, fromBlock: 0 })).reverse()
      const trustSet = []
      const filter = {}
      for (let i = 0; i < allTrustMe.length; i++) {
        if (filter[allTrustMe[i].returnValues.BeenTrusted] === undefined && allTrustMe[i].returnValues.TrustType < 2) {
          filter[allTrustMe[i].returnValues.BeenTrusted] = true
          if (parseInt(allTrustMe[i].returnValues.TrustType) !== 0) {
            trustSet.push(allTrustMe[i])
          }
        }
      }
      //挖矿-获取我信任的人
      // console.log(trustSet)
      return Promise.resolve({
        total: trustSet.length,
        list: trustSet
      })
    })
  },
  async searchByAdress(_address) {
    if (!web3js()) return
    return web3js().then(async (web3) => {
      const account = store.state.user
      //挖矿-获取我信任的人
      const myTrustValueTo = await icLoopsMeContract.methods.getProportionReceiverTrustedSender(account, _address).call()
      const toTrustValueMe = await icLoopsMeContract.methods.getProportionReceiverTrustedSender(_address, account).call()
      const _trustType = myTrustValueTo * toTrustValueMe > 0 ? 3 : myTrustValueTo === toTrustValueMe ? 0 : parseInt(myTrustValueTo) === 0 ? 1 : 2 //1已信任您 2您已信任 3互相信任
      console.log(_trustType)
      return Promise.resolve({
        total: 1,
        list: [{
          address: _address,
          trustType: _trustType,
          time: '2020-03-04 13:44:23'
        }]
        // }, {
        //   address: 'x0565555555555',
        //   trustType: 2,
        //   time: '2020-03-04 13:44:23'
        // }, {
        //   address: 'x0565555555555',
        //   trustType: 3,
        //   time: '2020-03-04 13:44:23'
        // }, {
        //   address: 'x0565555555555',
        //   trustType: 2,
        //   time: '2020-03-04 13:44:23'
        // }, {
        //   address: 'x0565555555555',
        //   trustType: 1, //1已信任您 2您已信任 3互相信任
        //   time: '2020-03-04 13:44:23'
        // }, {
        //   address: 'x0565555555555',
        //   trustType: 2,
        //   time: '2020-03-04 13:44:23'
        // }, {
        //   address: 'x0565555555555',
        //   trustType: 3,
        //   time: '2020-03-04 13:44:23'
        // }, {
        //   address: 'x0565555555555',
        //   trustType: 2,
        //   time: '2020-03-04 13:44:23'
        // }]
      })
    })
  },
  async addTrust(_address) {
    if (!web3js()) return
    return web3js().then(async (web3) => {
      const account = store.state.user
      //挖矿-对某地址添加信任
      const trustV = web3.utils.toWei('0.101')
      console.log(_address, trustV)
      await icLoopsMeContract.methods.transfer(_address, trustV).send({ from: account })
      // await icPoolContract.methods.claim().send({ from: account });
      return Promise.resolve()
    })
  },
  async minusTrust(_address) {
    if (!web3js()) return
    console.log('web3js():', web3js())
    return web3js().then(async (web3) => {
      const account = store.state.user
      //挖矿-对某地址删除信任
      const trustV = web3.utils.toWei('0')
      await icLoopsMeContract.methods.transfer(_address, trustV).send({ from: account })
      return Promise.resolve()
    })
  }
}
export default Api
