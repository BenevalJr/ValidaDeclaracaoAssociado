<template>
  <v-main>
    <v-layout align-center justify-center>
      <MessageAlert
        :fShowMessageMaintenance="fShowMessageMaintenance"
      ></MessageAlert>
      <v-card class="elevation-12" width="95%">
        <v-form v-model="fValid" ref="form" lazy-validation>
          <TitleForm :fTitleForm="fTitleForm" />
          <br />
          <br />
          <v-card-text>
            <div class="white info--text">
              <v-icon class="white info--text">mdi-alert</v-icon>
              Se você já se cadastrou, clique no botão abaixo aqui para acessar
              a área dos associados...
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="white"
              class="text-none info--text"
              @click="GoAreaAssociado"
            >
              <v-icon class="info--text">mdi-login-variant</v-icon>
              Área do Associado
            </v-btn>
          </v-card-actions>

          <v-card-text>
            <v-row dense>
              <v-col cols="9" sm="10" md="10">
                <v-text-field
                  dense
                  label="Nome"
                  v-model="fCadastro.nm_nome"
                  type="text"
                  :rules="[rules.required]"
                  :readonly="fShowPrint"
                />
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="9" sm="2" md="2">
                <v-text-field
                  dense
                  label="CPF"
                  v-model="fCadastro.nr_cpf"
                  type="text"
                  :rules="[rules.validationCPF]"
                  maxlength="11"
                  :readonly="fShowPrint"
                />
              </v-col>

              <v-col cols="9" sm="2" md="2">
                <v-menu
                  ref="fMenu"
                  v-model="fMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-mask="mask"
                      dense
                      v-model="fCadastro.dt_nascimento"
                      label="Data de Nascimento"
                      v-bind="attrs"
                      v-on="on"
                      prepend-icon="mdi-calendar"
                      :rules="[rules.required && rules.datanascimento]"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    ref="picker"
                    v-model="fDataNascimento"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1900-01-01"
                    @change="SaveDtNascimento"
                    :readonly="fShowPrint"
                    @input="fMenu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="9" sm="2" md="2">
                <v-select
                  dense
                  v-model="fCadastro.cd_sexo"
                  :items="fOptionsSexo"
                  menu-props="auto"
                  label="Sexo"
                  :rules="[rules.required]"
                  :readonly="fShowPrint"
                  hide-details
                  item-value="value"
                  item-text="text"
                />
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="9" sm="5" md="5">
                <v-text-field
                  dense
                  label="E-mail Principal"
                  v-model="fCadastro.nm_email"
                  type="text"
                  :rules="[rules.email]"
                  maxlength="100"
                  :readonly="fShowPrint"
                  onpaste="return false"
                  ondrop="return false"
                />
              </v-col>

              <v-col cols="9" sm="5" md="5">
                <v-text-field
                  dense
                  label="Confirme seu E-mail Principal"
                  v-model="CONFIRMA_EMAILPRINCIPAL"
                  type="text"
                  :rules="[rules.email && rules.confirmaEmailPrincipal]"
                  maxlength="100"
                  :readonly="fShowPrint"
                  onpaste="return false"
                  ondrop="return false"
                />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="9" sm="5" md="5">
                <v-text-field
                  dense
                  label="E-mail Secundário"
                  v-model="fCadastro.nm_email2"
                  type="text"
                  :rules="[rules.email2]"
                  maxlength="100"
                  :readonly="fShowPrint"
                  onpaste="return false"
                  ondrop="return false"
                />
              </v-col>
              <v-col cols="9" sm="5" md="5">
                <v-text-field
                  dense
                  label="Confirme seu E-mail Secundário"
                  v-model="CONFIRMA_EMAILSECUNDARIO"
                  type="text"
                  :rules="[
                    fCadastro.nm_email2 == '' ||
                      (rules.email2 && rules.confirmaEmailSecundario)
                  ]"
                  maxlength="100"
                  :readonly="fShowPrint"
                  onpaste="return false"
                  ondrop="return false"
                />
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="9" sm="10" md="10">
                <v-text-field
                  dense
                  label="Nome do Responsável"
                  v-model="fCadastro.nm_mae"
                  type="text"
                  :rules="[rules.required]"
                  :readonly="fShowPrint"
                />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="9" sm="10" md="10">
                <v-text-field
                  dense
                  label="Endereço"
                  v-model="fCadastro.nm_endereco"
                  type="text"
                  :rules="[rules.required]"
                  :readonly="fShowPrint"
                />
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="9" sm="2" md="2">
                <v-text-field
                  dense
                  label="Numero"
                  v-model="fCadastro.nr_numero"
                  type="text"
                  :rules="[rules.validationNumero]"
                  :readonly="fShowPrint"
                />
              </v-col>

              <v-col cols="9" sm="4" md="4">
                <v-text-field
                  dense
                  label="Complemento"
                  v-model="fCadastro.nm_complemento"
                  type="text"
                  :readonly="fShowPrint"
                />
              </v-col>

              <v-col cols="9" sm="4" md="4">
                <v-text-field
                  dense
                  label="Bairro"
                  v-model="fCadastro.nm_bairro"
                  type="text"
                  :rules="[rules.required]"
                  :readonly="fShowPrint"
                />
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="9" sm="6" md="6">
                <v-text-field
                  dense
                  label="Cidade"
                  v-model="fCadastro.nm_cidade"
                  type="text"
                  :rules="[rules.required]"
                  :readonly="fShowPrint"
                />
              </v-col>

              <v-col col="9" sm="1" md="1">
                <v-select
                  dense
                  v-model="fCadastro.cd_uf"
                  :items="fUFs"
                  menu-props="auto"
                  label="UF"
                  :rules="[rules.required]"
                  :readonly="fShowPrint"
                  hide-details
                ></v-select>
              </v-col>

              <v-col cols="9" sm="1" md="1">
                <v-text-field
                  dense
                  label="CEP"
                  v-model="fCadastro.nr_cep"
                  type="text"
                  :rules="[rules.required, rules.validationCEP]"
                  :readonly="fShowPrint"
                />
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="9" sm="3" md="3">
                <v-text-field
                  dense
                  label="Telefone Celular"
                  v-model="fCadastro.nm_telefonecelular"
                  type="text"
                  maxlength="30"
                  :readonly="fShowPrint"
                />
              </v-col>

              <v-col cols="9" sm="3" md="3">
                <v-text-field
                  dense
                  label="Telefone Residencial"
                  v-model="fCadastro.nm_telefoneresidencial"
                  type="text"
                  maxlength="30"
                  :readonly="fShowPrint"
                />
              </v-col>
            </v-row>

            <v-row class="pt-1">
              <v-col cols="9" sm="3" md="3">
                <v-select
                  dense
                  v-model="fCadastro.cd_graduacao"
                  :items="fOptionsGraduacao"
                  menu-props="auto"
                  label="Graduação"
                  :rules="[rules.required]"
                  :readonly="fShowPrint"
                  hide-details
                  item-value="value"
                  item-text="text"
                />
              </v-col>

              <v-col class="mb-n4" cols="9" sm="3" md="3">
                <v-text-field
                  dense
                  v-show="fCadastro.cd_graduacao === 4"
                  label="Curso"
                  v-model="fCadastro.nm_curso"
                  type="text"
                  :rules="[fCadastro.cd_graduacao != 4 || rules.required]"
                  :readonly="fShowPrint"
                />
              </v-col>
            </v-row>

            <v-row class="pt-0">
              <v-col cols="9" sm="4" md="4">
                <v-text-field
                  dense
                  label="Nome completo da Escola/Instituição"
                  v-model="fCadastro.nm_instituicaoensino"
                  type="text"
                  maxlength="100"
                  :readonly="fShowPrint"
                  :rules="[rules.required]"
                />
              </v-col>

              <v-col cols="9" sm="2" md="2">
                <v-select
                  dense
                  v-model="fCadastro.cd_turno"
                  :items="fOptionsTurno"
                  menu-props="auto"
                  label="Turno"
                  :rules="[rules.required]"
                  :readonly="fShowPrint"
                  hide-details
                  item-value="value"
                  item-text="text"
                />
              </v-col>
            </v-row>

            <v-row dense class="mt-n2">
              <v-col cols="9" sm="2" md="2">
                <v-text-field
                  dense
                  v-show="fCadastro.cd_graduacao != 4"
                  label="Série"
                  v-model="fCadastro.nm_serie"
                  type="text"
                  :rules="[fCadastro.cd_graduacao == 4 || rules.required]"
                  :readonly="fShowPrint"
                />
              </v-col>

              <v-col col="9" sm="2" md="2">
                <v-text-field
                  dense
                  v-show="fCadastro.cd_graduacao != 4"
                  label="Turma"
                  v-model="fCadastro.nm_turma"
                  type="text"
                  :rules="[fCadastro.cd_graduacao == 4 || rules.required]"
                  :readonly="fShowPrint"
                />
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="9" sm="12" md="12">
                <v-checkbox
                  v-model="fCadastro.ACEITE"
                  class="mx-2"
                  label="Declaro que as informações acima prestadas são verdadeiras, e assumo a inteira responsabilidade pelas mesmas."
                  :readonly="fShowPrint"
                  @click="ValidateForm()"
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-text>
            <div class="red--text" v-if="fCadastro.ACEITE && !fValid">
              <v-icon class="red--text">mdi-alert</v-icon> Preencha os campos
              obrigatórios indicados em vermelho
            </div>
            <div :class="fClassMsgAlert" v-if="fShowMsgAlert">
              <v-icon :class="fClassMsgAlert">mdi-alert</v-icon>
              {{ fMsgAlert }}
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="white"
              class="text-none info--text"
              @click="EnviarCadastro"
              v-if="!fDadosSalvos || fDebug"
              :disabled="!(fCadastro.ACEITE && fValid)"
            >
              <v-icon class="info--text">mdi-send</v-icon>Enviar Dados
            </v-btn>

            <v-btn
              color="white"
              class="text-none info--text"
              @click="NovoCadastro"
              v-if="fDadosSalvos && fNovoCadastro"
            >
              <v-icon class="info--text">mdi-account-card-details</v-icon>Novo
              Cadastro
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-layout>
  </v-main>
</template>

<script>
import api from '@/services/api'
import TitleForm from '@/components/TitleForm'
import { validate } from 'gerador-validador-cpf'
import { cTesteString, cShowMessageMaintenance } from '@/services/consts'
import MessageAlert from '@/views/MessageAlert'

export default {
  name: 'CadastroAne',

  components: {
    TitleForm,
    MessageAlert
  },

  data() {
    return {
      mask: '##/##/####',
      fDebug: true,
      fShowMessageMaintenance: cShowMessageMaintenance,

      fShowSnackBar: false,
      fTextSnackBar: '',
      fClassSnackBar: '',
      fTimeOutSnackBar: 5000,

      fValid: false,

      fMenu: false,

      fShowPrint: false,

      fDadosSalvos: false,
      fNovoCadastro: false,

      fDataNascimento: '',

      fClassMsgAlert: '',
      fMsgAlert: '',
      fShowMsgAlert: false,

      fTitleForm: cTesteString + 'Cadastro Online Ficha do Associado',

      CONFIRMA_EMAILPRINCIPAL: '',
      CONFIRMA_EMAILSECUNDARIO: '',

      fCadastro: {
        nr_cpf: '',
        nm_nome: '',
        dt_nascimento: '',
        nm_endereco: '',
        nr_numero: '',
        nm_complemento: '',
        nm_bairro: '',
        nm_cidade: '',
        cd_uf: '',
        nr_cep: '',
        fl_aceite: 'F',
        ACEITE: false,
        id_cadastro: '',
        nm_email: '',
        nm_email2: '',
        nm_telefoneresidencial: '',
        nm_telefonecelular: '',
        fl_declaracaogerada: 'F',
        fl_cadastroconfirmado: 'F',
        cd_sexo: '',
        NM_ESCOLA: '',
        NR_SERIE: '',
        NR_TURMA: '',
        NM_TURNO: '',
        cd_graduacao: 0,
        nm_curso: '',
        nm_mae: '',
        nm_profissao: 'Estudante',
        nm_instituicaoensino: '',
        nm_serie: '',
        nm_turma: '',
        cd_turno: 0,
        cd_tipoassociacao: 1
      },

      fCadastroClean: {
        nr_cpf: '',
        nm_nome: '',
        dt_nascimento: '',
        nm_endereco: '',
        nr_numero: '',
        nm_complemento: '',
        nm_bairro: '',
        nm_cidade: '',
        cd_uf: '',
        nr_cep: '',
        fl_aceite: 'false',
        ACEITE: false,
        id_cadastro: '',
        nm_email: '',
        nm_email2: '',
        nm_telefoneresidencial: '',
        nm_telefonecelular: '',
        fl_declaracaogerada: 'F',
        fl_cadastroconfirmado: 'F',
        cd_sexo: '',
        NM_ESCOLA: '',
        NR_SERIE: '',
        NR_TURMA: '',
        NM_TURNO: '',
        cd_graduacao: 0,
        nm_curso: '',
        nm_mae: '',
        nm_profissao: 'Estudante',
        nm_instituicaoensino: '',
        nm_serie: '',
        nm_turma: '',
        cd_turno: 0,
        cd_tipoassociacao: 1
      },

      fUFs: [
        'AC',
        'AL',
        'AM',
        'AP',
        'BA',
        'CE',
        'DF',
        'ES',
        'GO',
        'MA',
        'MG',
        'MS',
        'MT',
        'PA',
        'PB',
        'PE',
        'PI',
        'PR',
        'RJ',
        'RN',
        'RO',
        'RR',
        'RS',
        'SC',
        'SE',
        'SP',
        'TO'
      ],

      fOptionsSexo: [
        { value: 'M', text: 'Masculino' },
        { value: 'F', text: 'Feminino' }
      ],

      fOptionsGraduacao: [
        { value: 1, text: 'Educação Infantil' },
        { value: 2, text: 'Educação Fundamental' },
        { value: 3, text: 'Ensino Médio' },
        { value: 4, text: 'Universitário' }
      ],

      fOptionsTurno: [
        { value: 1, text: 'Matutino ( Manhã )' },
        { value: 2, text: 'Vespertino ( Tarde )' },
        { value: 3, text: 'Noturno ( Noite )' },
        { value: 4, text: 'Integral' }
      ],

      rules: {
        required: value => !!value || 'Obrigatório',
        validationCPF: value => {
          if (!validate(value)) return 'CPF inválido'
          return true
        },
        validationCEP: value => {
          if (value == undefined || value == '') return 'Obrigatório'
          if (value.length < 8) return 'CEP incompleto'
          if (!isNaN(parseFloat(value)) && value >= 0 && value <= 99999999) {
            return true
          }
          return 'Este campos apenas aceita numeros'
        },
        validationNumero: value => {
          if (value == undefined || value == '') return 'Obrigatório'
          if (value.length > 10) return 'Máximo de 10 caracteres'
          return true
        },
        email: value => {
          var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          if (re.test(value)) {
            return true
          } else {
            return 'E-mail inválido'
          }
        },
        email2: value => {
          var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          if (re.test(value) || value == '') {
            return true
          } else {
            return 'E-mail inválido'
          }
        },
        datanascimento: AValue => {
          AValue = AValue.split('/')
          var LAno = parseInt(AValue[2])

          var LAnoAtual = new Date().getFullYear()

          var LIdade = LAnoAtual - LAno
          if (
            LAno > LAnoAtual ||
            parseInt(AValue[1]) > 12 ||
            parseInt(AValue[0]) > 31
          ) {
            return 'A data informada é inválida'
          } else {
            if (LIdade < 18) {
              return 'Idade deve ser maior ou igual a 18 anos'
            } else {
              return true
            }
          }
        },
        confirmaEmailPrincipal: value => {
          if (this.fCadastro.nm_email == value) return true
          else return 'E-mails devem ser iguais'
        },
        confirmaEmailSecundario: value => {
          if (this.fCadastro.nm_email2 == value) return true
          else return 'E-mails devem ser iguais'
        }
      }
    }
  },

  watch: {
    Menu(aVal) {
      aVal && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },

  methods: {
    GoAreaAssociado() {
      this.$router.push('/areadoassociado/login')
    },

    ValidateForm() {
      this.$refs.form.validate()
    },

    NovoCadastro() {
      this.fShowPrint = false
      this.fDadosSalvos = false
      this.fCadastro = JSON.parse(JSON.stringify(this.fCadastroClean))
      this.fShowMsgAlert = false
      this.fNovoCadastro = false
    },

    ShowMsgAlert(aText, aClass) {
      this.fMsgAlert = aText
      this.fClassMsgAlert = aClass
      this.fShowMsgAlert = true
    },

    GetClass() {
      return this.fClassMsgAlert
    },

    EnviarCadastro() {
      this.ShowMsgAlert(
        'Aguarde, enviando seus dados para o cadastro...',
        'white info--text'
      )
      this.fDadosSalvos = true
      if (this.fCadastro.ACEITE) {
        this.fCadastro.fl_aceite = 'T'
      } else {
        this.fCadastro.fl_aceite = 'F'
      }
      api
        .post('/cadastroassociado', this.fCadastro)
        .then(lResponse => {
          this.ShowMsgAlert(
            'Cadastro salvo, verifique seu e-mail para validar seu cadastro ',
            'white info--text'
          )
          this.fCadastro = JSON.parse(JSON.stringify(lResponse.data))
          this.fNovoCadastro = true
        })
        .catch(lError => {
          this.ShowMsgAlert(
            lError.response.data.ErrorMessage,
            'white error--text'
          )
          this.fDadosSalvos = false
        })
    },

    SaveDtNascimento(aDate) {
      var lYear = aDate.substring(0, 4)
      var lMonth = aDate.substring(5, 7)
      var lDay = aDate.substring(8)

      this.fCadastro.dt_nascimento = `${lDay}/${lMonth}/${lYear}`
    }
  }
}
</script>
