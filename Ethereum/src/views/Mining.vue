<template>
  <div class="mining">
    <a-box>
      <div class="info">
        <div class="title">
          <div>{{ $t("hello") }}，{{ user }}</div>
          <div>{{ $t("mining.info.title") }}</div>
        </div>
        <div class="slogan">
          {{ $t("mining.info.slogan1") }} {{ myInfo.needInviteCount }}
          {{ $t("mining.info.slogan2")
          }}<a-icon
            type="copy"
            @click="copyFn('0x880E7Df34378712107AcdaCF705c2257Bf42b1A5')"
          />
        </div>
      </div>
    </a-box>
    <a-box>
      <a-spin :spinning="myInfo.loading">
        <a-card class="mining-info">
          <div class="title">
            <a-text block strong>{{ $t("mining.mining.title") }}</a-text>
          </div>
          <div class="content">
            <div class="cont-item">
              <div>{{ myInfo.unClaimTokens }}</div>
              <div>{{ $t("mining.mining.unClaimTokens") }}</div>
            </div>
            <div class="cont-item">
              <!-- <div>{{ myInfo.curToken }}</div> -->
              <a-button v-if="myInfo.ifTrustLOOP" @click="withdraw">{{
                myInfo.curToken
              }}</a-button>
              <div>{{ $t("mining.mining.curToken") }}</div>
            </div>
            <div class="cont-item">
              <div>{{ myInfo.trustCalc }}</div>
              <div>{{ $t("mining.mining.trustCalc") }}</div>
            </div>
          </div>
          <div class="foot">
            <div class="tip-wrap">
              <a-text block
                >{{ $t("mining.mining.tip1") }}: {{ myInfo.time }}</a-text
              >
              <a-text gray>{{ $t("mining.mining.tip2") }}</a-text>
            </div>
            <a-button v-if="myInfo.ifTrustLOOP" @click="updateAndClaim">{{
              $t("mining.mining.btnTip")
            }}</a-button>
            <a-button v-else @click="trustLOOPToken">{{
              $t("mining.mining.btnTip1")
            }}</a-button>
          </div>
        </a-card>
      </a-spin>
    </a-box>
    <a-box>
      <a-card class="task-info">
        <div class="title">
          <a-text block strong>{{ $t("mining.task.title") }}</a-text>
        </div>
        <div class="content">
          <a-text block class="info-content">{{
            $t("mining.task.info")
          }}</a-text>
          <div class="flex-box">
            <a-input class="share-input" :default-value="inviteLink + user" />
            <a-button class="copy-btn" @click="copyFn(inviteLink + user)"
              >复制 <a-icon type="copy"
            /></a-button>
          </div>
          <div class="share-wrap">
            <a-text>{{ $t("mining.task.shareTip") }}</a-text>
            <a-space>
              <a-text link
                ><a-avatar size="small" icon="weibo-circle"
              /></a-text>
              <a-text link
                ><a-avatar size="small" icon="codepen-circle"
              /></a-text>
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
    <a-box class="your-trusts-container">
      <div class="title">
        <a-space size="large">
          <a-text strong
            >{{ $t("mining.invited.title") }} ({{ yourTrusts.total }})</a-text
          >
          <a-text gray
            >{{ $t("mining.invited.titleTip") }}:
            {{ yourTrusts.speedCount }}</a-text
          >
        </a-space>
      </div>
      <a-spin :spinning="yourTrusts.loading && !yourTrusts.busy">
        <div
          class="content"
          v-infinite-scroll="getTrustMe"
          :infinite-scroll-disabled="yourTrusts.busy"
          :infinite-scroll-distance="10"
        >
          <a-list class="your-trust-list" :data-source="yourTrusts.list">
            <a-list-item
              slot="renderItem"
              slot-scope="item, index"
              :key="index"
            >
              <div class="list-item-wrap">
                <a-space size="large">
                  <a-text>{{ item.returnValues.TrustSender }}</a-text>
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
    </a-box>
  </div>
</template>
<script>
import { toCopy } from "assets/js/util";
import Api from "@/apis";
import infiniteScroll from "vue-infinite-scroll";

export default {
  directives: {
    infiniteScroll,
  },
  data() {
    return {
      inviteLink: "http://trust.loopss.me/invited/",
      myInfo: {
        loading: false,
        needInviteCount: 0,
        curToken: 0,
        unClaimTokens: 0,
        trustCalc: 0,
        time: 0,
      },
      yourTrusts: {
        loading: false,
        busy: false,
        pn: 1,
        ps: 10,
        total: 10000,
        speedCount: 0,
        list: [],
      },
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    copyFn(content) {
      toCopy(content).then(() => {
        this.$message.success("复制成功");
      });
    },
    getMyInfo() {
      this.myInfo.loading = true;
      setTimeout(() => {
        Api.getMyInfo()
          .then((res) => {
            this.myInfo.needInviteCount = res.needInviteCount;
            this.myInfo = Object.assign(this.myInfo, res);
          })
          .finally(() => {
            this.myInfo.loading = false;
          });
      }, 1000);
    },
    trustLOOPToken() {
      this.myInfo.loading = true;
      Api.addTrust("0x880E7Df34378712107AcdaCF705c2257Bf42b1A5")
        .then((res) => {
          this.getMyInfo();
        })
        .catch(() => {
          this.myInfo.loading = false;
        });
    },
    updateAndClaim() {
      this.myInfo.loading = true;
      Api.updateAndClaim()
        .then((res) => {
          if (res) {
            this.$message.success("收获 & 更新成功");
            this.getMyInfo();
          } else {
            this.$message.warning("信任数量不足");
            this.myInfo.loading = false;
          }
        })
        .catch(() => {
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
            this.$message.success("包装Token成功。复制LOOP地址添加到钱包查看。");
            this.getMyInfo();
          } else {
            // 未Approve
            this.$message.success("已Approve包装合约");
            this.getMyInfo();
          }
          this.myInfo.loading = false;
        })
        .catch(() => {
          this.myInfo.loading = false;
        });
    },
    getTrustMe() {
      this.yourTrusts.loading = true;
      this.yourTrusts.busy = false;
      this.yourTrusts.pn++;
      if (this.yourTrusts.list.length >= this.yourTrusts.total) {
        this.$message.warning("到底了");
        this.yourTrusts.loading = false;
        this.yourTrusts.busy = false;
        return;
      }
      setTimeout(() => {
        Api.getTrustMe()
          .then((res) => {
            this.yourTrusts.total = res.total;
            this.yourTrusts.list = [...this.yourTrusts.list, ...res.list];
            console.log(this.yourTrusts.list);
            this.yourTrusts.loading = false;
            this.yourTrusts.busy = false;
          })
          .catch(() => {
            this.yourTrusts.pn--;
            this.yourTrusts.loading = false;
            this.yourTrusts.busy = false;
          });
      }, 1000);
    },
  },
  created() {
    this.getMyInfo();
  },
};
</script>

<style lang="less" scoped>
.mining {
  line-height: 2;
  .info {
    text-align: center;
    margin-bottom: 30px;
    .title {
      font-size: 24px;
      font-weight: bold;
    }
    .slogan {
      font-size: 18px;
    }
  }
  .mining-info {
    margin-bottom: 20px;
    border-radius: 6px;
    background: #eee;
    .title {
      margin-bottom: 20px;
    }
    .content {
      display: flex;
      padding: 10px 0;
      text-align: center;
      background: #fff;
      border-radius: 10px;
      .cont-item {
        flex: 1;
        border-right: 1px solid #000;
        &:last-child {
          border: 0;
        }
      }
    }
    .foot {
      display: flex;
      font-size: 12px;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
    }
  }
  .task-info {
    line-height: 2;
    margin-bottom: 20px;
    background: #eee;
    border-radius: 6px;
    .title {
      margin-bottom: 20px;
    }
    .info-content {
      margin-bottom: 10px;
    }
    .share-input {
      flex: 1;
      text-overflow: ellipsis;
    }
    .copy-btn {
      margin-left: 20px;
    }
    .share-wrap {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
    }
  }
  .your-trusts-container {
    .title {
      margin-bottom: 10px;
    }
    .content {
      padding: 0 16px;
      max-height: 180px;
      overflow: auto;
      position: relative;
      border: 1px solid #eee;
      border-radius: 6px;
    }
    .list-item-wrap {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    .add-user {
      width: 20px;
      text-align: center;
    }
  }
}
</style>
