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
  noMore: 'All List loaded all',
  menu: {
    home: 'Home',
    mining: 'Mining',
    trust: 'Trust',
    more: 'Learn More',
    wait: 'Coming Soon'
  },
  head: {
    login: 'Sign in',
    logout: 'Sign out'
  },
  home: {
    info: {
      title: 'The LOOP is the trust network of the future',
      slogan: 'We are prepared to distribute the currency of the future in a relationship of trust that will enable millions to join',
      totalTip: 'Total output',
      info1: 'LOOP produces one LOOP every 10 seconds, which is shared by all members of the trust network',
      info2: 'The more friends you have to trust, the faster you can accumulate loops than anyone else'
    },
    mining: {
      total: 'Total output',
      minedTotal: 'Mininged',
      trustTotal: 'Network trust volume'
    },
    task: {
      title: 'Current Task',
      info: 'Invite your friends or acquaintances to participate in trust relationship authentication and unlock mining privileges',
      shareTip: 'Or share in the following ways'
    },
    loginBtn: {
      title: 'Select the following ways to login',
      btnTextCfx: 'Login By ConfluxPotal',
      btnTextEth: 'Login By Metamask'
    }
  },
  mining: {
    info: {
      title: 'Welcome to the future of trust',
      slogan1: 'You need to invite',
      slogan2: 'friends to trust you to start digging the LOOP',
      loopAddress: 'LOOP contract address'
    },
    mining: {
      title: 'You get the LOOP',
      curToken: 'The current balance',
      unClaimTokens: 'To receive',
      trustCalc: 'Trust is force',
      tip1: 'Remaining collection time',
      tip2: 'After expiration, the LOOP will disappear. Please pick it up on time every day',
      btnTip: 'Harvest & Update power',
      btnTip1: 'Trust LOOPToken',
      unlocked: 'Unlocked',
      locked: 'Locked',
      steps: {
        step1: {
          info: 'Step 1/2 your address needs three trusts',
          desc: 'Copy the link，start mining after inviting three more people to trust',
          how: 'How'
        },
        next: 'Next',
        step2: {
          info: 'Step 2/2 Click LOOP button to start',
          desc: 'Trust LOOPToken before mining',
          why: 'Why'
        },
        step3: {
          info: 'Awesome! Mining has started',
        }
      },
      view: 'View',
    },
    task: {
      title: 'The current task',
      info: 'Invite your friends or acquaintances to participate in trust relationship authentication and unlock mining privileges',
      shareTip: 'Or share in the following ways',
      copy: 'COPY'
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
    unknownTrust: 'Not trust each other',
    yourTrusts: 'People you trust'
  },
  message: {
    copy: 'Copy',
    copySuccess: 'Copy Success',
    copyFail: 'Copy Fail',
    harvestSuccess: 'Harvest & Update power Success',
    harvestFail: 'Trust Number too low',
    packSuccess: 'Token wrapped successfully. Copy Loop address to add to wallet view.',
    packed: 'Approve the packaged contract'
  }
}

export default {
  ...components,
  ...locale
}
