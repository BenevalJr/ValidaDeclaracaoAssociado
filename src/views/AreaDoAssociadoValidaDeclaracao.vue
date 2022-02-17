<template>
  <div>
    <v-card-text>
      <h2 class="info--text">Validação da Declaração Emitida</h2>
      <br />
      <br />
      <div class="white info--text" v-if="fTokenInProcess">
        <v-icon class="white info--text">mdi-alert</v-icon>
        Validando Token, por favor aguarde...
      </div>
      <div v-if="!fTokenInProcess">
        <div class="white info--text" v-if="fValidToken">
          <v-icon class="white info--text">mdi-alert</v-icon
          >{{ fTextTokenValidado }}
        </div>
        <div class="white error--text" v-if="!fValidToken">
          <v-icon class="white error--text">mdi-alert</v-icon
          >{{ fTextTokenInvalido }}
        </div>
      </div>
    </v-card-text>
    <!-- v-card-actions>
      <v-btn
        color="white"
        class="text-none info--text"
        @click="GoAreaAssociado"
        :disabled="!fValidToken"
      >
        <v-icon class="info--text">mdi-login-variant</v-icon> Área do Associado
      </v-btn>
    </!-->
  </div>
</template>

<script>
import apiDeclaracao from '@/services/api'
import { cClienteStr, cClienteStrCompleto } from '@/services/consts'

export default {
  name: 'AreaDoAssociadoValidaDeclaracao',

  /*components: {
    TitleForm
  },*/

  data() {
    return {
      fValidToken: false,
      fLink: '',
      fTokenInProcess: true,
      fClienteStr: cClienteStr,
      fClienteStrCompleto: cClienteStrCompleto,
      fMsgValidaDeclaracao: ''
    }
  },

  computed: {
    fTextTokenValidado: function() {
      /*
      var lDateGeracaoDeclaracao = new Date(
        this.fCadastro.dthr_geracaodeclaracao
      )
      var lStrDateGeracaoDeclaracao = lDateGeracaoDeclaracao.toLocaleDateString(
        'pt-BR'
      )
      var lStrTimeGeracaoDeclaracao = lDateGeracaoDeclaracao.toLocaleTimeString(
        'pt-BR'
      )
      var lDateDtHrInsert = new Date(this.fCadastro.dthr_insert)
      var lDateStrDtHrInsert = lDateDtHrInsert.toLocaleDateString('pt-BR')
      var lCodValidacao = lDateGeracaoDeclaracao.getFullYear() + (lDateGeracaoDeclaracao.getMonth() + 1) +
    lDateGeracaoDeclaracao.getDate() +
    'T' +
    lDatetime.getHours() +
    ':' +
    lDatetime.getMinutes() +
    ':' +
    lDatetime.getSeconds()
    */
      return this.fMsgValidaDeclaracao
      /*
        'Confirmamos que a declaração foi emitida pela ' +
        this.fClienteStr +
        ' em ' +
        lStrDateGeracaoDeclaracao +
        ' as ' +
        lStrTimeGeracaoDeclaracao +
        ' ( código de validação G.'+
        lCodValidacao +
        ' e comprova que o (a) Sr(a). ' +
        this.fCadastro.nm_nome +
        ', portador(a) do CPF No. ' +
        this.fCadastro.nr_cpf +
        ', está regularmente associado(a) a ' +
        this.fClienteStrCompleto +
        ' desde ' +
        lDateStrDtHrInsert +
        '.'
      */
    },
    fTextTokenInvalido: function() {
      return (
        'Não foi possível validar a emissão desta declaração, entre em contato com o Atendimento da ' +
        this.fClienteStr +
        ' para maiores informações'
      )
    }
  },

  mounted() {
    this.fTokenInProcess = true
    apiDeclaracao
      .get(`/dec/validatokendeclaracao/${this.$route.params.token}`)
      .then(aRes => {
        //this.fCadastro = { ...aRes.data.Cadastro }
        this.fMsgValidaDeclaracao = aRes.data.MsgValidaDeclaracao
        this.fValidToken = true
        console.log(this.fCadastro)
      })
      .catch(() => {
        this.fValidToken = false
      })
      .then(() => {
        this.fTokenInProcess = false
      })
  }
}
</script>
