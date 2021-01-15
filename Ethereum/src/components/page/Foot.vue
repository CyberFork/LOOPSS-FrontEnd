<template>
<a-box><share-box /></a-box>
</template>
<script>
export default {
  name: 'app-footer',
  data(){
    return {
      begin: '2019',
      now: new Date().getFullYear()
    }
  },
  computed: {
    year(){
      return this.now === this.begin ? this.now : (this.begin + '-' + this.now)
    }
  }
}
</script>
