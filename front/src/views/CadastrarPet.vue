<template>
  <v-container class="fill" fluid>
    <v-row align="left" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-form>
          <v-img src="https://www.hypeness.com.br/wp-content/uploads/2019/09/Vira-lata_Caramelo_1.jpg" />
          <v-text-field label="Nome" name="nome" prepend-icon="mdi-account" type="text" v-model="nome"></v-text-field>
          <v-text-field label="Raça" name="raca" prepend-icon="mdi-account" type="text" v-model="raca"></v-text-field>
          <v-text-field label="Idade" name="idade" prepend-icon="mdi-account" type="text" v-model="idade"></v-text-field>
          <v-text-field label="Peso" name="peso" prepend-icon="mdi-account" type="text" v-model="peso"></v-text-field>
          <v-text-field label="Cidade" name="cidade" prepend-icon="mdi-account" type="text" v-model="cidade"></v-text-field>
          <v-spacer></v-spacer>
          <div v-if="descricaoBtn == 'Cadastrar'">
            <v-btn color="primary" @click="cadastrar">{{ descricaoBtn }}</v-btn>
          </div>
          <div v-else>
            <v-btn color="primary" @click="alterar">{{ descricaoBtn }}</v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'cadastroPet',
  data () {
    return {
      id: '',
      nome: '',
      raca: '',
      idade: '',
      peso: '',
      cidade: '',
      descricaoBtn: 'Cadastrar'
    }
  },
  methods: {
    cadastrar: function () {
      const dadosUsuario = JSON.parse(localStorage.usuarioLogado)
      axios.post('http://localhost:8080/api/cadastrarPet', { idusuario: dadosUsuario._id, nome: this.nome, raca: this.raca, idade: this.idade, peso: this.peso, cidade: this.cidade })
        .then((response) => {
          if (response.data) {
            alert('Cadastrado efetuado!')
            this.$router.push('petsCadastrados')
          } else {
            alert('Cadastrado não efetuado!')
          }
        })
        .catch((error) => {
          console.log(error.message)
        })
    },
    alterar: function () {
      axios.post('http://localhost:8080/api/editarPet', { id: this.id, nome: this.nome, raca: this.raca, idade: this.idade, peso: this.peso, cidade: this.cidade })
        .then((response) => {
          if (response.data) {
            alert('Alteração efetuada!')
            this.$router.push('petsCadastrados')
          } else {
            alert('Alteração não efetuada!')
          }
        })
        .catch((error) => {
          console.log(error.message)
        })
    }
  },
  mounted () {
    if (this.$route.query.id) {
      axios.post('http://localhost:8080/api/consultarPet', { id: this.$route.query.id })
        .then((response) => {
          if (response.data) {
            const petParaEditar = response.data[0]
            this.id = this.$route.query.id
            this.nome = petParaEditar.nome
            this.raca = petParaEditar.raca
            this.idade = petParaEditar.idade
            this.peso = petParaEditar.peso
            this.cidade = petParaEditar.cidade

            this.descricaoBtn = 'Atualizar'
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
