<template>
    <div class="grey darken-1 empty-layout">
        <router-view/>
    </div>
</template>
<script>
import messages from '@/common/messages'
export default {
  computed: {
    error () {
      return this.$store.getters.error
    }
  },
  watch: {
    error (fbError) {
      console.log(fbError)
      this.$error(messages[fbError.code] || 'Error 404')
    }
  }
}
</script>
