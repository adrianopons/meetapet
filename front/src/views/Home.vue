<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item to="/home">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/home/novoPet">
          <v-list-item-action>
            <v-icon>mdi-pen</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Cadastrar Pet para Doação</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/home/petsCadastrados">
          <v-list-item-action>
            <v-icon>mdi-magnify</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Consultar Meus Pets</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/home/petsCadastradosGeral">
          <v-list-item-action>
            <v-icon>mdi-magnify</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Consultar Todos os Pets</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/login">
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Sair</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>meetAPet</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-avatar color="indigo">
        <v-icon dark>mdi-account-circle</v-icon>
      </v-avatar>{{ nomeUsuario }}
    </v-app-bar>

    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col class="text-center">
            <router-view/>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import firebase from 'firebase'

export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    nomeUsuario: ''
  }),
  mounted () {
    const dadosUsuario = JSON.parse(localStorage.usuarioLogado)
    this.nomeUsuario = dadosUsuario.nome
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
