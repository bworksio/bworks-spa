<template>
  <div id="page" class="page-not-found">
    <div class="sorry">We're terribly sorry, but…</div>
    <div class="status-404">404</div>
    <div class="not-found">Not found</div>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'NotFound',
    created () {
      this.$store.commit('setInitialized', true)
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import 'assets/scss/mixins';

  .page-not-found {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-weight: $font-weight-heavy;

    .sorry {
      font-size: 2vmin;
      line-height: 2vmin;
    }

    .status-404 {
      color: $brand-primary;
      font-size: 20vw;
      line-height: 20vw;
    }

    .not-found {
      margin-right: -1vw;
      font-size: 6vw;
      line-height: 6vw;
      letter-spacing: .75vw;
      word-spacing: 2vw;
    }
  }
</style>
