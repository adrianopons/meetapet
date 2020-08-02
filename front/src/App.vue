<template>
    <router-view/>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'App',
  data () {
    return {
      email: '',
      senha: ''
    }
  },
  methods: {
    sair: function () {
      firebase.auth().signOut().then(() => {
        this.$router.push('login').catch(error => {
          if (error.name !== 'NavigationDuplicated') {
            throw error
          }
        })
      })
    }
  }
}
</script>
