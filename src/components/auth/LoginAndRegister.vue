<template>
    <form @submit.prevent="submitForm">
        <div class="div row q-mb-md">
            <q-banner class="bg-grey-3 col">
            <template v-slot:avatar>
                <q-icon name="account_circle" color="primary" />
            </template>
        {{ tab | titleUpperCase }} to access our application.
        </q-banner>
        </div>
        <div class="row q-mb-md">
            <q-input
            class="col"
            outlined
            v-model="formData.email"
            label="Email"
            stack-label
            :rules="[ val => isValidEmailAddress(val) || 'Please enter a valid email address']"
            lazy-rules
            ref="email"
            />
        </div>
        <div class="row q-mb-md">
            <q-input
            class="col"
            outlined
            v-model="formData.password"
            label="Password"
            type="password"
            stack-label
            :rules="[ val => val.length >= 6 || 'Please use atleast 6 characters']"
            lazy-rules
            ref="password"
            />
        </div>
        <div class="row">
          <q-space />
          <q-btn
          color="primary"
          :label="tab"
          type="submit"
          />
        </div>
    </form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['tab'],
  data () {
    return {
      formData: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions('auth', ['registerUser', 'loginUser']),
    isValidEmailAddress (email) {
      var re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
      return re.test(String(email).toLowerCase())
    },
    submitForm () {
      this.$refs.email.validate()
      this.$refs.password.validate()
      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        if (this.tab === 'login') {
          this.loginUser(this.formData)
        } else if (this.tab === 'openid') {
          console.log('login with openid')
        } else if (this.tab === 'saml') {
          console.log('Login with saml')
        } else {
          this.registerUser(this.formData)
        }
      }
    }
  },
  filters: {
    titleUpperCase (value) {
      if (value === 'login') {
        return value.charAt(0).toUpperCase() + value.slice(1)
      } else if (value === 'openid') {
        return 'Login with ' + value
      } else if (value === 'saml') {
        return 'Login with ' + value
      }
    }
  }
}
</script>
