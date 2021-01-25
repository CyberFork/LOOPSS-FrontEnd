 <template>
  <a-result title="404" sub-title="非常抱歉，您访问的页面不存在。">
    <template #icon><img src="@/assets/img/error.png" alt="" style="width: 25rem"></template>
    <template #extra>
      <router-link to="/">
        <a-button type="primary"> 返回首页 </a-button>
      </router-link>
    </template>
  </a-result>
</template>
