import Loop_ABI from './abi/ABI_Loop'
import LOOPPool_ABI from './abi/ABI_LOOPPool'
import LoopssMe_ABI from './abi/ABI_LoopssMe'
import LOOPToken_ABI from './abi/ABI_LOOPToken'

// Address
let adLoopssMe = '0x8E4DfCF7fa2425eC9950f9789D2EB92142bb0C86';
let adLOOPToken = '0x880E7Df34378712107AcdaCF705c2257Bf42b1A5';
let adLOOPPool = '0x89434bfc9708623317F964774708cF9f11963e01';
// Contract Instance
let icLoopsMeContract;
let icLOOPTokenContract;
let icPoolContract;

// web3 connect
let web3js = new Web3(web3.currentProvider);
// let ethereum = window.ethereum;
let conflux = window.conflux;
const cfx = window.confluxJS;

let blockHeight;

async function intervalRefresh() {
  await getBlockHeight();
  await getLoopTotalSupply();
}
//获取区块高度
function getBlockHeight() {
  cfx.getEpochNumber()
    .then(height => {
      blockHeight = height
    })
}

function getLoopTotalSupply() {
  icLoopsMeContract.methods.totalSupply().call()
    .then(rst => {
      this.TotalSupply = this._formatBigNumber(rst);
    })
}

conflux.autoRefreshOnNetworkChange = true;
conflux.enable();

// delay portal connection
var lt = self.setInterval(connectNetwork, 6000);
var connected = false;
function connectNetwork() {
  let networkId;
  if (connected === false) {
    networkId = parseInt(conflux.chainId);
    switch (networkId) {
      case 1029: //mainNet
        // app.netWork = 'Localhost'
        console.log('cfxMain')
        icLoopsMeContract = cfx.Contract(LoopssMe_ABI, adLoopssMe);
        icLOOPTokenContract = cfx.Contract(LOOPToken_ABI, adLOOPToken);
        icPoolContract = cfx.Contract(LOOPPool_ABI, adLOOPPool);
        connected = true;
        break;
      case 1: //testNet
        // app.netWork = 'Ethereum'
        console.log('cfxTest')
        icLoopsMeContract = cfx.Contract(LoopssMe_ABI, adLoopssMe);
        icLOOPTokenContract = cfx.Contract(LOOPToken_ABI, adLOOPToken);
        icPoolContract = cfx.Contract(LOOPPool_ABI, adLOOPPool);
        connected = true;
        break;
      case 42: //kovan
        // app.netWork = 'Kovan'
        icLoopsMeContract = cfx.Contract(LoopssMe_ABI, adLoopssMe);
        icLOOPTokenContract = cfx.Contract(LOOPToken_ABI, adLOOPToken);
        icPoolContract = cfx.Contract(LOOPPool_ABI, adLOOPPool);
        connected = true;
        break;
      case 56://BSC
        // app.netWork = 'BSC'
        LoopContract = cfx.Contract(Loop_ABI, LoopsAddress);
        break;
      default:
        break;
    }
    intervalRefresh();
  } else {
    self.setInterval(intervalRefresh, 20000);
    clearInterval(lt);
  }
  console.log('icLoopsMeContract', icLoopsMeContract)
  console.log('icLOOPTokenContract', icLOOPTokenContract)
  console.log('icPoolContract', icPoolContract)
}

export const BlockHeight = blockHeight
export const Web3js = web3js

export function Login() {
  // 成功之后这个会返回当前选择的账户
  return cfx.getAccounts()
}
