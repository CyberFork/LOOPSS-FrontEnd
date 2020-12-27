<template>
  <div class="home">
    <a-box class="info">
      <div class="title">{{$t('home.info.title')}}</div>
      <div class="slogan">{{$t('home.info.slogan')}}</div>
      <div>
        <a-text strong>{{$t('home.info.totalTip')}}</a-text>
        <countTo class="animate-num" :startVal='0' :endVal='total' :duration='duration'></countTo>
      </div>
      <div>{{$t('home.info.info1')}}</div>
      <div>{{$t('home.info.info2')}}</div>
    </a-box>
    <a-box>
      <a-card class="mining-info">
        <div class="top">
          <a-space>
            <a-avatar src="@/assets/img/logo.png" style="background: #fff" />
            <a-text block>LOOP</a-text>
            <a-avatar size="small" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" title="LOOP"/>
          </a-space>
          <a-text block class="price">Price：{{price}} USDT</a-text>
        </div>
        <div class="content">
          <div class="cont-item">
            <div>{{total}}</div>
            <div>{{$t('home.mining.total')}}</div>
          </div>
          <div class="cont-item">
            <div>{{miningedTotal}}</div>
            <div>{{$t('home.mining.miningedTotal')}}</div>
          </div>
          <div class="cont-item">
            <div>{{trustTotal}}</div>
            <div>{{$t('home.mining.trustTotal')}}</div>
          </div>
        </div>
      </a-card>
    </a-box>
    <a-box v-if="user">
      <a-card class="task-info">
        <div class="title">
          <a-text block strong>{{$t('home.task.title')}}</a-text>
        </div>
        <div class="content">
          <a-text block class="info-content">{{$t('home.task.info')}}</a-text>
          <div class="flex-box">
            <a-input class="share-input" :default-value="inviteLink + user" />
            <a-button class="copy-btn" @click="copyFn(inviteLink)">复制 <a-icon type="copy" /></a-button>
          </div>
          <div class="share-wrap">
            <a-text>{{$t('home.task.shareTip')}}</a-text>
            <a-space>
              <a-text link><a-avatar size="small" icon="weibo-circle" /></a-text>
              <a-text link><a-avatar size="small" icon="codepen-circle" /></a-text>
              <a-text link><a-avatar size="small" icon="qq" /></a-text>
              <a-text link><a-avatar size="small" icon="linkedin" /></a-text>
              <a-text link><a-avatar size="small" icon="zhihu" /></a-text>
              <a-text link><a-avatar size="small" icon="yuque" /></a-text>
              <a-text link><a-avatar size="small" icon="ant-cloud" /></a-text>
            </a-space>
          </div>
        </div>
      </a-card>
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
    computed:{
      user() {
        return this.$store.state.user
      }
    },
    data() {
      return {
        total: 0,
        miningedTotal: 0,
        trustTotal: 0,
        duration: 3000,
        inviteLink: ' https://loopss.me/invited/',
        price: 0
      }
    },
    methods:{
      copyFn(content) {
        toCopy(content).then(() => {
          this.$message.success('复制成功')
        })
      },
      getInfo() {
        Api.getInfo().then(res => {
          this.total = res.total
          this.miningedTotal = res.miningedTotal
          this.trustTotal = res.trustTotal
        })
      },
      getPrice() {
        Api.getPrice().then(res => {
          this.price = res
        })
      }
    },
    created(){
      this.getInfo()
      this.getPrice()
    }
  }

</script>

<style lang="less" scoped>
  .home{
    line-height: 2;
    .info{
      text-align: center;
      margin-bottom: 30px;
      .title{
        font-size: 24px;
        font-weight: bold;
      }
      .slogan{
        font-size: 18px;
      }
      .animate-num{
        display: block;
        font-size: 36px;
        font-weight: 600;
      }
    }
    .mining-info{
      margin-bottom: 20px;
      border-radius: 6px;
      background: #eee;
      .top{
        display:flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px
      }
      .content{
        display: flex;
        padding: 10px 0;
        text-align: center;
        background: #fff;
        border-radius: 10px;
        .cont-item{
          flex: 1;
          border-right: 1px solid #000;
          &:last-child{
            border: 0;
          }
        }
      }
    }
    .task-info{
      line-height: 2;
      background: #eee;
      border-radius: 6px;
      .title{
        margin-bottom: 20px;
      }
      .info-content{
        margin-bottom: 10px;
      }
      .share-input{
        flex: 1;
        text-overflow: ellipsis;
        margin-bottom: 10px;
      }
      .copy-btn{
        margin-left: 20px;
      }
      .share-wrap{
        display: flex;
        justify-content: space-between;
      }
    }
  }
</style>
