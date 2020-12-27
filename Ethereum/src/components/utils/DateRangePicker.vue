<template>
  <a-range-picker
    class="ice-datepicker"
    :value="datesValue"
    :dropdownClassName="showTimeBtn ? '' : 'hide-time-btn-dropdown'"
    :show-time="showTimeOption"
    :disabled-date="disabledDate"
    :ranges="ranges"
    format="YYYY-MM-DD HH:mm:ss"
    @change="change"
  >
  </a-range-picker>
</template>

<script>
export default {
  name: 'DateRangePicker',
  props: {
    listenReset: {
      type: Boolean,
      default: false
    },
    showTime: {
      type: Boolean,
      default: false //true, false
    },
    showTimeBtn: {
      type: Boolean,
      default: true //true, false
    }
  },
  data(){
    return {
      showTimeOption: false,
      datesValue: []
    }
  },
  computed: {
    ranges(){
      return {
        今天: [moment().set({ h: 0, m: 0, s: 0 }), moment().set({ h: 23, m: 59, s: 59 })],
        昨天: [moment().subtract(1, 'days').set({ h: 0, m: 0, s: 0 }), moment().subtract(1, 'days').set({ h: 23, m: 59, s: 59 })],
        近两天: [moment().subtract(1, 'days').set({ h: 0, m: 0, s: 0 }), moment().set({ h: 23, m: 59, s: 59 })],
        本周: [moment().weekday(0).set({ h: 0, m: 0, s: 0 }), moment().set({ h: 23, m: 59, s: 59 })],
        近两周: [moment().subtract(14, 'days').set({ h: 0, m: 0, s: 0 }), moment().set({ h: 23, m: 59, s: 59 })],
        本月: [moment().set({ D: 1, h: 0, m: 0, s: 0 }), moment().set({ h: 23, m: 59, s: 59 })],
        近两月: [moment().subtract(2, 'month').set({ h: 0, m: 0, s: 0 }), moment().set({ h: 23, m: 59, s: 59 })]
      }
    }
  },
  created(){
    if (this.showTime){
      this.showTimeOption = {
        hideDisabledOptions: true,
        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]
      }
    }
  },
  watch: {
    listenReset(){
      this.datesValue = []
    }
  },
  methods: {
    moment,
    disabledDate(cur) {
      return cur && cur > moment().endOf('day')
    },
    change(dates, datesStr){
      this.datesValue = dates
      this.$emit('change', datesStr)
    }
  }
}
</script>

<style lang="less">
  .ice-datepicker{
    max-width: 308px;
    .hide-time-btn-dropdown .ant-calendar-time .ant-calendar-footer .ant-calendar-time-picker-btn{
      display: none;
    }
    .ant-calendar-picker-clear, .ant-calendar-picker-icon{
      right: 2px;
    }
    .ant-calendar-range-picker-input{
      width: 46%;
    }
    .ant-calendar-picker-input{
      padding: 4px;
    }
  }
</style>
