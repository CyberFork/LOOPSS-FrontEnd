<template>
  <div class="mining">
    <a-box>
      <div class="info">
        <div class="user-info">
          <a-avatar class="icon" src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" />
          <copy>{{ user | formatUser }}</copy>
        </div>
        <div class="slogan">
          <div>{{ $t("mining.info.title") }}</div>
          <div>
            {{ $t("mining.info.slogan1") }}
            <a-text success>{{ myInfo.needInviteCount }}</a-text>
            {{ $t("mining.info.slogan2") }}
            <a-icon type="copy" @click="copyFn('0x880E7Df34378712107AcdaCF705c2257Bf42b1A5')" />
          </div>
        </div>
      </div>
      <a-spin class="mining-info" :spinning="myInfo.loading" style="position: relative;">
        <div>
          <div class="title">
            <img src="@/assets/img/icon.png" />
            <a-text strong>{{ $t("mining.mining.title") }}</a-text>
          </div>
          <div class="mining-count">
            <div class="left">
                <a-text link class="count" v-if="myInfo.ifTrustLOOP" @click="withdraw">
                  {{ myInfo.curToken }}
                </a-text>
                <a-text link disabled class="count" v-else> 0 </a-text>
                <span class="tip">{{ $t("mining.mining.curToken") }}</span>
            </div>
            <div class="right">
              <div class="item">
                <span class="count">{{ myInfo.unClaimTokens }}</span>
                <span class="tip">{{ $t("mining.mining.unClaimTokens") }}</span>
              </div>
              <div class="item">
                <span class="count">{{ myInfo.trustCalc }}</span>
                <span class="tip">{{ $t("mining.mining.trustCalc") }}</span>
              </div>
            </div>
          </div>
          <div class="foot">
            <div class="tip-wrap">
              <a-text>{{ $t("mining.mining.tip1") }}: {{ myInfo.time }}</a-text>
              <a-text class="tip">{{ $t("mining.mining.tip2") }}</a-text>
            </div>
            <div class="block-btn" v-if="myInfo.ifTrustLOOP" @click="updateAndClaim">
              {{ $t("mining.mining.btnTip") }}
            </div>
            <div class="block-btn" v-else @click="trustLOOPToken">
              {{ $t("mining.mining.btnTip1") }}
            </div>
          </div>
        </div>
      </a-spin>
      <div class="task-info">
        <div class="title">
          <a-text block strong>{{ $t("mining.task.title") }}</a-text>
        </div>
        <div class="content">
          <a-text block class="info-content">
            {{ $t("mining.task.info") }}
          </a-text>
          <div class="share-content ellipsis">{{inviteLink}}{{user}}</div>
          <div class="block-btn" @click="copyFn(inviteLink + user)">复制</div>
        </div>
      </div>
      <div class="trusts-container">
        <div class="title">
          <a-text>{{ $t("mining.invited.title") }} ({{ yourTrusts.total }})</a-text>
          <a-text class="tip">{{ $t("mining.invited.titleTip") }}: {{ yourTrusts.speedCount }}</a-text>
        </div>
        <a-spin class="trusts-list" :spinning="yourTrusts.loading && !yourTrusts.busy">
          <div
            class="content"
            v-infinite-scroll="getTrustMe"
            :infinite-scroll-disabled="yourTrusts.busy"
            :infinite-scroll-distance="10"
          >
            <a-list :data-source="yourTrusts.list">
              <a-list-item
                slot="renderItem"
                slot-scope="item, index"
                :key="index"
              >
                <div class="list-item-wrap">
                  <a-space size="large">
                    <a-avatar size="large" src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" />
                    <a-text>{{ item.returnValues.TrustSender | formatUser}}</a-text>
                    <div class="add-user">
                      <a-icon v-if="item.isAdded" type="user-add" />
                    </div>
                    <a-text>{{ item.time }}</a-text>
                  </a-space>
                  <a-space class="actions">
                    <a-icon
                      class="pointer"
                      type="copy"
                      @click="copyFn(item.returnValues.TrustSender)"
                    />
                    <a-text
                      link
                      target="_blank"
                      :href="item.returnValues.TrustSender"
                    >
                      <a-avatar size="small" icon="ant-cloud" />
                    </a-text>
                  </a-space>
                </div>
              </a-list-item>
            </a-list>
          </div>
        </a-spin>
      </div>
      <share-box />
    </a-box>
  </div>
</template>
<script>
import { toCopy } from 'assets/js/util'
import Api from '@/apis'
import infiniteScroll from 'vue-infinite-scroll'

export default {
  directives: {
    infiniteScroll
  },
  data() {
    return {
      inviteLink: location.origin + '/#/trust?q=',
      myInfo: {
        loading: false,
        needInviteCount: 0,
        curToken: 0,
        unClaimTokens: 0,
        trustCalc: 0,
        time: 0
      },
      yourTrusts: {
        loading: false,
        busy: false,
        pn: 1,
        ps: 10,
        total: 10,
        speedCount: 0,
        list: []
      }
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    copyFn(content) {
      toCopy(content).then(() => {
        this.$message.success('复制成功')
      })
    },
    getMyInfo() {
      this.myInfo.loading = true
      setTimeout(() => {
        Api.getMyInfo()
          .then((res) => {
            this.myInfo.needInviteCount = res.needInviteCount
            this.myInfo = Object.assign(this.myInfo, res)
          })
          .finally(() => {
            this.myInfo.loading = false
          })
      }, 1000)
    },
    trustLOOPToken() {
      this.myInfo.loading = true
      Api.addTrust('0x880E7Df34378712107AcdaCF705c2257Bf42b1A5')
        .then((res) => {
          this.getMyInfo()
        })
        .catch(() => {
          this.myInfo.loading = false
        })
    },
    updateAndClaim() {
      this.myInfo.loading = true
      Api.updateAndClaim()
        .then((res) => {
          if (res) {
            this.$message.success('收获 & 更新成功')
            this.getMyInfo()
          } else {
            this.$message.warning('信任数量不足')
            this.myInfo.loading = false
          }
        })
        .catch(() => {
          this.myInfo.loading = false
        })
    },
    withdraw() {
      // 包装内网Token到钱包
      this.myInfo.loading = true
      Api.wrappToken(this.myInfo.curToken)
        .then((res) => {
          //如果未approve则提示approve
          if (res) {
            this.$message.success('包装Token成功。复制LOOP地址添加到钱包查看。')
            this.getMyInfo()
          } else {
            // 未Approve
            this.$message.success('已Approve包装合约')
            this.getMyInfo()
          }
          this.myInfo.loading = false
        })
        .catch(() => {
          this.myInfo.loading = false
        })
    },
    getTrustMe() {
      this.yourTrusts.loading = true
      this.yourTrusts.busy = false
      this.yourTrusts.pn++
      if (this.yourTrusts.list.length >= this.yourTrusts.total) {
        this.$message.warning('到底了')
        this.yourTrusts.loading = false
        this.yourTrusts.busy = false
        return
      }
      setTimeout(() => {
        Api.getTrustMe()
          .then((res) => {
            this.yourTrusts.total = res.total
            this.yourTrusts.list = [...this.yourTrusts.list, ...res.list]
            console.log(this.yourTrusts.list)
            this.yourTrusts.loading = false
            this.yourTrusts.busy = false
          })
          .catch(() => {
            this.yourTrusts.pn--
            this.yourTrusts.loading = false
            this.yourTrusts.busy = false
          })
      }, 1000)
    }
  },
  created() {
    this.getMyInfo()
  }
}
</script>

<style lang="less" scoped>
.mining {
  line-height: 2;
  .info {
    .deep-card;
    .user-info{
      margin-bottom: 48/@r;
      /deep/ .ant-avatar{
        width: 72/@r;
        height: 72/@r;
        margin-right: 20/@r
      }
    }
    .title {

    }
    .slogan {
      font-size: 18/@r;
    }
  }
  .mining-info {
    .light-card;
    border-radius: 40/@r;
    margin: -40/@r 0 40/@r;
    overflow: hidden;
    .title {
      text-align: center;
      font-size: 36/@r;
      line-height: 90px;
      border-bottom: 1px solid rgba(0, 0, 0, .25);
      img{
        width: 56/@r;
        height: 56/@r;
        margin-right: 10/@r;
      }
    }
    .mining-count {
      display: flex;
      text-align: center;
      border-bottom: 1px solid rgba(0, 0, 0, .25);
      .count{
        margin: 0 16/@r;
        font-weight: bold;
      }
      .left{
        flex: 0 0 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-right: 1px solid rgba(0, 0, 0, .25);
        .count{
          line-height: 70/@r;
          font-size: 60/@r;
          margin-bottom: 24/@r;
        }
      }
      .right{
        flex: 1;
        line-height: 100px;
        .item{
          border-bottom: 1px solid rgba(0, 0, 0, .25);
          &:last-child{
            border: 0;
          }
        }
      }
    }
    .foot {
      padding: 40/@r;
      font-size: 20/@r;
      .tip-wrap{
        margin-bottom: 28/@r;
        .tip{
          color: #00C1DC;
          font-size: 18/@r;
          margin-left: 30/@r;
        }
      }
    }
  }
  .task-info {
    .light-card;
    padding: 34/@r 40/@r 48/@r;
    margin-bottom: 40/@r;
    .title {
      text-align: center;
      margin-bottom: 16/@r;
      font-size: 36/@r;
    }
    .info-content {
      margin-bottom: 16/@r;
    }
    .share-content {
      padding: 0 105/@r;
      line-height: 80/@r;
      color: #00E983;
      background: #12285B;
      border-radius: 10px;
      margin-bottom: 24/@r;
    }
  }
  .trusts-container {
    .trust-list;
    border-radius: 30px;
    overflow: hidden;
    position: relative;
    .title {
      font-size: 36/@r;
      line-height: 100/@r;
      padding: 0 40/@r;
      position: relative;
      .tip{
        font-size: 30/@r;
        color: rgba(255, 255, 255, .7);
        margin-left: 40/@r
      }
    }
    .trusts-list{
      position: relative;
      display: block;
      .content {
        max-height: 560/@r;
        overflow: auto;
        position: relative;
        border-radius: 6/@r;
      }
      .add-user {
        width: 20/@r;
        text-align: center;
      }
    }
  }
}
</style>
