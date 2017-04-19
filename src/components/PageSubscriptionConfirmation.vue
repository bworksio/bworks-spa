<template>
  <div id="page" class="page-subscription-confirmation">
    <h1>{{ $t('message.subscription_confirmed') }}</h1>
    <p v-html="$i18n.t('message.subscription_confirmed_message')"></p>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'SubscriptionConfirmation',

    created () {
      this.$store.commit('setInitialized', true)
    },

    i18n: {
      messages: {
        en: {
          message: {
            subscription_confirmed: 'Subscription confirmed',
            subscription_confirmed_message: 'Your subscription to our list has been confirmed.<br><br>Thank you for subscribing!'
          }
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import '../assets/scss/mixins';

  .page-subscription-confirmation {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;

    p {
      font-size: calc(12px + 1vmin);
      line-height: calc(12px + 1vmin);
    }
  }
</style>
