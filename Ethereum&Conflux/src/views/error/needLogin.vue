 <template>
  <a-result title="钱包尚未登录" sub-title="无法获取钱包地址">
    <template #icon><img src="@/assets/img/error.png" style="width: 25rem"></template>
    <template #extra>
      <a-button type="primary" @click="$store.dispatch('Login')"> 点击登录 </a-button>
    </template>
  </a-result>
</template>
