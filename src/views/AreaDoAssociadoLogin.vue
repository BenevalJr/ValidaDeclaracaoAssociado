<template>
  <div>
    <v-form v-model="fValid">
      <!--MessageAlert
        :fShowMessageMaintenance="fShowMessageMaintenance"
      ></!--MessageAlert-->
      <v-card-text>
        <!-- div class="white info--text">
          Login
        </div -->
        <h2 class="info--text">Login</h2>
        <v-row>
          <v-col cols="9" sm="7" md="7">
            <v-text-field
              class="info--text"
              label="Informe seu E-mail"
              v-model="fFormData.Email"
              type="text"
              :rules="[rules.email]"
              maxlength="100"
            />
          </v-col>
        </v-row>

        <v-card-text v-if="fShowMsgAlert">
          <div :class="fClassMsgAlert">
            <v-icon :class="fClassMsgAlert">mdi-alert</v-icon> {{ fMsgAlert }}
          </div>
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="white"
            class="text-none info--text"
            @click="DoLogin"
            :disabled="!fValid || fDisableBtnEnviar"
          >
            <v-icon class="info--text">mdi-login-variant</v-icon> Entrar
          </v-btn>
        </v-card-actions>
      </v-card-text>
    </v-form>
  </div>
</template>

<script>
import api from '@/services/api'
//import { cShowMessageMaintenance } from '@/services/consts'

export default {
  name: 'AreaDoAssociadoLogin',

  data() {
    return {
      fShowMsgAlert: false,
      fClassMsgAlert: '',
      fMsgAlert: '',

      fFormData: { Email: '' },
      fValid: false,
      fDisableBtnEnviar: false,
      rules: {
        email: value => {
          var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          if (re.test(value)) {
            return true
          } else {
            return 'E-mail inválido'
          }
        }
      }
    }
  },

  methods: {
    Validate() {
      this.$refs.form.validate()
    },

    ShowMsgAlert(aText, aClass) {
      this.fMsgAlert = aText
      this.fClassMsgAlert = aClass
      this.fShowMsgAlert = true
    },

    DoLogin() {
      this.fDisableBtnEnviar = true
      api
        //.get(`/emaillogin/${this.fFormData.Email}`)
        .post('/emaillogin', this.fFormData)
        .then(() => {
          this.ShowMsgAlert(
            'Verifique sua caixa de email, um email com o link para login acaba de ser enviado',
            'white info--text'
          )
        })
        .catch(lError => {
          this.ShowMsgAlert(lError.response.data.MsgErro, 'white error--text')
          this.fDisableBtnEnviar = false
        })
    }
  }
  /*
  computed: {
    fShowMessageMaintenance: function() {
      return cShowMessageMaintenance
    }
  }
  */
}
</script>
