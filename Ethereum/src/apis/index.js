// import w3 from "../assets/js/web3.js";
// console.log('index.js', w3)
// import { icLoopsMeContract, icLOOPTokenContract, icPoolContract } from 'assets/js/web3';
import Vue from 'vue'
import store from '@/store'
import LoopssMe_ABI from '../assets/js/ABI_LoopssMe.json'
import LOOPToken_ABI from '../assets/js/ABI_LOOPToken.json'
import LOOPPool_ABI from '../assets/js/ABI_LOOPPool.json'
const {

  // AddressZero,
  // HashZero,

  // EtherSymbol,

  // NegativeOne,
  // Zero,
  // One,
  // Two,

  // WeiPerEther,
  MaxUint256

} = require('@ethersproject/constants')
// import userApi from "./user";
// connect wallet
export const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/
const web3js = new Web3(web3.currentProvider)
ethereum.autoRefreshOnNetworkChange = true
ethereum.send('eth_requestAccounts').then((res) => {
  console.log(res)
})
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
initContract()
function initContract() {
  icLoopsMeContract = new web3js.eth.Contract(LoopssMe_ABI, adLoopssMe)
  icLOOPTokenContract = new web3js.eth.Contract(LOOPToken_ABI, adLOOPToken)
  icPoolContract = new web3js.eth.Contract(LOOPPool_ABI, adLOOPPool)
}
ethereum.on('networkChanged', function (networkId) {
  switch (parseInt(networkId)) {
    case 42:
      adLOOPPool = '0x8e4A3E9280f53c0b82c9b64998D4847BCA2AD9A7'
      initContract()
      break
    case 100:
      adLOOPPool = '0x8e4A3E9280f53c0b82c9b64998D4847BCA2AD9A7'
      initContract()
      break
    default:
      // adLOOPPool = '0x89434bfc9708623317F964774708cF9f11963e01';
      break
  }
})
ethereum.on('accountsChanged', function (accounts) {
  store.dispatch('Logout')
  store.dispatch('Login')
})
//TODO: 检测钱包是否连接，连接的情况下才显示页面。未连接时显示提示连接钱包页面。类似noscript
const app = new Vue()
function errorNotic(message) {
  app.$notification.error({
    duration: 0,
    message
  })
}

const Api = {
  login(params) {
    //登录
    return web3js.eth.getAccounts()
      .then(res => {
        return res[0]
      })
      .catch(err => {
        errorNotic(JSON.stringify(err))
      })
  },
  logout() {
    //登出
    return Promise.resolve()
  },
  async getInfo() {
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
  },
  getPrice() {
    //首页-获取当前loop价格
    return Promise.resolve('∞')
  },
  // 数据处理方法
  _formatBigNumber(_bn) {
    // return web3js.utils.fromWei(_bn, 'ether');
    return parseFloat(web3js.utils.fromWei(_bn, 'ether'))//.toLocaleString();
    // parseFloat().toLocaleString();
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
    // 被信任数量计算还需信任数量
    const myTrustCount = (await icLoopsMeContract.methods.getAccountInfoOf(web3.eth.defaultAccount).call()).beenTrustCount
    const needTrust = myTrustCount > 3 ? 0 : 3 - myTrustCount
    // 获取未领取数量
    const unClaim = this._formatBigNumber(await icPoolContract.methods.unClaimOf(web3.eth.defaultAccount).call())
    // 获取当前未包装余额
    const unWrappedLOOP = this._formatBigNumber(await icLoopsMeContract.methods.minterBalanceOf(adLOOPToken, web3.eth.defaultAccount).call())
    // 获取当前已经包装余额
    // 获取当前信任挖矿算力
    const myMiningTrustCount = await icPoolContract.methods.minerTrustCount(web3.eth.defaultAccount).call()
    // 获取上次挖矿时间，以及计算离24小时距离
    const myLastUpdateTime = await icPoolContract.methods.minerLastUpdateTime(web3.eth.defaultAccount).call()
    const myDate = new Date()
    const dTime = 86400 - (parseInt(myDate.getTime() / 1000) - (myLastUpdateTime))//直接得到的第三个Trust时间戳
    const remindTime = this._getDateTime(dTime)
    // 判定是否Trust了LOOP
    let _ifTrustLOOP
    if (parseInt(await icLoopsMeContract.methods.getProportionReceiverTrustedSender(web3.eth.defaultAccount, adLOOPToken).call()) > 0) {
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
  },
  async updateAndClaim() {
    //挖矿-收取token & 更新算力
    const myTrustCount = (await icLoopsMeContract.methods.getAccountInfoOf(web3.eth.defaultAccount).call()).beenTrustCount
    const needTrust = myTrustCount > 3 ? 0 : 3 - myTrustCount

    if (parseInt(needTrust) === 0) {
      await icPoolContract.methods.claim().send({ from: web3.eth.defaultAccount })
      return Promise.resolve(true)
    } else {
      return Promise.resolve(false)
    }
  },
  async wrappToken(_curToken) {
    //检测是否Approve给LOOPToken合约
    const approved = await icLoopsMeContract.methods.allowance(web3.eth.defaultAccount, adLOOPToken, adLOOPToken).call()
    if (parseInt(approved) === parseInt(0)) {
      // await icLoopsMeContract.methods.approve(adLOOPToken, adLOOPToken, web3js.utils.toBN('115792089237316195423570985008687907853269984665640564039457584007913129639935')).send({ from: web3.eth.defaultAccount });
      await icLoopsMeContract.methods.approve(adLOOPToken, adLOOPToken, MaxUint256).send({ from: web3.eth.defaultAccount })
      return Promise.resolve(false)
    } else {
      await icLOOPTokenContract.methods.wrap(web3js.utils.toBN(web3js.utils.toWei(String(_curToken)))).send({ from: web3.eth.defaultAccount })
      return Promise.resolve(true)
    }
    // 如果是，则调用wrap方法
    // 如果不是，则调用approve
    // await icLOOPTokenContract.methods
  },
  async getTrustMe() {
    const allTrustMe = (await icLoopsMeContract.getPastEvents('TrustEvent', { filter: { BeenTrusted: web3.eth.defaultAccount }, fromBlock: 0 })).reverse()
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
  },
  async getMyTrusts() {
    const allTrustMe = (await icLoopsMeContract.getPastEvents('TrustEvent', { filter: { TrustSender: web3.eth.defaultAccount }, fromBlock: 0 })).reverse()
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
  },
  async searchByAdress(_address) {
    //挖矿-获取我信任的人
    const myTrustValueTo = await icLoopsMeContract.methods.getProportionReceiverTrustedSender(web3.eth.defaultAccount, _address).call()
    const toTrustValueMe = await icLoopsMeContract.methods.getProportionReceiverTrustedSender(_address, web3.eth.defaultAccount).call()
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
  },
  async addTrust(_address) {
    //挖矿-对某地址添加信任
    const trustV = web3js.utils.toWei('0.101')
    console.log(_address, trustV)
    await icLoopsMeContract.methods.transfer(_address, trustV).send({ from: web3.eth.defaultAccount })
    // await icPoolContract.methods.claim().send({ from: web3.eth.defaultAccount });
    return Promise.resolve()
  },
  async minusTrust(_address) {
    //挖矿-对某地址删除信任
    const trustV = web3js.utils.toWei('0')
    await icLoopsMeContract.methods.transfer(_address, trustV).send({ from: web3.eth.defaultAccount })
    return Promise.resolve()
  }
}
export default Api
