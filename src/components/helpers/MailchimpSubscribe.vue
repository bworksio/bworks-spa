<!--
MailChimp newsletter form component

Usage:
  <mailchimp dataCenter="usX" listId="XXXXXXXXXX"></mailchimp>

  To get your list id see this knowledgebase article:
  http://kb.mailchimp.com/lists/manage-contacts/find-your-list-id

Requirements:
  yarn add form-serialize

-->

<template>
  <form v-if="!successMessage" @submit.prevent="subscribe($event)">
    <input v-model="email" name="EMAIL" type="text" placeholder="Email" id="email" />
    <input type="submit" />
  </form>
  <p v-if="errorMessage && !successMessage" transition="fade">{{ errorMessage }}</p>
  <p v-if="successMessage" transition="fade">{{ successMessage }}</p>
</template>

<script type="text/javascript">
  import serialize from 'form-serialize'

  export default {
    name: 'MailchimpSubscribe',

    props: {
      /** @property {string} listId A MailChimp List ID */
      listId: {
        required: true,
        type: String
      }
    },

    data () {
      return {
        email: '',
        response: {},
        errorMessage: null,
        successMessage: null
      }
    },

    methods: {
      subscribe: function(e) {
        const params = serialize(e.currentTarget);
        return $.ajax({
          type: 'POST',
          url: this.action,
          data: params,
          dataType: 'jsonp',
          success: (function(_this) {
            return function(res) {
              if (res.result === 'success') {
                return _this.successMessage = res.msg;
              } else {
                _this.errorMessage = res.msg;
                return _this.errorMessage = _this.errorMessage.substring(_this.errorMessage.indexOf('-') + 1, _this.errorMessage.length);
              }
            };
          })(this)
        });
      }
    },

    // Component lifecycle hooks
    beforeCreate () {},
    mounted () {}
  }
</script>

<style rel="stylesheet/scss" lang="scss"></style>
