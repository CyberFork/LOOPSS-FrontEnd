import LoopssMe_ABI from './ABI_LoopssMe.json'
import LOOPToken_ABI from './ABI_LOOPToken.json'
import LOOPPool_ABI from './ABI_LOOPPool.json'
// Address
var adLoopssMe = '0x8E4DfCF7fa2425eC9950f9789D2EB92142bb0C86'
var adLOOPToken = '0x880E7Df34378712107AcdaCF705c2257Bf42b1A5'
var adLOOPPool = '0x89434bfc9708623317F964774708cF9f11963e01'
// Contract Instance
let icLoopsMeContract
let icLOOPTokenContract
let icPoolContract
// web3 connect
let netWork
const web3js = new Web3(web3.currentProvider)
const ethereum = window.ethereum
ethereum.autoRefreshOnNetworkChange = true
ethereum.enable()
// 成功之后这个会返回当前选择的账户
web3js.eth.getAccounts().then(function (accounts) {
    //现在只能使用then异步的方式返回单个了
    console.log('Now account:', accounts)
})
// delay metamask connection
var lt = self.setInterval(connectNetwork, 1000)
var connected = false
function connectNetwork() {
    if (connected === false) {
        const networkId = parseInt(ethereum.chainId)
        switch (networkId) {
            case 42://kovan
                netWork = 'Kovan'
                icLoopsMeContract = new web3js.eth.Contract(LoopssMe_ABI, adLoopssMe)
                icLOOPTokenContract = new web3js.eth.Contract(LOOPToken_ABI, adLOOPToken)
                icPoolContract = new web3js.eth.Contract(LOOPPool_ABI, adLOOPPool)
                console.log(icPoolContract)
                connected = true
                break
            case 1337://tf
                netWork = 'Localhost'
                icLoopsMeContract = new web3js.eth.Contract(LoopssMe_ABI, adLoopssMe)
                icLOOPTokenContract = new web3js.eth.Contract(LOOPToken_ABI, adLOOPToken)
                icPoolContract = new web3js.eth.Contract(LOOPPool_ABI, adLOOPPool)
                connected = true
                break
            case 1://mainnet
                netWork = 'Ethereum'
                icLoopsMeContract = new web3js.eth.Contract(LoopssMe_ABI, adLoopssMe)
                icLOOPTokenContract = new web3js.eth.Contract(LOOPToken_ABI, adLOOPToken)
                icPoolContract = new web3js.eth.Contract(LOOPPool_ABI, adLOOPPool)
                connected = true
                break
            // case 56://BSC
            //    netWork = 'BSC'
            //     LoopContract = new web3js.eth.Contract(Loop_ABI, LoopsAddress);
            //     break;
            default:
                break
        }
        // app.intervalRefresh();
        console.log(icPoolContract)
    } else {
        // self.setInterval("app.intervalRefresh()", 20000);
        clearInterval(lt)
    }
}
console.log(connectNetwork)
console.log(icLoopsMeContract)
console.log(icLOOPTokenContract)
console.log(icPoolContract)
console.log(netWork)
// export default w3
