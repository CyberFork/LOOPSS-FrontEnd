// import w3 from "../assets/js/web3.js";
// console.log('index.js', w3)
// import { icLoopsMeContract, icLOOPTokenContract, icPoolContract } from 'assets/js/web3';
import store from '@/store'
import { errorNotic } from 'assets/js/util.js'
import LoopssMe_ABI from 'assets/js/ABI_LoopssMe.json'
import LOOPToken_ABI from 'assets/js/ABI_LOOPToken.json'
import LOOPPool_ABI from 'assets/js/ABI_LOOPPool.json'
import Web3 from 'web3'

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
const web3js = new Web3()
const cfx = window.confluxJS;
const conflux = window.conflux
const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/

// Address
var adLoopssMe = '0x868957d1dfdcdc5ebd44b891c3fa5d6b0405e475'
var adLOOPToken = '0x8adeed9ba5656855622877825f7971fd475fe1b3'
var adLOOPPool = '0x81c9d190af86325421e5500baab4d23b1bf350a8'
// console.log(parseInt(conflux.chainId), adLOOPPool);
// //TODO:conflux.chainId 有时候获取不到，这里就需要阻塞等待，当conflux.chainId获取到了之后才继续执行后面的。否则会报错。
// switch (parseInt(conflux.chainId)) {
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

function initContract() {
  //TODO 更新ABI到最新
  icLoopsMeContract = cfx.Contract({
    abi: LoopssMe_ABI,
    address: adLoopssMe
  })
  icLOOPTokenContract = cfx.Contract({
    abi: LOOPToken_ABI,
    address: adLOOPToken
  })
  icPoolContract = cfx.Contract({
    abi: LOOPPool_ABI,
    address: adLOOPPool
  })
  store.dispatch('setLOOPToken', adLOOPToken)
}

if (cfx && conflux) {
  conflux.autoRefreshOnNetworkChange = true
  conflux.on('accountsChanged', function (accounts) {
    store.dispatch('Logout')
    store.dispatch('Login')
  })
  initContract()
}
// conflux.on('networkChanged', function (networkId) {
//   switch (parseInt(networkId)) {
//     case 42://kovan
//       adLOOPPool = '0x8e4A3E9280f53c0b82c9b64998D4847BCA2AD9A7'
//       initContract()
//       break
//     case 56://BSC
//       adLOOPPool = "0x697c8EF8f85cddD090Bb126746C71d72637c04F4";
//       initContract()
//       break
//     case 100://xdai
//       adLOOPPool = '0x8e4A3E9280f53c0b82c9b64998D4847BCA2AD9A7'
//       initContract()
//       break
//     default:
//       // adLOOPPool = '0x89434bfc9708623317F964774708cF9f11963e01';
//       break
//   }
// })

//TODO: 检测钱包是否连接，连接的情况下才显示页面。未连接时显示提示连接钱包页面。类似noscript

const Api = {
  //TODO研究如何在切换时新增账号连接
  login(params) {
    //登录
    if (!cfx || !conflux) {
      errorNotic('请安装 Conflux Portal 或在 conflux浏览器中运行')
      return Promise.reject(new Error('不支持conflux'))
    }
    if (cfx.defaultAccount) {
      return Promise.resolve({
        account: cfx.defaultAccount
      })
    }
    return conflux.enable()
      .then(function (accounts) {
        //现在只能使用then异步的方式返回单个了
        console.log('Now account:', accounts);
        if (!accounts) {
          errorNotic('No address')
          return;
        }
        return {
          account: accounts[0]
        }
      });
  },
  logout() {
    //登出
    return Promise.resolve()
  },
  async getInfo() {
    // 理论产出
    const myDate = new Date()
    const dTime = parseInt(myDate.getTime() / 10000) - 160897528 //直接得到的第三个Trust时间戳
    const theoryP = ((dTime) * 0.01)
    // 已挖出并包装：
    const _minedTotal = this._formatBigNumber(await icPoolContract.totalMined().call())
    // await icLOOPTokenContract.totalSupply().call()
    // 挖矿信任数：
    const _trustTotal = await icPoolContract.totalMiningTrust().call() //全网信任量
    //首页-总量信息
    return Promise.resolve({
      total: theoryP, //总计已产出
      minedTotal: _minedTotal, //已经被挖出
      trustTotal: _trustTotal && _trustTotal.length ? _trustTotal[0] : 0
    })
  },
  getPrice() {
    //首页-获取当前loop价格
    return Promise.resolve('∞')
  },
  // 数据处理方法
  _formatBigNumber(_bn) {
    // return web3js.utils.fromWei(_bn, 'ether');
    return parseFloat(web3js.utils.fromWei(String(_bn), 'ether')) //.toLocaleString();
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
        time = time + ' s'
      }
    }
    return time
  },
  async getMyInfo() {
    // 被信任数量计算还需信任数量
    const myTrustCount = (await icLoopsMeContract.getAccountInfoOf(cfx.defaultAccount).call()).beenTrustCount
    const needTrust = myTrustCount > 3 ? 0 : 3 - myTrustCount
    // 获取未领取数量
    const unClaim = this._formatBigNumber(await icPoolContract.unClaimOf(cfx.defaultAccount).call())
    // 获取当前未包装余额
    const unWrappedLOOP = this._formatBigNumber(await icLoopsMeContract.minterBalanceOf(adLOOPToken, cfx.defaultAccount).call())
    // 获取当前已经包装余额
    // 获取当前信任挖矿算力
    const myMiningTrustCount = await icPoolContract.minerTrustCount(cfx.defaultAccount).call()
    // 获取上次挖矿时间，以及计算离24小时距离
    const myLastUpdateTime = await icPoolContract.minerLastUpdateTime(cfx.defaultAccount).call()
    const myDate = new Date()
    var dTime = 86400 - (parseInt(myDate.getTime() / 1000) - (myLastUpdateTime)) //直接得到的第三个Trust时间戳
    if (dTime < 0) {
      dTime = 0
    }
    const remindTime = this._getDateTime(dTime)
    // 判定是否Trust了LOOP
    let _ifTrustLOOP
    if (parseInt(await icLoopsMeContract.getProportionReceiverTrustedSender(cfx.defaultAccount, adLOOPToken).call()) > 0) {
      _ifTrustLOOP = true
    } else {
      _ifTrustLOOP = false
    }

    //挖矿-获取个人信息
    return Promise.resolve({
      needInviteCount: needTrust, //仍然需要邀请人数
      unClaimTokens: unClaim, //待领取
      curToken: unWrappedLOOP, //当前未包装余额
      trustCalc: myMiningTrustCount && myMiningTrustCount.length ? myMiningTrustCount[0] : 0, //信任算力
      time: remindTime,
      ifTrustLOOP: _ifTrustLOOP
      // time: parseInt(myLastUpdateTime) === 0 ? 'Never' : myLastUpdateTime // 最近挖矿的更新时间
    })
  },
  async updateAndClaim() {
    //挖矿-收取token & 更新算力
    const myTrustCount = (await icLoopsMeContract.getAccountInfoOf(cfx.defaultAccount).call()).beenTrustCount
    const needTrust = myTrustCount > 3 ? 0 : 3 - myTrustCount

    if (parseInt(needTrust) === 0) {
      await icPoolContract.claim().sendTransaction({
        from: cfx.defaultAccount
      });
      return Promise.resolve(true)
    } else {
      return Promise.resolve(false)
    }
  },
  async wrappToken(_curToken) {
    //检测是否Approve给LOOPToken合约
    console.log(cfx.defaultAccount, 'da')
    const approved = await icLoopsMeContract.allowance(cfx.defaultAccount, adLOOPToken, adLOOPToken).call()
    if (parseInt(approved) < parseInt(1)) {
      // await icLoopsMeContract.approve(adLOOPToken, adLOOPToken, web3js.utils.toBN('115792089237316195423570985008687907853269984665640564039457584007913129639935')).sendTransaction({ from: cfx.defaultAccount });
      await icLoopsMeContract.approve(adLOOPToken, adLOOPToken, MaxUint256).sendTransaction({
        from: cfx.defaultAccount
      })
      return Promise.resolve(false)
    } else {
      await icLOOPTokenContract.wrap(web3js.utils.toBN(web3js.utils.toWei(String(parseFloat(_curToken) - 0.0001)))).sendTransaction({
        from: cfx.defaultAccount
      })
      return Promise.resolve(true)
    }
    // 如果是，则调用wrap方法
    // 如果不是，则调用approve
    // await icLOOPTokenContract.methods
  },
  async getTrustMe() {
    // const allTrustMe = (await icLoopsMeContract.getPastEvents('TrustEvent', { filter: { BeenTrusted: cfx.defaultAccount }, fromBlock: 0 })).reverse()
    const trustSet = []
    // const filter = {}
    // for (let i = 0; i < allTrustMe.length; i++) {
    //   if (filter[allTrustMe[i].returnValues.TrustSender] === undefined && allTrustMe[i].returnValues.TrustType < 2) {
    //     filter[allTrustMe[i].returnValues.TrustSender] = true
    //     if (parseInt(allTrustMe[i].returnValues.TrustType) !== 0) {
    //       trustSet.push(allTrustMe[i])
    //     }
    //   }
    // }
    //挖矿-获取我信任的人
    // console.log(trustSet)
    const myTrustCount = (await icLoopsMeContract.getAccountInfoOf(cfx.defaultAccount).call()).beenTrustCount
    return Promise.resolve({
      total: myTrustCount && myTrustCount.length ? myTrustCount[0] : 0,
      list: trustSet
    })
  },
  async getMyTrusts() {
    // const allTrustMe = (await icLoopsMeContract.getPastEvents('TrustEvent', { filter: { TrustSender: cfx.defaultAccount }, fromBlock: 0 })).reverse()
    const trustSet = []
    // const filter = {}
    // for (let i = 0; i < allTrustMe.length; i++) {
    //   if (filter[allTrustMe[i].returnValues.BeenTrusted] === undefined && allTrustMe[i].returnValues.TrustType < 2) {
    //     filter[allTrustMe[i].returnValues.BeenTrusted] = true
    //     if (parseInt(allTrustMe[i].returnValues.TrustType) !== 0) {
    //       trustSet.push(allTrustMe[i])
    //     }
    //   }
    // }
    //挖矿-获取我信任的人
    // console.log(trustSet)
    return Promise.resolve({
      total: 'Developing...',
      list: trustSet
    })
  },
  async searchByAdress(_address) {
    //挖矿-获取我信任的人
    const myTrustValueTo = await icLoopsMeContract.getProportionReceiverTrustedSender(cfx.defaultAccount, _address).call()
    const toTrustValueMe = await icLoopsMeContract.getProportionReceiverTrustedSender(_address, cfx.defaultAccount).call()
    const _trustType = myTrustValueTo * toTrustValueMe > 0 ? 3 : (myTrustValueTo < 1) && (toTrustValueMe < 1) ? 0 : parseInt(myTrustValueTo) === 0 ? 1 : 2 //1已信任您 2您已信任 3互相信任
    // console.log(myTrustValueTo * toTrustValueMe, myTrustValueTo < 1, parseInt(myTrustValueTo), myTrustValueTo, toTrustValueMe, _trustType)
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
    console.log('addTrust', _address, trustV, cfx.defaultAccount)
    await icLoopsMeContract.transfer(_address, trustV).sendTransaction({
      from: cfx.defaultAccount
    });
    // await icPoolContract.claim().sendTransaction({ from: cfx.defaultAccount });
    return Promise.resolve()
  },
  async minusTrust(_address) {
    //挖矿-对某地址删除信任
    const trustV = web3js.utils.toWei('0')
    await icLoopsMeContract.transfer(_address, trustV).sendTransaction({
      from: cfx.defaultAccount
    })
    return Promise.resolve()
  },
  checkAddress(address) {
    if (!ADDRESS_REGEX.test(address)) {
      errorNotic('地址错误')
      return false
    }
    return true
  }
}

export default Api
