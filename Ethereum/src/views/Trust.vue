<template>
  <div class="trust">
    <a-box>
      <div class="search-wrap">
        <div class="input-wrap">
          <a-input-search
            class="search-input"
            v-model="search.inputVal"
            :placeholder="$t('trust.title')"
            size="large"
            @change="onSearch"
            :loading="search.loading"
            allowClear
          />
          <div class="list-wrap" v-if="search.inputVal">
            <a-list
              class="invite-list"
              :loading="search.loading"
              :data-source="search.list"
            >
              <a-list-item
                class="list-item-wrap"
                slot="renderItem"
                slot-scope="item, index"
                :key="index"
              >
                <a-space size="large">
                  <a-text>{{ item.address | formatUser }}</a-text>
                  <a-text :style="{ color: formatTrustType(item.trustType) }">
                    {{ formatTrustType(item.trustType, "desc") }}
                  </a-text>
                </a-space>
                <a-space class="actions f-r">
                  <img
                    v-if="item.trustType < 2"
                    class="pointer add-btn"
                    src="@/assets/img/add.png"
                    @click="addTrust(item.address)"
                  />
                  <img
                    v-else
                    class="pointer delete-btn"
                    src="@/assets/img/delete.png"
                    @click="minusTrust(item.address)"
                  />
                </a-space>
              </a-list-item>
            </a-list>
          </div>
        </div>
      </div>
      <div class="your-trusts-container">
        <div class="title">
          <a-text>{{ $t("trust.yourTrusts") }} ({{ yourTrusts.total }})</a-text>
        </div>
        <a-spin
          class="trusts-list"
          :spinning="yourTrusts.loading && !yourTrusts.busy"
        >
          <div
            class="content"
            v-infinite-scroll="getMyTrusts"
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
                    <a-text>{{ item.returnValues.BeenTrusted | formatUser }}</a-text>
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
                      @click="copyFn(item.returnValues.BeenTrusted)"
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
import i18n from "@/locales";
import Api from "@/apis";
import infiniteScroll from "vue-infinite-scroll";

export default {
  directives: {
    infiniteScroll,
  },
  data() {
    return {
      search: {
        timer: null,
        inputVal: "",
        loading: false,
        total: 0,
        list: [],
      },
      yourTrusts: {
        pn: 1,
        ps: 10,
        loading: false,
        busy: false,
        total: 0,
        list: []
      }
    }
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
    onSearch() {
      if (!this.search.inputVal) {
        return;
      }
      this.search.loading = true;
      this.search.timer && this.removeSearchTimer();
      this.search.timer = setTimeout(() => {
        Api.searchByAdress(this.search.inputVal).then((res) => {
          this.search.list = res.list;
          this.search.loading = false;
        });
      }, 1000);
    },
    formatTrustType(type, formatType) {
      //1已信任您 2您已信任 3互相信任
      switch (type) {
        case 1:
          return formatType === "desc" ? i18n.t("trust.trustYou") : "#00C1DC";
        case 2:
          return formatType === "desc" ? i18n.t("trust.youTrust") : "#00C1DC";
        case 3:
          return formatType === "desc" ? i18n.t("trust.bothTrust") : "#00D477";
        default:
          return formatType === "desc"
            ? i18n.t("trust.unknownTrust")
            : "#082C4C";
      }
    },
    addTrust(_address) {
      this.search.loading = true;
      Api.addTrust(_address)
        .then((res) => {
          this.getMyTrusts();
          this.onSearch();
        })
        .catch(() => {
          this.search.loading = false;
        });
    },
    minusTrust(_address) {
      this.search.loading = true;
      Api.minusTrust(_address)
        .then((res) => {
          this.getMyTrusts();
          this.onSearch();
        })
        .catch(() => {
          this.search.loading = false;
        });
    },
    removeSearchTimer() {
      if (this.search.timer) {
        clearTimeout(this.search.timer);
        this.search.timer = null;
      }
    },
    getMyTrusts() {
      this.yourTrusts.loading = true
      this.yourTrusts.busy = false
      this.yourTrusts.pn++
      this.yourTrusts.list = []
      if (this.yourTrusts.total && this.yourTrusts.list.length >= this.yourTrusts.total) {
        this.$message.warning("到底了");
        this.yourTrusts.loading = false;
        this.yourTrusts.busy = false;
        return;
      }
      Api.getMyTrusts()
        .then((res) => {
          this.yourTrusts.total = res.total
          this.yourTrusts.list = [...this.yourTrusts.list, ...res.list]
          this.yourTrusts.loading = false
          this.yourTrusts.busy = false
        })
        .catch(() => {
          this.yourTrusts.pn--
          this.yourTrusts.loading = false
          this.yourTrusts.busy = false
        })
    },
    showInvitedUrl() {
      const address = this.$route.query.q ? this.$route.query.q : ''
      if(!address || !Api.checkAddress(address)) return
      this.search.inputVal = address;
      this.onSearch();
    },
  },
  beforeDestroy() {
    this.removeSearchTimer();
  },
  mounted() {
    this.showInvitedUrl();
  },
};
</script>

<style lang="less" scoped>
.trust {
  .search-wrap {
    position: relative;
    padding: 0 30/@r 24/@r;
    margin-bottom: 40/@r;
    z-index: 1;
    background: url(~@/assets/img/mining_banner.png) no-repeat bottom center/100%;
    border-radius: 30/@r;
    height: 340/@r;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    .input-wrap{
      position: relative;
      .search-input {
        /deep/ input {
          font-size: 32 / @r;
          height: 80 / @r;
          line-height: 80 / @r;
          color: #010101;
          text-align: center;
          padding-right: 96 / @r;
        }
        /deep/ .ant-input-search-icon svg,
        /deep/ .ant-input-clear-icon svg {
          width: 36 / @r;
          height: 36 / @r;
        }
      }
      .list-wrap {
        max-height: 300 / @r;
        background: #a8efe4;
        overflow: auto;
        width: 100%;
        position: absolute;
        margin-top: -4px;
        border-radius: 0 0 10 / @r 10 / @r;
        .invite-list {
          color: #082c4c;
          .list-item-wrap {
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 0 20/@r;
            height: 70/@r;
            line-height: 70/@r;
            .add-btn, .delete-btn{
              width: 40/@r;
              height: 40/@r;
            }
            &:nth-child(2n) {
              background: rgba(0, 0, 0, 0.1);
            }
          }
        }
      }
    }
  }

  .your-trusts-container {
    .trust-list;
    border-radius: 30 / @r;
    overflow: hidden;
    position: relative;
    .title {
      font-size: 36 / @r;
      line-height: 100 / @r;
      padding: 0 40 / @r;
      position: relative;
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
      .copy-btn{
        width: 32/@r;
      }
    }
  }
}
</style>
