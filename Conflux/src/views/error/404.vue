 <template>
  <a-result status="404" title="404" :sub-title="$t('error404.noPage')">
    <template #extra>
      <a-button type="primary">
        <router-link to="/">{{$t('error404.toHome')}}</router-link>
      </a-button>
    </template>
  </a-result>
</template>
