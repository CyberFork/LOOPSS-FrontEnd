<template>
  <div class="trust">
    <a-box class="search-wrap">
      <div class="title">{{ $t("trust.title") }}</div>
      <a-input-search
        v-model="search.inputVal"
        :placeholder="$t('trust.placeholder')"
        enter-button
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
          <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
            <div class="list-item-wrap">
              <a-space size="large">
                <a-text>{{ item.address }}</a-text>
                <a-tag :color="item.trustType | formatTrustType">{{
                  item.trustType | formatTrustType("desc")
                }}</a-tag>
              </a-space>
              <a-space class="actions f-r">
                <a-icon
                  v-if="item.trustType < 2"
                  class="pointer"
                  type="plus-circle"
                  @click="addTrust(item.address)"
                />
                <a-icon
                  v-else
                  class="pointer"
                  type="minus-circle"
                  @click="minusTrust(item.address)"
                />
              </a-space>
            </div>
          </a-list-item>
        </a-list>
      </div>
    </a-box>
    <a-box class="your-trusts-container">
      <div class="title">
        <a-text strong
          >{{ $t("trust.yourTrusts") }} ({{ yourTrusts.total }})</a-text
        >
      </div>
      <a-spin :spinning="yourTrusts.loading && !yourTrusts.busy">
        <div
          class="content"
          v-infinite-scroll="getMyTrusts"
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
                  <a-text>{{ item.returnValues.BeenTrusted }}</a-text>
                  <div class="add-user">
                    <a-icon v-if="item.isAdded" type="user-add" />
                  </div>
                  <a-text>{{ item.time }}</a-text>
                </a-space>
                <a-space class="actions">
                  <a-icon
                    class="pointer"
                    type="copy"
                    @click="copyFn(item.returnValues.BeenTrusted)"
                  />
                  <a-text
                    link
                    target="_blank"
                    :href="item.returnValues.BeenTrusted"
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
        total: 10000,
        list: [],
      },
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  filters: {
    formatTrustType(type, formatType) {
      switch (type) {
        case 1:
          return formatType === "desc" ? i18n.t("trust.trustYou") : "orange";
        case 2:
          return formatType === "desc" ? i18n.t("trust.youTrust") : "cyan";
        case 3:
          return formatType === "desc" ? i18n.t("trust.bothTrust") : "green";
        default:
          return formatType === "desc" ? i18n.t("trust.unknownTrust") : "";
      }
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
    // getYourTrusts() {
    //   this.yourTrusts.loading = true;
    //   this.yourTrusts.busy = false;
    //   if (this.yourTrusts.list.length > 14) {
    //     this.$message.warning("到底了");
    //     this.yourTrusts.loading = false;
    //     this.yourTrusts.busy = false;
    //     return;
    //   }
    //   setTimeout(() => {
    //     this.yourTrusts.loading = false;
    //     this.yourTrusts.busy = false;
    //     this.yourTrusts.list = this.yourTrusts.list.concat(
    //       this.yourTrusts.list
    //     );
    //   }, 2000);
    // },
    removeSearchTimer() {
      if (this.search.timer) {
        clearTimeout(this.search.timer);
        this.search.timer = null;
      }
    },
    getMyTrusts() {
      this.yourTrusts.loading = true;
      this.yourTrusts.busy = false;
      this.yourTrusts.pn++;
      this.yourTrusts.list = [];
      // if (this.yourTrusts.list.length >= this.yourTrusts.total) {
      //   this.$message.warning("到底了");
      //   this.yourTrusts.loading = false;
      //   this.yourTrusts.busy = false;
      //   return;
      // }
      setTimeout(() => {
        Api.getMyTrusts()
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
      }, 1000);
    },
  },
  beforeDestroy() {
    this.removeSearchTimer();
  },
};
</script>

<style lang="less" scoped>
.trust {
  .search-wrap {
    position: relative;
    padding: 80px 0 40px;
    z-index: 1;
    .title {
      font-size: 20px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 30px;
    }
    .list-wrap {
      background: #fff;
      max-height: 300px;
      overflow: auto;
      width: 100%;
      position: absolute;
      padding: 0 16px;
      border: 1px solid #eee;
      .invite-list {
        .list-item-wrap {
          width: 100%;
          display: flex;
          justify-content: space-between;
        }
      }
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
