import antd from 'ant-design-vue/es/locale-provider/zh_CN'
import momentCN from 'moment/locale/zh-cn'

const components = {
  antLocale: antd,
  momentName: 'zh-cn',
  momentLocale: momentCN
}

const locale = {
  hello: '您好',
  slogan: '信任驱动，无需质押',
  noMore: '没有更多了',
  menu: {
    home: '首页',
    mining: '挖矿',
    trust: '信任',
    more: '更多',
    wait: '正在开发，敬请期待'
  },
  head: {
    login: '登录',
    logout: '退出登录'
  },
  home: {
    info: {
      title: 'LOOP是未来的信任网络',
      slogan: '为使数百万人加入，我们准备以信任关系分发未来货币',
      totalTip: '理论已挖出',
      info1: 'LOOP 每 10 秒钟 产出1个，信任网络所有成员共同分享',
      info2: '获得好友的信任数量越多，相比其他人可以更快速积累LOOP'
    },
    mining: {
      total: '理论已挖出',
      minedTotal: '矿池已挖出',
      trustTotal: '挖矿信任量'
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
      slogan2: '位好友信任您，即可开始挖取 LOOP',
      loopAddress: 'LOOP合约地址'
    },
    mining: {
      title: '你获得的 LOOP',
      curToken: '当前余额',
      unClaimTokens: '待领取',
      trustCalc: '信任算力',
      tip1: '剩余领取时间',
      tip2: '过期后LOOP会消失，请每天按时领取',
      btnTip: '领取到余额 & 更新信任算力',
      btnTip1: '信任 LOOP 代币',
      unlocked: '您的矿池已经解锁',
      locked: '您的矿池尚未解锁',
      steps: {
        step1: {
          info: '步骤 1/2 您需要邀请3位好友信任您',
          desc: '复制当前任务中邀请链接，邀请三人信任之后可启动挖矿权限',
          how: '如何被信任'
        },
        next: '下一步',
        step2: {
          info: '步骤 2/2 点击信任LOOP，即可开始挖',
          desc: '挖矿赚取LOOP需要信任LOOPToken的地址之后才能收到LOOP的转账。',
          why: '为什么'
        },
        step3: {
          info: '太棒了！您已经完成所有步骤啦，自动挖矿已经开始了',
        }
      },
      view: '查看矿池',
    },
    task: {
      title: '当前任务',
      info: '邀请您的朋友或您认识的人，参与信任关系认证，解锁挖矿特权',
      shareTip: '或以下列方式分享',
      copy: '复制'
    },
    invited: {
      title: '信任你的人',
      titleTip: '挖矿加速'
    }
  },
  trust: {
    title: '搜索并添加信任',
    placeholder: '粘贴地址到这',
    trustYou: '已信任您',
    youTrust: '您已信任',
    bothTrust: '互相信任',
    unknownTrust: '互不信任',
    yourTrusts: '您信任的人'
  }
}

export default {
  ...components,
  ...locale
}
