<template>
  <v-container fluid>
    <template v-if="qtdCadastrados == 0">
      <v-row app>
        <v-col>
          <center>
          <v-card max-width="300">
            <v-card-text class="text--primary">
              Nenhum Pet cadastrado
            </v-card-text>
          </v-card>
          </center>
        </v-col>
      </v-row>
    </template>
    <template v-else>
      <v-card class="mx-auto" max-width="650">
        <v-row app>
          <v-col
            v-for="pet in listaPet"
            :key="pet.nome"
          >
            <v-card max-width="300">
              <v-img src="https://www.hypeness.com.br/wp-content/uploads/2019/09/Vira-lata_Caramelo_1.jpg" />
              <v-card-text class="text--primary">
                <template v-if="idUsuarioLogado == pet.idusuario">
                  <v-chip
                    class="mr-2"
                    :to="pet.linkEditar"
                  >
                    <v-icon left>mdi-cog</v-icon>
                    Editar
                  </v-chip>
                  <v-chip
                    class="mr-2"
                    @click="apagar(pet.idlista)"
                  >
                    <v-icon left>mdi-eraser</v-icon>
                    Remover
                  </v-chip>
                </template>
                <div><b>Nome:</b> {{ pet.nomepet }}</div>
                <div><b>Raça:</b> {{ pet.racapet }}</div>
                <div><b>Idade:</b> {{ pet.idadepet }}</div>
                <div><b>Peso:</b> {{ pet.pesopet }}</div>
                <div><b>Cidade:</b> {{ pet.cidadepet }}</div>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>mdi-email</v-icon>
                </v-btn>
                <v-card-text class="text--secondary">
                  {{ pet.nomeusuario }} <br> (<a>{{ pet.emailusuario }}</a>)
                  <v-spacer></v-spacer>
                </v-card-text>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </template>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'cadastroPet',
  data () {
    return {
      listaPet: [],
      idUsuarioLogado: '',
      qtdCadastrados: 0
    }
  },
  methods: {
    pesquisar: function () {
      const dadosUsuario = JSON.parse(localStorage.usuarioLogado)
      this.idUsuarioLogado = dadosUsuario._id
      axios.post('http://localhost:8080/api/listarPet', { idusuario: this.idUsuarioLogado })
        .then((response) => {
          if (response.data) {
            if (response.data.length > 0) {
              this.listaPet = response.data
            }
            this.qtdCadastrados = this.listaPet.length
          }
        })
        .catch((error) => {
          console.log(error.message)
        })
    },
    apagar: function (id) {
      axios.post('http://localhost:8080/api/removerPet', { id: id })
        .then((response) => {
          if (response.data) {
            this.pesquisar()
          }
        })
        .catch((error) => {
          console.log(error.message)
        })
    }
  },
  mounted () {
    this.pesquisar()
  }
}
</script>
