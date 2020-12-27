// import w3 from "../assets/js/web3.js";
// console.log('index.js', w3)
// import { icLoopsMeContract, icLOOPTokenContract, icPoolContract } from 'assets/js/web3';
// TODO ： 如何引入web3.js的合约对象？
import LoopssMe_ABI from '../assets/js/ABI_LoopssMe.json';
import LOOPToken_ABI from '../assets/js/ABI_LOOPToken.json';
import LOOPPool_ABI from '../assets/js/ABI_LOOPPool.json';
// Address
var adLoopssMe = '0x8E4DfCF7fa2425eC9950f9789D2EB92142bb0C86';
var adLOOPToken = '0x880E7Df34378712107AcdaCF705c2257Bf42b1A5';
var adLOOPPool = '0x89434bfc9708623317F964774708cF9f11963e01';
// Contract Instance
let icLoopsMeContract;
let icLOOPTokenContract;
let icPoolContract;
// connect wallet
let web3js = new Web3(web3.currentProvider);
let ethereum = window.ethereum;
ethereum.autoRefreshOnNetworkChange = true;
ethereum.enable();
// 成功之后这个会返回当前选择的账户
web3js.eth.getAccounts().then(function (accounts) {
  //现在只能使用then异步的方式返回单个了
  console.log('Now account:', accounts);
});

icLoopsMeContract = new web3js.eth.Contract(LoopssMe_ABI, adLoopssMe);
icLOOPTokenContract = new web3js.eth.Contract(LOOPToken_ABI, adLOOPToken);
icPoolContract = new web3js.eth.Contract(LOOPPool_ABI, adLOOPPool);
console.log(icLOOPTokenContract)
console.log(icLoopsMeContract)

const Api = {
  login(params) {
    //登录
    let myAccount = web3.eth.defaultAccount;
    return Promise.resolve(myAccount)
  },
  logout() {
    //登出
    return Promise.resolve()
  },
  async getInfo() {
    // 理论产出
    let myDate = new Date();
    let dTime = myDate.getTime() - 1608975280000;//直接得到的第三个Trust时间戳
    let theoryP = (dTime / 10000) * 0.01
    // 已挖出并包装：
    let _wrapped = await icLOOPTokenContract.methods.totalSupply().call()
    // 挖矿信任数：
    let _trustTotal = await icPoolContract.methods.totalMiningTrust().call() //全网信任量
    //首页-总量信息
    return Promise.resolve({
      total: theoryP, //总计已产出
      miningedTotal: _wrapped, //已经被挖出
      trustTotal: _trustTotal
    })
  },
  getPrice() {
    //首页-获取当前loop价格
    return Promise.resolve("∞")
  },
  async getMyInfo() {
    // 被信任数量计算还需信任数量
    let myTrustCount = (await icLoopsMeContract.methods.getAccountInfoOf(web3.eth.defaultAccount).call()).beenTrustCount;
    let needTrust = myTrustCount > 3 ? 0 : 3 - myTrustCount;
    // 获取未领取数量
    let unClaim = await icPoolContract.methods.unClaimOf(web3.eth.defaultAccount).call()
    // 获取当前未包装余额
    let unWrappedLOOP = await icLoopsMeContract.methods.minterBalanceOf(adLOOPToken, web3.eth.defaultAccount).call();
    // 获取当前已经包装余额
    // 获取当前信任挖矿算力
    let myMiningTrustCount = await icPoolContract.methods.minerTrustCount(web3.eth.defaultAccount).call()
    // 获取上次挖矿时间，以及计算离24小时距离
    let myLastUpdateTime = await icPoolContract.methods.minerLastUpdateTime(web3.eth.defaultAccount).call()
    //挖矿-获取个人信息
    return Promise.resolve({
      needInviteCount: needTrust, //仍然需要邀请人数
      unClaimTokens: unClaim, //待领取
      curToken: unWrappedLOOP, //当前未包装余额
      trustCalc: myMiningTrustCount, //信任算力
      time: parseInt(myLastUpdateTime) === 0 ? 'Never' : myLastUpdateTime // 最近挖矿的更新时间
    })
  },
  async updateAndClaim() {
    //挖矿-收取token & 更新算力
    let myTrustCount = (await icLoopsMeContract.methods.getAccountInfoOf(web3.eth.defaultAccount).call()).beenTrustCount;
    let needTrust = myTrustCount > 3 ? 0 : 3 - myTrustCount;

    if (parseInt(needTrust) === 0) {
      await icPoolContract.methods.claim().send({ from: web3.eth.defaultAccount });
      return Promise.resolve(true)
    } else {
      return Promise.resolve(false)
    }
  },
  getMyTrusts() {
    //挖矿-获取我信任的人
    return Promise.resolve({
      total: 30,
      list: [{
        address: 'x0565555555555',
        isAdd: 1, //true-已信任 false-未信任
        time: '2020-03-04 13:44:23'
      }, {
        address: 'x0565555555555',
        isAdd: 0,
        time: '2020-03-04 13:44:23'
      }, {
        address: 'x0565555555555',
        isAdd: 0,
        time: '2020-03-04 13:44:23'
      }, {
        address: 'x0565555555555',
        isAdd: 0,
        time: '2020-03-04 13:44:23'
      }, {
        address: 'x0565555555555',
        isAdd: 1, //1已信任您 2您已信任 3互相信任
        time: '2020-03-04 13:44:23'
      }, {
        address: 'x0565555555555',
        isAdd: 1,
        time: '2020-03-04 13:44:23'
      }, {
        address: 'x0565555555555',
        isAdd: 0,
        time: '2020-03-04 13:44:23'
      }, {
        address: 'x0565555555555',
        isAdd: 1,
        time: '2020-03-04 13:44:23'
      }]
    })
  },
  searchByAdress(address) {
    //挖矿-获取我信任的人
    return Promise.resolve({
      total: 30,
      list: [{
        address: 'x0565555555555',
        trustType: 1, //1已信任您 2您已信任 3互相信任
        time: '2020-03-04 13:44:23'
      }, {
        address: 'x0565555555555',
        trustType: 2,
        time: '2020-03-04 13:44:23'
      }, {
        address: 'x0565555555555',
        trustType: 3,
        time: '2020-03-04 13:44:23'
      }, {
        address: 'x0565555555555',
        trustType: 2,
        time: '2020-03-04 13:44:23'
      }, {
        address: 'x0565555555555',
        trustType: 1, //1已信任您 2您已信任 3互相信任
        time: '2020-03-04 13:44:23'
      }, {
        address: 'x0565555555555',
        trustType: 2,
        time: '2020-03-04 13:44:23'
      }, {
        address: 'x0565555555555',
        trustType: 3,
        time: '2020-03-04 13:44:23'
      }, {
        address: 'x0565555555555',
        trustType: 2,
        time: '2020-03-04 13:44:23'
      }]
    })
  },
  addTrust(address) {
    //挖矿-对某地址添加信任
    return Promise.resolve()
  },
  minusTrust(address) {
    //挖矿-对某地址删除信任
    return Promise.resolve()
  }
}
export default Api
