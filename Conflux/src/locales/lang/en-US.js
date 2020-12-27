import antdEnUS from 'ant-design-vue/es/locale-provider/en_US'
import momentEU from 'moment/locale/eu'

const components = {
  antLocale: antdEnUS,
  momentName: 'eu',
  momentLocale: momentEU
}

const locale = {
  hello: 'Hello',
  slogan: 'Trust, No pledge',
  error: 'Error',
  copyError: 'Copy Error，Please Again',
  menu: {
    home: 'Home',
    mining: 'Mining',
    trust: 'Trust',
    more: 'Learn More'
  },
  head: {
    login: 'Sign in',
    logout: 'Sign out'
  },
  home: {
    info:{
      title: 'The LOOP is the trust network of the future',
      slogan: 'We are prepared to distribute the currency of the future in a relationship of trust that will enable millions to join',
      totalTip: 'Total output',
      info1: 'LOOP produces one LOOP every 10 seconds, which is shared by all members of the trust network',
      info2: 'The more friends you have to trust, the faster you can accumulate loops than anyone else'
    },
    mining: {
      total: 'Total output',
      miningedTotal: 'Mininged',
      trustTotal: 'Network trust volume'
    },
    task: {
      title: 'Current Task',
      info: 'Invite your friends or acquaintances to participate in trust relationship authentication and unlock mining privileges',
      shareTip: 'Or share in the following ways'
    }
  },
  mining: {
    info: {
      title: 'Welcome to the future of trust',
      slogan1: 'You need to invite',
      slogan2: 'friends to trust you to start digging the LOOP'
    },
    mining: {
      title: 'You get the LOOP',
      curToken: 'The current balance',
      waitToken: 'To receive',
      trustCalc: 'Trust is force',
      tip1: 'Remaining collection time',
      tip2: 'After expiration, the LOOP will disappear. Please pick it up on time every day',
      btnTip: 'Harvest & Update power'
    },
    task: {
      title: 'The current task',
      info: 'Invite your friends or acquaintances to participate in trust relationship authentication and unlock mining privileges',
      shareTip: 'Or share in the following ways'
    },
    invited: {
      title: 'Trusted person who has been invited',
      titleTip: 'Mining speed'
    }
  },
  trust: {
    title: 'Search And Add Trust',
    placeholder: 'Paste the address here',
    trustYou: 'Have to trust you',
    youTrust: 'You have to trust',
    bothTrust: 'Trust each other',
    unknownTrust: 'unknow',
    yourTrusts: 'People you trust',
  },
  error404: {
    noPage: 'Sorry, The page you visited does not exist',
    toHome: 'To Home'
  }
}

export default {
  ...components,
  ...locale
}
