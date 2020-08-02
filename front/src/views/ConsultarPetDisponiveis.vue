<template>
  <v-app id="cadastroPet">
    <v-container>
      <template v-if="qtdCadastrados == 0">
        <v-row class="justify">
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
        <v-row class="justify">
          <v-col cols="12" sm="6">
            <v-subheader v-text="'Localização'"></v-subheader>
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              v-model="cidadesSelect"
              :items="petNasCidades"
              :menu-props="{ maxHeight: '400' }"
              label="Selecione"
              multiple
              hint="Caso não selecione, irá aparecer de todas as cidades"
              persistent-hint
            ></v-select>
          </v-col>
          <v-col
            v-for="pet in listaPet"
            :key="pet.nome"
          >
            <v-card max-width="300">
              <v-img src="https://www.hypeness.com.br/wp-content/uploads/2019/09/Vira-lata_Caramelo_1.jpg" />
              <v-card-text class="text--primary">
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
        <template v-if="idUsuarioLogado == ''">
          <v-row>
            <v-col>
              <v-btn to="/login">Voltar para tela de Login</v-btn>
            </v-col>
          </v-row>
        </template>
      </template>
    </v-container>
  </v-app>
</template>

<script>
import axios from 'axios'
export default {
  name: 'cadastroPet',
  data () {
    return {
      listaPet: [],
      idUsuarioLogado: '',
      qtdCadastrados: 0,
      petNasCidades: [],
      cidadesSelect: ''
    }
  },
  watch: {
    cidadesSelect: function () {
      this.pesquisar()
    }
  },
  methods: {
    pesquisar: function () {
      let filtro = { }
      if (this.cidadesSelect.length > 0) {
        filtro = { cidadesConsulta: this.cidadesSelect }
      } else {
        filtro = { }
      }
      axios.post('http://localhost:8080/api/listarPet', filtro)
        .then((response) => {
          if (response.data) {
            if (response.data.length > 0) {
              this.listaPet = response.data

              for (let index = 0; index < this.listaPet.length; index++) {
                const petAtual = this.listaPet[index]
                this.petNasCidades.push(petAtual.cidadepet)
              }
            }
            this.qtdCadastrados = this.listaPet.length
          }
        })
        .catch((error) => {
          console.log(error.message)
        })
    }
  },
  mounted () {
    if (localStorage.usuarioLogado) {
      const dadosUsuarioLogado = JSON.parse(localStorage.usuarioLogado)
      this.idUsuarioLogado = dadosUsuarioLogado._id
      // this.cidadesSelect = dadosUsuarioLogado.cidade
    }
    // console.log(this.petNasCidades)
    this.pesquisar()
  }
}
</script>
