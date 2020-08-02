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
                  <v-text-field label="Nome" name="nome" prepend-icon="mdi-account" type="text" v-model="nome"></v-text-field>
                  <v-text-field label="Email" name="email" prepend-icon="mdi-account" type="text" v-model="email"></v-text-field>
                  <v-text-field label="Endereço" name="endereco" prepend-icon="mdi-account" type="text" v-model="endereco"></v-text-field>
                  <v-text-field label="Cidade" name="cidade" prepend-icon="mdi-account" type="text" v-model="cidade"></v-text-field>
                  <v-text-field id="password" label="Password" name="senha" prepend-icon="mdi-lock" type="password" v-model="senha"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="signUp">Registrar</v-btn>
                <router-link to="/login">Retornar ao login</router-link>
              </v-card-actions>
            </v-card>
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
      nome: '',
      email: '',
      endereco: '',
      cidade: '',
      senha: ''
    }
  },
  methods: {
    signUp: function () {
      axios.post('http://localhost:8080/api/cadastrarUsuario', { nome: this.nome, email: this.email, endereco: this.endereco, cidade: this.cidade, senha: this.senha })
        .then((response) => {
          if (response.data) {
            alert('Cadastrado efetuado! Por favor realize o login.')
            this.$router.replace('login')
          } else {
            alert('Cadastrado não efetuado!')
          }
        })
        .catch((error) => {
          console.log(error.message)
        })
    }
  }
}
</script>
