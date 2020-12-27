<template>
  <a-card>
    <a-affix :offset-top="60" style="position:absolute;right:10px;">
      <a-button type="primary">Affix top</a-button>
    </a-affix>
    <a-tabs type="card" default-active-key="1" @change="tabChange" style="margin-bottom: 10px">
      <a-tab-pane key="1" tab="按钮/文本">
        <y-button/>
      </a-tab-pane>
      <a-tab-pane key="2" tab="表单">
        <a-input-search placeholder="搜一搜" enter-button="搜索" size="large" @search="()=>{}" style="margin-bottom: 16px" />
        <y-filters />
        <a-card title="Select">
          <y-select />
        </a-card>
        <a-card title="TreeSelect">
          <y-tree-select />
        </a-card>
      </a-tab-pane>
      <a-tab-pane key="3" tab="上传">
        <y-upload />
      </a-tab-pane>
      <a-tab-pane key="4" tab="Form">
        <a-card>
          <y-form-model :labelCol="{span: 7}" :wrapperCol="{span: 10}" />
        </a-card>
      </a-tab-pane>
      <a-tab-pane key="5" tab="弹框">
        <y-dialog />
      </a-tab-pane>
      <a-tab-pane key="6" tab="其他">
        <a-row :gutter="16">
          <a-col :span="8">
            <a-card title="评分">
              <a-rate :default-value="2.5" allow-half :disabled="false" allowClear character="A" :count="5"
                style="width:130px" />
              <a-divider dashed orientation="right" type="horizontal" style="font-size:12px;margin:2px 0;">分割线
              </a-divider>
              <a-rate :default-value="3">
                <a-icon slot="character" type="heart" />
              </a-rate>
            </a-card>
          </a-col>
          <a-col :span="8">
            <a-card title="滑块">
              <a-slider :default-value="30" :reverse="true" :min="1" :max="100" />
              <a-slider range :default-value="[20, 50]" :marks="marks" />
            </a-card>
          </a-col>
          <a-col :span="8">
            <a-card title="头像">
              <a-avatar>
                <a-icon slot="icon" type="user" />
              </a-avatar>
              <a-avatar style="backgroundColor:#87d068" icon="user" />
              <a-avatar>USER</a-avatar>
              <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                style="backgroundColor:#87d068" />
              <a-badge dot style="margin-right:5px">
                <a-avatar shape="square" icon="user" />
              </a-badge>
              <a-badge style="margin-right:10px">
                <a-icon slot="count" type="clock-circle" style="color: #f5222d" />
                <a-avatar shape="square" icon="user">USER</a-avatar>
              </a-badge>
              <a-badge :count="999" :overflow-count="98">
                <a-avatar shape="square" icon="user" />
              </a-badge>
              <br><br>
              <a-badge status="success" text="Success" style="margin-right:10px" />
              <a-badge status="error" text="Error" style="margin-right:10px" />
              <a-badge status="default" text="Default" style="margin-right:10px" />
              <a-badge status="processing" text="Processing" style="margin-right:10px" />
              <a-badge status="warning" text="warning" style="margin-right:10px" />
              <a-badge color="pink" text="粉红" style="margin-right:10px" />
            </a-card>
          </a-col>
        </a-row>
      </a-tab-pane>
    </a-tabs>
    <a-tabs type="card" @change="tabChange" default-active-key="1">
      <a-tab-pane key="1" tab="表格">
        <y-table />
      </a-tab-pane>
      <a-tab-pane key="2" tab="分页">
        <y-pagination />
      </a-tab-pane>
      <a-tab-pane key="3" tab="步骤条">
        <y-steps />
      </a-tab-pane>
      <a-tab-pane key="4" tab="轮播图">
        <y-banner />
      </a-tab-pane>
    </a-tabs>
    <a-card title="折叠面板" style="margin: 10px 0;">
      <a-collapse :accordion="accordion" default-active-key="3">
        <a-collapse-panel key="1" header="评论">
          <y-comment />
        </a-collapse-panel>
        <a-collapse-panel key="2" header="描述详情" :disabled="false">
          <a-descriptions title="用户详情" bordered size="middle" layout=""
            :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }">
            <a-descriptions-item label="Product">Cloud Database</a-descriptions-item>
            <a-descriptions-item label="Billing Mode">Prepaid</a-descriptions-item>
            <a-descriptions-item label="Automatic Renewal">YES</a-descriptions-item>

            <a-descriptions-item label="Order time">2018-04-24 18:00:00</a-descriptions-item>
            <a-descriptions-item label="Usage Time" :span="2">2019-04-24 18:00:00</a-descriptions-item>

            <a-descriptions-item label="Status" :span="3">
              <a-badge status="processing" text="Running" />
            </a-descriptions-item>

            <a-descriptions-item label="Negotiated Amount">$80.00</a-descriptions-item>
            <a-descriptions-item label="Discount">$20.00</a-descriptions-item>
            <a-descriptions-item label="Official Receipts">$60.00</a-descriptions-item>

            <a-descriptions-item label="Config Info">
              Data disk type: MongoDB<br />
              Database version: 3.4<br />
              Package: dds.mongo.mid<br />
              Storage space: 10 GB<br />
              Replication factor: 3<br />
              Region: East China 1<br />
            </a-descriptions-item>
          </a-descriptions>
        </a-collapse-panel>
        <a-collapse-panel key="3" header="List列表">
          <y-list />
        </a-collapse-panel>
      </a-collapse>
    </a-card>
    <a-affix :offset-bottom="60" style="position:absolute;right:10px;">
      <a-button type="primary">Affix bottom</a-button>
    </a-affix>
    <a-back-top :visibilityHeight="30" />
  </a-card>
</template>
<script>
  // @ is an alias to /src
  import components from 'components/demo'

  export default {
    name: 'List',
    components,
    data() {
      return {
        marks: {
          0: '0°C',
          26: '26°C',
          37: '37°C',
          100: {
            style: {
              color: '#f50'
            },
            label: '100°C'
          }
        },
        accordion: true //true为只能同时打开一个
      }
    },
    methods: {
      tabChange(...val) {
        console.log(val)
      }
    },
    created() {}
  }

</script>

<style lang="less" scoped>
  .ant-space-vertical {
    width: 100%;
  }

  .tab-cont {
    height: 700px;
  }

</style>
