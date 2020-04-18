<template>
  <q-page class="flex flex-center">

    <q-card class="auth-tabs">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="login" label="Login" />
        <q-tab name="openid" label="OpenId" />
        <q-tab name="saml" label="SAML" />
        <q-tab name="register" label="Register" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="login">
          <LoginAndRegister :tab='tab' />
        </q-tab-panel>

        <q-tab-panel name="openid">
          <LoginAndRegister :tab='tab' />
        </q-tab-panel>

        <q-tab-panel name="saml">
          <LoginAndRegister :tab='tab' />
        </q-tab-panel>
        <q-tab-panel name="register">
          <LoginAndRegister :tab='tab' />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
    <q-btn
      v-if='loggedIn'
      @click="logoutUser"
      flat
      icon-rigth='account_circle'
      label='Logout'
      class="absolute-rigth"
    />
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'PageIndex',
  data () {
    return {
      tab: 'login'
    }
  },
  components: {
    LoginAndRegister: require('components/auth/LoginAndRegister.vue').default
  },
  computed: {
    ...mapState('auth', ['loggedIn'])
  },
  methods: {
    ...mapActions('auth', ['logoutUser'])
  }
}
</script>

<style>
  .auth-tabs {
    max-width: 500px;
    margin: 0 auto;
  }
</style>
