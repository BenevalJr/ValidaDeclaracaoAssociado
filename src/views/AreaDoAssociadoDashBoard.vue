<template>
  <div>
    <!--MessageAlert
      :fShowMessageMaintenance="fShowMessageMaintenance"
    ></!--MessageAlert-->
    <v-card-text>
      <v-card-text>
        <div class="white info--text" v-if="!fTokenInProcess && fValidToken">
          Bem vindo a Área de Associado, {{ fCadastro.nm_nome }}, aqui você pode
          gerar a sua Declaração de Associado clicando no botão abaixo. Por
          favor verifique se seu navegador esta permitindo janelas popup.
        </div>
        <div class="white info--text" v-if="fTokenInProcess">
          <v-icon class="white info--text">mdi-alert</v-icon>
          Validando Token, por favor aguarde...
        </div>
      </v-card-text>
      <br />
      <div :class="fClassMsgAlert" v-if="fShowMsgAlert">
        <v-icon :class="fClassMsgAlert">mdi-alert</v-icon> {{ fMsgAlert }}
        <br />
        Clique no botão abaixo para acessar informar seu e-mail e receber um
        novo Token Válido
      </div>
      <div :class="fClassMsgAlertCancelamento" v-if="fShowMsgAlertCancelamento">
        <v-icon :class="fClassMsgAlertCancelamento">mdi-alert</v-icon>
        {{ fMsgAlertCancelamento }}
        <br />
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="white"
        class="text-none info--text"
        @click="ImprimirDeclaracaoAssociado"
        v-if="fValidToken"
        :disabled="!fEnabledBtnImprimir"
      >
        <v-icon class="info--text">mdi-printer</v-icon>Declaração de Associado
      </v-btn>
      &nbsp;
      <v-btn
        color="white"
        class="text-none info--text"
        @click="GoAreaAssociado"
        v-if="fShowMsgAlert"
      >
        <v-icon class="info--text">mdi-login-variant</v-icon>
        Área do Associado
      </v-btn>
    </v-card-actions>
    <v-card-text v-if="!fTokenInProcess && fValidToken">
      <h3 class="info--text">Seus Arquivos</h3>
      <v-card-actions>
        <v-btn
          color="white"
          class="text-none info--text"
          v-if="fValidToken"
          @click="OnToggleShowUploadForm"
        >
          <v-icon>mdi-upload</v-icon>Enviar Documentos
        </v-btn>
      </v-card-actions>
      <div>
        <ul>
          <li v-for="fFileUser in fFilesUser" :key="fFileUser.id_arquivo">
            <a :href="fFileUser.url" target="_blank">
              {{ fFileUser.nm_arquivo }}
            </a>
          </li>
        </ul>
      </div>
    </v-card-text>

    <FileUpload
      v-if="fShowUploadForm"
      :fShowUploadForm="fShowUploadForm"
      @OnToggleShowUploadFormOwner="OnToggleShowUploadForm"
      :fToken="fToken"
    />

    <DialogConfirm
      v-if="fShowDialogConfirm"
      :fShowDialogConfirm="fShowDialogConfirm"
      fTextTitleDialog="Cancelamento da Associação"
      fTextDialog="Confirma o Cancelamento da sua Associação?"
      @onResultYesOwner="onResultYes"
      @onResultNoOwner="onResultNo"
    />

    <v-card-text>
      <h4
        color="white"
        class="text-none info--text"
        v-if="fValidToken"
        :disabled="!fEnabledBtnImprimir"
      >
        <v-icon class="info--text">mdi-cancel</v-icon>
        <a href="#" @click="CancelaAssociado()"
          >&nbsp;&nbsp;Cancelar Associação
        </a>
      </h4>
    </v-card-text>
  </div>
</template>

<script>
import { api, apiDeclaracao } from '@/services/api'
import FileUpload from '@/components/FileUpload'
import DialogConfirm from '@/components/DialogConfirm'
//import { cShowMessageMaintenance } from '@/services/consts'

export default {
  name: 'AreaDoAssociadoDashBoard',

  components: {
    //TitleForm,
    FileUpload,
    DialogConfirm
  },
  /*
  computed: {
    fShowMessageMaintenance: function() {
      return cShowMessageMaintenance
    }
  },
*/
  data() {
    return {
      fShowDialogConfirm: false,
      fClassMsgAlert: '',
      fClassMsgAlertCancelamento: '',
      fMsgAlert: '',
      fMsgAlertCancelamento: '',
      fShowMsgAlert: false,
      fShowMsgAlertCancelamento: false,
      fValidToken: false,
      fEnabledBtnImprimir: true,
      fShowUploadForm: false,
      fToken: '',
      fCadastro: {
        nr_cpf: '',
        nm_nome: '',
        dt_nascimento: '',
        nm_mae: '',
        nm_endereco: '',
        nr_numero: '',
        nm_complemento: '',
        nm_bairro: '',
        nm_cidade: '',
        cd_uf: '',
        nr_cep: '',
        nm_profissao: '',
        fl_aceite: 'F',
        ACEITE: 'false',
        id_cadastro: '',
        nm_email: '',
        nm_telefoneresidencial: '',
        nm_telefonecomercial: '',
        nm_telefonecelular: '',
        fl_declaracaogerada: 'F',
        fl_cadastroconfirmado: 'F'
      },
      fFilesUser: [],
      fTokenInProcess: true
    }
  },

  mounted() {
    this.CallValidaToken()
  },

  methods: {
    CallValidaToken() {
      this.fTokenInProcess = true
      api
        .get(`/validatokenassociado/${this.$route.params.token}`)
        .then(lResponse => {
          this.fValidToken = true
          this.fCadastro = { ...lResponse.data.Cadastro }
          console.log('this.fCadastro: ' + this.fCadastro)
          this.fFilesUser = lResponse.data.Files
        })
        .catch(lError => {
          this.fValidToken = false
          this.ShowMsgAlert(lError.response.data.MsgErro, 'white error--text')
        })
        .then(() => {
          this.fTokenInProcess = false
          this.fToken = this.$route.params.token
        })
    },

    OnToggleShowUploadForm() {
      this.fShowUploadForm = !this.fShowUploadForm
      if (!this.fShowUploadForm) {
        this.CallValidaToken()
      }
    },

    ImprimirDeclaracaoAssociado() {
      this.fEnabledBtnImprimir = false

      apiDeclaracao
        .get(`/declaracao/${this.fCadastro.id_cadastro}`)
        .then(lResponse => {
          window.open(lResponse.data.URLDeclaracao)
        })
        .catch(() => {
          this.ShowErrorMessage(
            'Declaração do Associado não Gerada',
            'white error--text'
          )
        })
        .then(() => {
          this.fEnabledBtnImprimir = true
        })
    },

    CancelaAssociado() {
      this.fShowDialogConfirm = true
    },

    onResultNo() {
      this.fShowDialogConfirm = false
    },

    onResultYes() {
      api
        .get(`/cancelaassociacao/${this.fToken}`)
        .then(() => {
          this.fShowDialogConfirm = false
          this.ShowMsgAlertCancelamento(
            'Verifique sua caixa de e-mail para confirmar o cancelamento.',
            'white red--text'
          )
        })
        .catch(lError => {
          this.fShowDialogConfirm = false
          this.ShowMsgAlert(lError.response.data.MsgErro, 'white error--text')
        })
    },

    ShowMsgAlert(aText, aClass) {
      this.fMsgAlert = aText
      this.fClassMsgAlert = aClass
      this.fShowMsgAlert = true
    },

    ShowMsgAlertCancelamento(aText, aClass) {
      this.fMsgAlertCancelamento = aText
      this.fClassMsgAlertCancelamento = aClass
      this.fShowMsgAlertCancelamento = true
    },

    GoAreaAssociado() {
      this.$router.push('/areadoassociado/login')
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
