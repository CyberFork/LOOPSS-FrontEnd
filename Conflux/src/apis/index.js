import { Web3js, Login } from 'assets/js/web3'
console.log(Web3js)
const Api = {
  login() {
    //登录
    return Login().then(res => {
      return res[0]
    })
  },
  logout() {
    //登出
    return Promise.resolve()
  },
  getInfo() {
    //首页-总量信息
    return Promise.resolve({
      total: 66666666, //总计已产出
      miningedTotal: 33333, //已经被挖出
      trustTotal: 3453 //全网信任量
    })
  },
  getPrice() {
    //首页-获取当前loop价格
    return Promise.resolve(52.25)
  },
  getMyInfo() {
    //挖矿-获取个人信息
    return Promise.resolve({
      needInviteCount: 3, //仍然需要邀请人数
      curToken: 43534, //当前余额
      unClaimTokens: 3254, //待领取
      trustCalc: 23422, //信任算力
      time: 35345
    })
  },
  updateAndClaim() {
    //挖矿-收取token & 更新算力
    return Promise.resolve()
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
  searchByAdress(address){
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
  addTrust(address){
    //挖矿-对某地址添加信任
    return Promise.resolve()
  },
  minusTrust(address){
    //挖矿-对某地址删除信任
    return Promise.resolve()
  }
}
export default Api
