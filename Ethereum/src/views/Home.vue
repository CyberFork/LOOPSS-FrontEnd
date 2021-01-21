<template>
  <div class="home">
    <a-box>
      <div class="info">
        <div class="title">{{ $t("home.info.title") }}</div>
        <div class="slogan">{{ $t("home.info.slogan") }}</div>
        <div class="banner"></div>
        <div class="tip">{{ $t("home.info.info1") }}</div>
        <div class="tip">{{ $t("home.info.info2") }}</div>
      </div>
      <div class="mining-info">
        <div class="top">

          <div>
            <img src="@/assets/img/icon.png" />
            <a-text>LOOP</a-text>
          </div>
          <div class="price">Price：{{ price }} USDT</div>
        </div>
        <div class="total-wrap">
          <countTo
            class="animate-num"
            :decimals=2
            :startVal="lastTotal"
            :endVal="total"
            :duration="duration"
          ></countTo>
          <div>{{ $t("home.info.totalTip") }}</div>
        </div>
        <div class="content">
          <div class="cont-item">
            <div class="num">{{ minedTotal | formatNumber(2) }}</div>
            <div>{{ $t("home.mining.minedTotal") }}</div>
          </div>
          <div class="cont-item">
            <div class="num">{{ trustTotal }}</div>
            <div>{{ $t("home.mining.trustTotal") }}</div>
          </div>
        </div>
      </div>
      <div class="login-wrap" v-show="!user">
        <div class="title">选择以下方式登录</div>
        <div class="login-btn block-btn" @click="login">
          <img src="@/assets/img/metamask.png" alt="">
          <a-text>以Metamask 登录</a-text>
        </div>
      </div>
      <share-box></share-box>
    </a-box>
  </div>
</template>
<script>
import countTo from 'vue-count-to'
import { toCopy } from 'assets/js/util'
import Api from '@/apis'
export default {
  components: {
    countTo
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  data() {
    return {
      infoTimer: null,
      lastTotal: 0,
      total: 0,
      minedTotal: 0,
      trustTotal: 0,
      duration: 3000,
      price: 0
    }
  },
  methods: {
    copyFn(content) {
      toCopy(content).then(() => {
        this.$message.success('复制成功')
      })
    },
    clearTimer(){
      this.infoTimer && clearInterval(this.infoTimer)
      this.infoTimer = null
    },
    //TODO 定时刷新(已修改为5s一刷新)
    getInfo() {
      this.lastTotal = this.total;
      Api.getInfo().then(async (res) => {
        console.log('getInfo total res:', res)
        this.total = res.total
        this.minedTotal = await res.minedTotal
        this.trustTotal = res.trustTotal
      })
    },
    getPrice() {
      Api.getPrice().then((res) => {
        this.price = res
      })
    },
    login() {
      this.$store.dispatch('Login')
    }
  },
  created() {
    this.getPrice()
    this.getInfo()
    this.clearTimer()
    this.infoTimer = setInterval(this.getInfo, 5000)
  },
  beforeDestroy(){
    this.clearTimer()
  }
}
</script>

<style lang="less" scoped>
.home {
  line-height: 2;
  .info {
    .deep-card;
    height: 856/@r;
    background: url(~@/assets/img/mining_banner.png) no-repeat center/auto 100%;
    padding-top: 24/@r;
    .title {
      font-size: 42/@r;
      line-height: 60/@r;
      margin-bottom: 15/@r;
    }
    .banner{
      height: 530/@r;
    }
    .slogan {
      font-size: 22/@r;
      line-height: 30/@r;
      color: #fff;
    }
    .tip{
      font-size: 20/@r;
    }
  }
  .mining-info {
    .light-card;
    margin: -40/@r 0 40/@r;
    .top {
      padding: 30/@r 40/@r 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #fff;
      img{
        width: 56/@r;
        margin-right: 16/@r;
      }
      .price{
        opacity: .5;
      }
    }
    .total-wrap{
      text-align: center;
      padding: 25/@r 0 36/@r;
      border-bottom: 1px solid #000;
      .animate-num {
        display: block;
        font-size: 72/@r;
        line-height: 84/@r;
        font-weight: 600;
      }
    }
    .content {
      display: flex;
      text-align: center;
      border-radius: 10/@r;
      .cont-item {
        flex: 1;
        padding: 30/@r;
        border-right: 1px solid #000;
        &:last-child {
          border: 0;
        }
        .num{
          font-size: 52/@r;
          line-height: 62/@r;
          font-weight: bold;
        }
      }
    }
  }
  .login-wrap {
    padding: 34/@r 60/@r;
    position: relative;
    text-align: center;
    &:before{
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 40/@r;
      position: absolute;
      top: 0;
      left: 0;
      background: linear-gradient(310deg, #243187 0%, #009CCF 100%);
      opacity: 0.6;
    }
    .title{
      font-size: 36/@r;
      font-weight: 600;
      line-height: 50/@r;
      margin-bottom: 38/@r;
      position: relative;
    }
    .login-btn{
      img{
        width: 56/@r;
        height: 50/@r;
        margin-right: 24/@r;
      }
    }
  }
}
</style>
