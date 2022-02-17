<template>
  <div>
    <v-card-text>
      <h2 class="info--text">Confirmação do Cancelamento</h2>
      <br />
      <br />
      <div class="white info--text" v-if="fTokenInProcess">
        <v-icon class="white info--text">mdi-alert</v-icon>
        Cancelando, por favor aguarde...
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
    <!--v-card-actions>
      <v-btn
        color="white"
        class="text-none info--text"
        @click="GoAreaAssociado"
        :disabled="!fValidToken"
      >
        <v-icon class="info--text">mdi-login-variant</v-icon> Área do Associado
      </v-btn>
    </v-card-actions -->
  </div>
</template>

<script>
import api from '@/services/api'
import { cClienteStr } from '@/services/consts'

export default {
  name: 'AreaDoAssociadoConfirmaCancelamento',

  /*components: {
    TitleForm
  },*/

  data() {
    return {
      fValidToken: false,
      fLink: '',
      fTokenInProcess: true,
      fTextTokenValidado: '',
      fClienteStr: cClienteStr
    }
  },

  computed: {
    fTextTokenInvalido: function() {
      return (
        'Não foi possível cancelar seu cadastro, entre em contato com o Atendimento da ' +
        this.fClienteStr +
        ' para maiores informações'
      )
    }
  },

  methods: {
    GoAreaAssociado() {
      this.fLink = '/areadoassociado/dashboard/' + this.$route.params.token
      this.$router.push(this.fLink)
    }
  },

  mounted() {
    this.fTokenInProcess = true
    api
      .get(`/validatokencancelaassociacao/${this.$route.params.token}`)
      .then(lResponse => {
        this.fValidToken = true
        this.fTextTokenValidado = lResponse.data.MsgReturn
      })
      .catch(() => {
        this.fValidToken = false
        //this.ShowMsgAlert(lError.response.data.ErrorMessage, "white error--text");
      })
      .then(() => {
        this.fTokenInProcess = false
      })
  }
}
</script>
