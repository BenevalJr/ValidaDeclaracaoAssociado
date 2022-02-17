<template>
  <div>
    <v-row justify="center">
      <v-dialog
        v-model="fShowUploadForm"
        max-width="50%"
        class="elevation-1"
        persistent
      >
        <v-card-actions id="frmUploadForm">
          <v-card width="99%">
            <v-card-title class="info--text">
              Envio de Documentos
            </v-card-title>
            <v-divider />
            <div>
              <v-row>
                <v-col cols="9" sm="10" md="10">
                  <v-file-input
                    @change="LoadFileInBase64"
                    v-model="fFileUpload"
                  />
                </v-col>
              </v-row>
              <div class="white info--text" v-if="fUploadInProcess">
                <v-icon class="white info--text">mdi-alert</v-icon>
                Enviando documento, por favor aguarde...
              </div>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="white"
                  class="text-none info--text"
                  @click="UploadFile"
                  :disabled="!fEnableSend || fUploadInProcess"
                >
                  <v-icon>mdi-upload</v-icon> Enviar Documento
                </v-btn>
                <v-btn
                  color="white"
                  class="text-none info--text"
                  :disabled="fUploadInProcess"
                  @click="OnToggleShowUploadForm"
                >
                  <v-icon>mdi-backup-restore</v-icon>Voltar
                </v-btn>
              </v-card-actions>
            </div>
          </v-card>
        </v-card-actions>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import api from '../services/api'

export default {
  name: 'FileUpload',
  props: {
    fShowUploadForm: Boolean,
    fToken: String
  },
  data() {
    return {
      fPostData: {
        FileContentBase64: null,
        FileName: ''
      },
      fFileUpload: null,
      fEnableSend: false,
      fUploadInProcess: false
    }
  },
  methods: {
    OnToggleShowUploadForm() {
      this.$emit('OnToggleShowUploadFormOwner')
    },
    UploadFile: function() {
      this.fUploadInProcess = true
      this.fPostData.FileName = this.fFileUpload.name
      api
        .post(`/documento/${this.fToken}`, this.fPostData)
        .then(() => {
          alert('Envio do Documento realizado com sucesso!')
          this.OnToggleShowUploadForm()
        })
        .catch(lError => {
          console.log(lError)
          alert(
            'Envio do Documento não realizado! ' + lError.response.data.MsgErro
          )
        })
        .then(() => {
          this.fUploadInProcess = false
        })
    },
    LoadFileInBase64: function() {
      var file = document.querySelector('input[type=file]').files[0]
      var reader = new FileReader()
      var vm = this
      reader.onload = function(e) {
        vm.fPostData.FileContentBase64 = e.target.result
        vm.fEnableSend = true
      }
      reader.onerror = function(error) {
        alert(error)
      }
      vm.fEnableSend = false
      if (file != undefined) {
        reader.readAsDataURL(file)
      }
    }
  }
}
</script>
