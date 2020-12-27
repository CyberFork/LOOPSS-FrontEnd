import antd from 'ant-design-vue/es/locale-provider/zh_CN'
import momentCN from 'moment/locale/zh-cn'

const components = {
  antLocale: antd,
  momentName: 'zh-cn',
  momentLocale: momentCN
}

const locale = {
  hello: '您好',
  error: '错误',
  copyError: '复制失败，请您重试',
  slogan: '信任驱动，无需质押',
  menu: {
    'home': '首页',
    'mining': '挖矿',
    'trust': '信任',
    'more': '查看更多'
  },
  head: {
    login: '登录',
    logout: '退出登录'
  },
  home: {
    info: {
      title: 'LOOP是未来的信任网络',
      slogan: '为使数百万人加入，我们准备以信任关系分发未来货币',
      totalTip: '总计已产出',
      info1: 'LOOP 每 10 秒钟 产出1个 ,信任网络所有成员共同分享',
      info2: '获得好友的信任数量越多，相比其他人可以更快速积累LOOP'
    },
    mining: {
      total: '总计已产出',
      miningedTotal: '已经被挖出',
      trustTotal: '全网信任量'
    },
    task: {
      title: '当前任务',
      info: '邀请您的朋友或您认识的人，参与信任关系认证，解锁挖矿特权',
      shareTip: '或以下列方式分享'
    }
  },
  mining: {
    info: {
      title: '欢迎进入信任关系的未来',
      slogan1: '您需要邀请',
      slogan2: '位好友信任您，即可开始挖取 LOOP'
    },
    mining: {
      title: '你获得的 LOOP',
      curToken: '当前余额',
      waitToken: '待领取',
      trustCalc: '信任算力',
      tip1: '剩余领取时间',
      tip2: '过期后LOOP会消失，请每天按时领取',
      btnTip: '收获 & 更新算力'
    },
    task: {
      title: '当前任务',
      info: '邀请您的朋友或您认识的人，参与信任关系认证，解锁挖矿特权',
      shareTip: '或以下列方式分享'
    },
    invited: {
      title: '已受邀的信任人',
      titleTip: '挖矿加速'
    }
  },
  trust: {
    title: '搜索并添加信任',
    placeholder: '粘贴地址到这',
    trustYou: '已信任您',
    youTrust: '您已信任',
    bothTrust: '互相信任',
    unknownTrust: '信任未知',
    yourTrusts: '您信任的人',
  },
  error404: {
    noPage: '非常抱歉，您访问的页面不存在',
    toHome: '返回首页'
  }
}

export default {
  ...components,
  ...locale
}
