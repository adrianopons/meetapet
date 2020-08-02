<template>
  <v-app>
    <v-main>
      <v-container class="fill" fluid>
        <v-row class="text-center">
          <v-col cols="12">
            <v-img :src="require('../assets/45985.jpg')" class="my-3" contain height="200"/>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <center><h1>meetAPet - Adote um amigo!</h1></center>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-card-text>
                <v-form>
                  <v-text-field label="Email" name="email" prepend-icon="mdi-account" type="text" v-model="email"></v-text-field>
                  <v-text-field id="password" label="Password" name="senha" prepend-icon="mdi-lock" type="password" v-model="senha"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login">Login</v-btn>
                <v-btn color="primary" @click="registrar">Criar uma conta</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4" align="center" justify="center">
            <v-btn color="secondary" @click="consultar">Confira nossos amigos cadastrados!</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'
export default {
  name: 'sign-up',
  data () {
    return {
      email: '',
      senha: ''
    }
  },
  methods: {
    login: function () {
      axios.post('http://localhost:8080/api/verificarUsuario', { email: this.email, senha: this.senha })
        .then((response) => {
          if (response.data[0] && response.data[0].nome) {
            localStorage.usuarioLogado = JSON.stringify(response.data[0])
            alert(`Bem vindo ${response.data[0].nome}`)
            this.$router.push('/home')
          } else {
            alert('Usuário não encontrado!')
          }
        })
        .catch((error) => {
          console.log(error.message)
        })
    },
    registrar: function () {
      this.$router.push('registrar').catch(error => {
        if (error.name !== 'NavigationDuplicated') {
          throw error
        }
      })
    },
    consultar: function () {
      this.$router.push('petsCadastradosGeral').catch(error => {
        if (error.name !== 'NavigationDuplicated') {
          throw error
        }
      })
    }
  },
  mounted () {
    localStorage.usuarioLogado = ''
  }
}
</script>
