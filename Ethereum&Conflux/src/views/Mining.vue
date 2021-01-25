<template>
  <div class="mining">
    <a-box>
      <div class="info">
        <div class="user-info">
          <a-avatar
            class="icon"
            src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
          />
          <a-text>{{ user | formatUser }} </a-text>
          <a-icon type="copy" @click="copyFn(user)" />
        </div>
        <div class="slogan">
          <div>{{ $t("mining.info.title") }}</div>
          <div>
            <a-text>{{ $t("mining.info.slogan1") }}</a-text>
            <a-text success>{{ myInfo.needInviteCount }}</a-text>
            <a-text>{{ $t("mining.info.slogan2") }}</a-text>
          </div>
          <div>
            {{ $t("mining.info.loopAddress") }}：{{LOOPToken}}
            <a-icon type="copy" @click="copyFn(LOOPToken)" />
          </div>
        </div>
      </div>
      <div class="task-wrap">
        <a-spin :spinning="myInfo.loading" class="spining-wrap">
          <div
            class="mining-info"
            v-if="
              myInfo.needInviteCount < 1 &&
              myInfo.ifTrustLOOP &&
              myInfo.showMiningInfo
            "
          >
            <div class="title">
              <img src="@/assets/img/icon.png" />
              <a-text strong>{{ $t("mining.mining.title") }}</a-text>
            </div>
            <div class="mining-count">
              <div class="left">
                <a-text
                  link
                  class="count"
                  v-if="myInfo.ifTrustLOOP"
                  @click="withdraw"
                >
                  {{ myInfo.curToken | formatNumber(2) }}
                </a-text>
                <a-text link disabled class="count" v-else> 0 </a-text>
                <a-tooltip placement="bottom" title="点击上方余额进行收取">
                  <span class="tip">{{ $t("mining.mining.curToken") }}</span>
                  <a-icon type="question-circle" />
                </a-tooltip>
              </div>
              <div class="right">
                <div class="item">
                  <span class="count">{{
                    myInfo.unClaimTokens | formatNumber(2)
                  }}</span>
                  <span class="tip">{{
                    $t("mining.mining.unClaimTokens")
                  }}</span>
                </div>
                <div class="item">
                  <span class="count">{{ myInfo.trustCalc }}</span>
                  <span class="tip">{{ $t("mining.mining.trustCalc") }}</span>
                </div>
              </div>
            </div>
            <div class="foot">
              <!-- 剩余领取时间 -->
              <div class="tip-wrap">
                <div>{{ $t("mining.mining.tip1") }}: {{ myInfo.time }}</div>
                <div class="tip">{{ $t("mining.mining.tip2") }}</div>
              </div>
              <div class="block-btn" @click="updateAndClaim">
                {{ $t("mining.mining.btnTip") }}
              </div>
            </div>
          </div>
          <div
            class="task-one"
            v-if="
              myInfo.needInviteCount ||
              (myInfo.needInviteCount < 1 &&
                !myInfo.ifTrustLOOP &&
                !myInfo.showTaskTwo)
            "
          >
            <div class="top">
              <div class="title">
                 {{ $t("mining.mining.locked") }}
                <div class="sub-title">
                  <a-text>{{$t("mining.mining.steps.step1.info")}}</a-text>
                  <a-tooltip placement="bottomRight">
                    <template slot="title">{{$t("mining.mining.steps.step1.desc")}}</template>
                    <a-text link class="f-r">
                      {{$t("mining.mining.steps.step1.how")}}
                      <a-icon type="question-circle" />
                    </a-text>
                  </a-tooltip>
                </div>
              </div>
            </div>
            <div class="middle">
              <img
                src="@/assets/img/1.png"
                alt=""
                v-if="myInfo.needInviteCount >= 3"
              />
              <img src="@/assets/img/1_active.png" alt="" v-else />
              <div
                :class="{ line: true, active: myInfo.needInviteCount < 3 }"
              ></div>
              <img
                src="@/assets/img/2.png"
                alt=""
                v-if="myInfo.needInviteCount >= 2"
              />
              <img src="@/assets/img/2_active.png" alt="" v-else />
              <div
                :class="{ line: true, active: myInfo.needInviteCount < 2 }"
              ></div>
              <img
                src="@/assets/img/3.png"
                alt=""
                v-if="myInfo.needInviteCount >= 1"
              />
              <img src="@/assets/img/3_active.png" alt="" v-else />
            </div>
            <div class="bottom">
              <div
                :class="{
                  'block-btn': true,
                  disabled: myInfo.needInviteCount > 0,
                }"
                @click="toTaskTwo"
              >
                {{$t("mining.mining.steps.next")}}
              </div>
            </div>
          </div>
          <div
            class="task-two"
            v-if="
              myInfo.needInviteCount < 1 &&
              !myInfo.ifTrustLOOP &&
              myInfo.showTaskTwo
            "
          >
            <div class="top">
              <div class="title">
                 {{ $t("mining.mining.locked") }}
                <div class="sub-title">
                  <a-text>{{$t("mining.mining.steps.step2.info")}}</a-text>
                  <a-tooltip placement="bottomRight">
                    <template slot="title">{{$t("mining.mining.steps.step2.desc")}}</template>
                    <a-text link class="f-r">
                      {{$t("mining.mining.steps.step2.why")}}
                      <a-icon type="question-circle" />
                    </a-text>
                  </a-tooltip>
                </div>
              </div>
            </div>
            <div class="middle">
              <img src="@/assets/img/icon_black.png" alt="" />
            </div>
            <div class="bottom">
              <div class="block-btn" @click="trustLOOPToken">
                {{ $t("mining.mining.btnTip1") }}
              </div>
            </div>
          </div>
          <div
            class="task-three"
            v-if="
              myInfo.needInviteCount < 1 &&
              myInfo.ifTrustLOOP &&
              !myInfo.showMiningInfo
            "
          >
            <div class="top">
              <div class="title">
                 {{ $t("mining.mining.unlocked") }}
                <div class="sub-title">
                  <a-text
                    >{{$t("mining.mining.steps.step3.info")}}</a-text
                  >
                </div>
              </div>
            </div>
            <div class="middle">
              <img src="@/assets/img/icon_green.png" alt="" />
            </div>
            <div class="bottom">
              <div class="block-btn" @click="showMiningInfoFn">{{$t("mining.mining.view")}}</div>
            </div>
          </div>
        </a-spin>
      </div>
      <div class="copy-task">
        <div class="title">
          <a-text block strong>{{ $t("mining.task.title") }}</a-text>
        </div>
        <div class="content">
          <a-text block class="info-content">
            {{ $t("mining.task.info") }}
          </a-text>
          <div class="share-content ellipsis">{{ inviteLink }}{{ user }}</div>
          <div class="block-btn" @click="copyFn(inviteLink + user)"> {{ $t("mining.task.copy") }}</div>
        </div>
      </div>
      <div class="trusts-container">
        <div class="title">
          <a-text
            >{{ $t("mining.invited.title") }} ({{ yourTrusts.total }})</a-text
          >
          <a-text class="tip"
            >{{ $t("mining.invited.titleTip") }}:
            {{ yourTrusts.speedCount }}</a-text
          >
        </div>
        <a-spin
          class="trusts-list"
          :spinning="yourTrusts.loading && !yourTrusts.busy"
        >
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
                    <a-avatar
                      size="large"
                      src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
                    />
                    <a-text>{{
                      item.returnValues.TrustSender | formatUser
                    }}</a-text>
                    <div class="add-user">
                      <a-icon v-if="item.isAdded" type="user-add" />
                    </div>
                    <a-text>{{ item.time }}</a-text>
                  </a-space>
                  <div>
                    <img
                      src="@/assets/img/copy.png"
                      class="copy-btn pointer"
                      type="copy"
                      @click="copyFn(item.returnValues.TrustSender)"
                    />
                  </div>
                </div>
              </a-list-item>
            </a-list>
          </div>
        </a-spin>
      </div>
      <share-box></share-box>
    </a-box>
  </div>
</template>
<script>
import { toCopy } from "assets/js/util";
import store from "store";
import Api from "@/apis";
import infiniteScroll from "vue-infinite-scroll";

let timer = null //挖矿时间倒计时定时器
let infoTimer = null //获取挖矿信息定时器
export default {
  directives: {
    infiniteScroll,
  },
  data() {
    return {
      inviteLink: location.origin + "/#/trust?q=",
      myInfo: {
        loading: false,
        needInviteCount: 3,
        curToken: 0,
        unClaimTokens: 0,
        trustCalc: 0,
        time: 0,
        ifTrustLOOP: false,
        showTaskTwo: false,
        showMiningInfo: false,
      },
      yourTrusts: {
        loading: false,
        busy: false,
        pn: 1,
        ps: 10,
        total: 0,
        speedCount: 0,
        list: [],
      },
    };
  },

  computed: {
    user() {
      return this.$store.state.user
    },
    LOOPToken() {
      return this.$store.state.LOOPToken
    }
  },
  methods: {
    copyFn(content) {
      toCopy(content).then(() => {
        this.$message.success(this.$t('message.copySuccess'));
      });
    },
    showMiningInfoFn() {
      this.myInfo.showMiningInfo = true;
      store.set("showMiningInfo", this.user);
    },
    toTaskTwo() {
      this.myInfo.showTaskTwo = true;
      store.set("showTaskTwo", this.user);
    },
    getMyInfo() {
      this.myInfo.loading = true;
      return Api.getMyInfo()
        .then(async (res) => {
          console.log("getMyInfo mining:", res);
          this.myInfo = Object.assign(this.myInfo, res);
          return res
        })
        .finally(() => {
          this.myInfo.loading = false;
        });
    },
    trustLOOPToken() {
      this.myInfo.loading = true;
      Api.addTrust("0x8adeed9ba5656855622877825f7971fd475fe1b3")
      .finally(() => {
        this.myInfo.loading = false;
      });
    },
    updateAndClaim() {
      this.myInfo.loading = true;
      Api.updateAndClaim()
        .then((res) => {
          if (res) {
            this.$message.success(this.$t('message.harvestSuccess'));
          } else {
            this.$message.warning(this.$t('message.harvestFail'));
          }
        })
        .finally(() => {
          this.myInfo.loading = false;
        });
    },
    withdraw() {
      // 包装内网Token到钱包
      this.myInfo.loading = true;
      Api.wrappToken(this.myInfo.curToken)
        .then((res) => {
          //如果未approve则提示approve
          if (res) {
            this.$message.success(
              this.$t('message.packSuccess')
            );
          } else {
            // 未Approve
            this.$message.success(this.$t('message.packed'));
          }
        })
        .finally(() => {
          this.myInfo.loading = false;
        });
    },
    getTrustMe() {
      this.yourTrusts.loading = true;
      this.yourTrusts.busy = false;
      this.yourTrusts.pn++;
      if (
        this.yourTrusts.total &&
        this.yourTrusts.list.length >= this.yourTrusts.total
      ) {
        this.$message.warning(this.$t('noMore'));
        this.yourTrusts.loading = false;
        this.yourTrusts.busy = false;
        return;
      }
      Api.getTrustMe()
        .then((res) => {
          this.yourTrusts.total = res.total;
          this.yourTrusts.list = [...this.yourTrusts.list, ...res.list];
          this.yourTrusts.loading = false;
          this.yourTrusts.busy = false;
        })
        .catch(() => {
          this.yourTrusts.pn--;
          this.yourTrusts.loading = false;
          this.yourTrusts.busy = false;
        });
    },
    clockTimer(time) {
      let seconds = moment.duration(time).as('seconds')
      timer && clearInterval(timer)
      timer = setInterval(() => {
        seconds--
        let mTime = moment.duration(seconds, 'seconds')
        this.myInfo.time = moment({ h: mTime.hours(), m: mTime.minutes(), s: mTime.seconds() }).format('HH:mm:ss')
      }, 1000);
    }
  },
  created() {
    this.getMyInfo()
    .then(async (res) => {
      if (res.needInviteCount < 1 && store.get("showTaskTwo") === this.user) {
        this.myInfo.showTaskTwo = true;
      }

      if (res.ifTrustLOOP && store.get("showMiningInfo") === this.user) {
        this.myInfo.showMiningInfo = true;
      }
      this.clockTimer(this.myInfo.time)
      infoTimer && clearInterval(infoTimer)
      infoTimer = setInterval(() => {
        Api.getMyInfo().then(res => {
          this.myInfo = Object.assign(this.myInfo, res);
          console.log('轮询', res)
          this.clockTimer(this.myInfo.time)
        });
      }, 5000);
    });
  },
  beforeDestroy() {
    infoTimer && clearInterval(infoTimer);
    timer && clearInterval(timer)
    infoTimer = null
    timer = null
  },
};
</script>

<style lang="less" scoped>
.mining {
  line-height: 2;

  .info {
    .deep-card;
    min-height: 364 / @r;
    background: url(~@/assets/img/mining_banner_s.png) no-repeat center/100%;

    .user-info {
      margin-bottom: 48 / @r;

      /deep/ .ant-avatar {
        width: 72 / @r;
        height: 72 / @r;
        margin-right: 20 / @r;
      }
    }

    .slogan {
      font-size: 18 / @r;
    }
  }

  .task-wrap {
    margin-top: -56 / @r;

    .title {
      line-height: 50 / @r;
      text-align: center;
      font-size: 36 / @r;

      .sub-title {
        font-size: 26 / @r;
        display: flex;
        justify-content: space-between;
      }
    }

    .spining-wrap {
      .light-card;
      position: relative;
      border-radius: 40 / @r;
      margin: 0 0 40 / @r;
      overflow: hidden;
    }
    .mining-info {
      .light-card;
      border-radius: 40 / @r;
      overflow: hidden;

      .title {
        line-height: 90 / @r;
        border-bottom: 1px solid rgba(0, 0, 0, 0.25);

        img {
          width: 56 / @r;
          height: 56 / @r;
          margin-right: 10 / @r;
        }
      }

      .mining-count {
        display: flex;
        text-align: center;
        border-bottom: 1px solid rgba(0, 0, 0, 0.25);

        .count {
          margin: 0 16 / @r;
          font-weight: bold;
        }

        .left {
          flex: 0 0 50%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-right: 1px solid rgba(0, 0, 0, 0.25);

          .count {
            line-height: 70 / @r;
            font-size: 60 / @r;
            margin-bottom: 24 / @r;
          }
          .tip {
            margin-right: 16 / @r;
          }
        }

        .right {
          flex: 1;
          line-height: 100 / @r;

          .item {
            border-bottom: 1px solid rgba(0, 0, 0, 0.25);

            &:last-child {
              border: 0;
            }
          }
        }
      }

      .foot {
        padding: 40 / @r;
        font-size: 20 / @r;

        .tip-wrap {
          margin-bottom: 28 / @r;
          text-align: center;

          .tip {
            color: #00c1dc;
            font-size: 18 / @r;
            margin-left: 30 / @r;
          }
        }
      }
    }

    .task-one,
    .task-two,
    .task-three {
      background: linear-gradient(310deg, #243187 0%, #009ccf 100%);
      border-radius: 40 / @r;
      padding: 24 / @r 30 / @r 38 / @r;
      &.task-one {
        .middle {
          padding: 50 / @r;
          display: flex;
          justify-content: space-between;
          align-items: center;
          img {
            width: 94 / @r;
            height: 94 / @r;
            margin: 0 16 / @r;
            &.three {
              width: 90 / @r;
              height: 104 / @r;
            }
          }

          .line {
            flex: 1;
            background: #fff;
            height: 6 / @r;

            &.active {
              background: #00e983;
            }
          }
        }
      }
      &.task-two {
        .middle {
          padding: 30 / @r 0 20 / @r;
          text-align: center;
          img {
            width: 118 / @r;
            height: 142 / @r;
          }
        }
      }
      &.task-three {
        .sub-title {
          justify-content: center;
        }
        .middle {
          padding: 30 / @r 0 20 / @r;
          text-align: center;
          img {
            width: 118 / @r;
            height: 142 / @r;
          }
        }
      }
    }
  }

  .copy-task {
    .light-card;
    padding: 34 / @r 40 / @r 48 / @r;
    margin-bottom: 40 / @r;

    .title {
      text-align: center;
      margin-bottom: 16 / @r;
      font-size: 36 / @r;
    }

    .info-content {
      margin-bottom: 16 / @r;
    }

    .share-content {
      padding: 0 105 / @r;
      line-height: 80 / @r;
      color: #00e983;
      background: #12285b;
      border-radius: 10 / @r;
      margin-bottom: 24 / @r;
    }
  }

  .trusts-container {
    .trust-list;
    border-radius: 30 / @r;
    overflow: hidden;
    position: relative;

    .title {
      font-size: 36 / @r;
      line-height: 100 / @r;
      padding: 0 40 / @r;
      position: relative;

      .tip {
        font-size: 30 / @r;
        color: rgba(255, 255, 255, 0.7);
        margin-left: 40 / @r;
      }
    }

    .trusts-list {
      position: relative;
      display: block;

      .content {
        max-height: 560 / @r;
        overflow: auto;
        position: relative;
        border-radius: 6 / @r;
      }

      .add-user {
        width: 20 / @r;
        text-align: center;
      }

      .copy-btn {
        width: 32 / @r;
      }
    }
  }
}
</style>
