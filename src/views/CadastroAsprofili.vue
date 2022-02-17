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
            <v-row class="pb-2">
              <v-col col="9" sm="2" md="2">
                <v-select
                  dense
                  v-model="fCadastro.cd_tipoassociacao"
                  :items="fTipoAssociacao"
                  menu-props="auto"
                  label="Categoria Associativa"
                  :rules="[rules.required]"
                  :readonly="fShowPrint"
                  hide-details
                  item-value="value"
                  item-text="text"
                  @change="ValidateForm()"
                  @click="ValidateForm()"
                  @focus="ValidateForm()"
                ></v-select>
              </v-col>
            </v-row>

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

              <v-col cols="9" sm="3" md="3">
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
                      @keydown="fMenu = false"
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
              <v-col cols="9" sm="4" md="4">
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
                  label="Telefone Comercial"
                  v-model="fCadastro.nm_telefonecomercial"
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

            <v-row dense>
              <v-col cols="9" sm="10" md="10">
                <v-text-field
                  dense
                  label="Nome da Mãe"
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

              <v-col col="9" sm="2" md="2">
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

              <v-col cols="9" sm="2" md="2">
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

            <v-row dense v-if="fCadastro.cd_tipoassociacao === 2">
              <v-col cols="9" sm="10" md="10">
                <v-text-field
                  dense
                  label="Associado Vinculado"
                  v-model="fCadastro.nm_nomeassociadovinculado"
                  type="text"
                  :rules="[fCadastro.cd_graduacao == 1 || rules.required]"
                  :readonly="fShowPrint"
                />
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="9" sm="6" md="6">
                <v-select
                  dense
                  :label="fLabelCategoriaProfissional"
                  v-model="fCadastro.nm_profissao"
                  :items="fCategoriasProfissionais"
                  :rules="[rules.required]"
                  :readonly="fShowPrint"
                  menu-props="auto"
                  hide-details
                />
              </v-col>
              <v-col
                cols="9"
                sm="4"
                md="4"
                v-if="fCadastro.cd_tipoassociacao === 2"
              >
                <v-select
                  dense
                  label="Parentesco"
                  v-model="fCadastro.cd_parentesco"
                  :items="fParentesco"
                  :rules="[fCadastro.cd_graduacao == 1 || rules.required]"
                  :readonly="fShowPrint"
                  menu-props="auto"
                  hide-details
                  item-value="value"
                  item-text="text"
                />
              </v-col>
            </v-row>
            <div class="d-flex">
              <v-checkbox
                v-model="fCadastro.ACEITELGPD"
                class="mx-2"
                :readonly="fShowPrint"
                @click="ValidateForm()"
                label="Li e concordo com os"
              >
              </v-checkbox>

              <v-dialog
                v-model="dialog"
                width="500"
                max-width="80%"
                max-height="80%"
                class="elevation-1"
                persistent
                scrollable
              >
                <template v-slot:activator="{ on, attrs }">
                  <a
                    class=" here"
                    color="primary"
                    text
                    v-bind="attrs"
                    v-on="on"
                  >
                    Termos de Uso e Proteção de Dados Pessoais
                  </a>
                </template>

                <v-card>
                  <v-card-title class="cardtitlestyle">
                    Termos de Uso e Proteção de Dados Pessoais
                  </v-card-title>

                  <v-card-text>
                    <br />
                    Com relação à proteção de meus dados pessoais, declaro estar
                    ciente e autorizo que: <br />
                    1) Meus dados pessoais sejam armazenados e tratados pela
                    Associação dos Profissionais Liberais – ASPROFILI, estando
                    devidamente protegidos de acordo com a Lei Geral de Proteção
                    de Dados – Lei 13.709/2018; <br />
                    2) Meus dados pessoais sejam utilizados tão somente para o
                    fim a que se destinam, por esta associação, ou na hipótese
                    de optar pela contratação de plano de saúde, pela
                    administradora de benefícios Qualicorp Administradora de
                    Benefícios S.A. e pela Operadora de Saúde por mim escolhida;
                    <br />
                    3) Estou ciente que à mim será disponibilizado meio
                    eletrônico com login e senha para acesso aos meus dados
                    pessoais armazenados; <br />
                    4) Encerrada a vigência do contrato e não havendo mais
                    necessidade de utilização dos dados pessoais, a ASPROFILI
                    eliminará completamente os dados pessoais de seu banco de
                    dados no prazo máximo de 30 dias, salvo quando tenha que
                    manter os dados para cumprimento de obrigação legal.
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      text
                      @click="fCadastro.ACEITELGPD = true"
                      v-on:click="dialog = false"
                    >
                      Aceito
                    </v-btn>
                    <v-btn
                      color="primary"
                      text
                      @click="fCadastro.ACEITELGPD = false"
                      v-on:click="dialog = false"
                    >
                      Não Aceito
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>

            <v-row dense no-gutters class="mt-n3">
              <v-col cols="9" sm="12" md="12">
                <v-checkbox
                  v-model="fCadastro.ACEITE"
                  class="mx-2"
                  label="Declaro que todas as informações acima são verdadeiras e tenho conhecimento que a Asprofili fará cobrança da taxa associativa em
boleto semestral no valor de R$ 30,00 reajustada anualmente em julho, de acordo com o percentual de reajuste do IGP-M. Declaro
ainda ter ciência que todo associado que aderir a qualquer tipo de benefício, tais como Plano Saúde, Dental, etc, será isento da taxa."
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
              :disabled="!(fCadastro.ACEITE && fValid && fCadastro.ACEITELGPD)"
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

            <!-- v-btn
              color="white"
              class="text-none info--text"
              @click="EnviarCadastro"
              v-if="fDebug"
            >
              <v-icon class="info--text">mdi-send</v-icon>Enviar Dados Debug
            </!-->
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
import {
  cTesteString,
  cShowMessageMaintenance,
  AMBIENTE,
  LOCAL
} from '@/services/consts'
import { _CurrentDateTime } from '@/services/functions'
import MessageAlert from '@/views/MessageAlert'
import { mapGetters } from 'vuex'

//import { _ConsoleLog } from '@/services/functions/view'

export default {
  name: 'CadastroAsprofili',
  components: {
    TitleForm,
    MessageAlert
  },

  mounted() {
    this.fDebug = AMBIENTE == LOCAL
  },

  data() {
    return {
      mask: '##/##/####',
      dialog: false,

      fDebug: false,

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
        ACEITE: false,
        id_cadastro: '',
        nm_email: '',
        nm_email2: '',
        nm_telefoneresidencial: '',
        nm_telefonecomercial: '',
        nm_telefonecelular: '',
        fl_declaracaogerada: 'F',
        fl_cadastroconfirmado: 'F',
        cd_tipoassociacao: 0,
        nm_nomeassociadovinculado: '',
        cd_parentesco: 0,
        ACEITELGPD: false,
        fl_aceitelgpd: 'F'
      },

      fCadastroClean: {
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
        fl_aceite: 'false',
        ACEITE: false,
        id_cadastro: '',
        nm_email: '',
        nm_email2: '',
        nm_telefoneresidencial: '',
        nm_telefonecomercial: '',
        nm_telefonecelular: '',
        fl_declaracaogerada: 'F',
        fl_cadastroconfirmado: 'F',
        cd_tipoassociacao: 0,
        nm_nomeassociadovinculado: '',
        cd_parentesco: 0,
        ACEITELGPD: false,
        fl_aceitelgpd: 'F'
      },

      fTipoAssociacao: [
        { text: 'Sócio Efetivo', value: 1 },
        { text: 'Sócio Vinculado', value: 2 }
      ],

      // nomes e valores retirados da ficha de associação
      fParentesco: [
        { text: 'MARIDO', value: 1 },
        { text: 'ESPOSA', value: 2 },
        { text: 'FILHO', value: 3 },
        { text: 'FILHA', value: 4 },
        { text: 'PAI', value: 5 },
        { text: 'MÃE', value: 6 },
        { text: 'NETO', value: 7 },
        { text: 'NETA', value: 8 },
        { text: 'GENRO', value: 9 },
        { text: 'NORA', value: 10 },
        { text: 'COMPANHEIRO', value: 14 },
        { text: 'COMPANHEIRA', value: 15 },
        { text: 'IRMÃO', value: 16 },
        { text: 'IRMÃ', value: 17 },
        { text: 'ENTEADO', value: 21 },
        { text: 'ENTEADA', value: 22 }
      ],

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

      fCategoriasProfissionais: [
        'Administradores',
        'Arquitetos ',
        'Assistentes Sociais ',
        'Atuários ',
        'Arquivologistas',
        'Automação Industrial ',
        'Bacharéis em Direito ',
        'Biblioteconomia ',
        'Biomédicos ',
        'Biólogos',
        'Ciências Aeronáuticas ',
        'Cinema ',
        'Comércio Exterior ',
        'Contabilista ',
        'Dentista ',
        'Desenho Industrial ',
        'Designers de Interiores ',
        'Designers de Moda ',
        'Designers Gráficos ',
        'Economistas',
        'Educação Física ',
        'Enfermeiros ',
        'Engenheiros',
        'Estatisticos',
        'Farmacêuticos',
        'Filósofos',
        'Físicos',
        'Fisioterapeutas',
        'Fonoaudiólogos',
        'Fotógrafos',
        'Gastronomia',
        'Geografia',
        'Geologia',
        'Gestão Ambiental',
        'Gestão Comercial',
        'Gestão de Tecnologia da Informação',
        'Gestão de Recursos Humanos',
        'Gestão de Segurança Privada',
        'Gestão de Seguros',
        'Gestão de Turismo',
        'Gestão Financeira',
        'Gestão Hospitalar',
        'Gestão Pública',
        'Hotelaria',
        'Historiadores',
        'Jornalistas',
        'Letras',
        'Logísticas',
        'Matemáticos',
        'Médicos',
        'Negócios Imobiliários',
        'Nutricionistas',
        'Pedagogos',
        'Professores de ensino médio e curso superior',
        'Profissionais de Informática',
        'Psicólogos',
        'Publicitários',
        'Químicos',
        'Radiologistas',
        'Redes de Telecomunicações',
        'Relações Internacionais',
        'Secretariados',
        'Segurança do Trabalho',
        'Sociólogos',
        'Técnicos em Contabilidade',
        'Técnicos em Enfermagem',
        'Técnicos em Laboratórios',
        'Teólogos',
        'Turismo e Veterinários'
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
          var LMes = parseInt(AValue[1])
          var LDia = parseInt(AValue[0])
          var LMyData = new Date(LAno, LMes - 1, LDia)

          var LAnoAtual = new Date().getFullYear()

          var LIdade = LAnoAtual - LAno
          if (
            LMyData.getMonth() + 1 != LMes ||
            LMyData.getDate() != LDia ||
            LMyData.getFullYear() != LAno
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

  computed: {
    ...mapGetters({
      fApiVersionOffLine: 'ApiVersionOffLine'
    }),
    fShowMessageMaintenance: function() {
      return cShowMessageMaintenance || this.fApiVersionOffLine
    },
    fLabelCategoriaProfissional: function() {
      if (this.fCadastro.cd_tipoassociacao == 1) {
        return 'Categoria Profissional'
      } else {
        return 'Categoria Profissional do Associado Vinculado'
      }
    }
  },

  methods: {
    GoAreaAssociado() {
      this.$router.push('/areadoassociado/login')
    },

    ValidateForm() {
      return this.$refs.form.validate()
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
      if (this.ValidateForm()) {
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
        if (this.fCadastro.ACEITELGPD) {
          this.fCadastro.fl_aceitelgpd = 'T'
        } else {
          this.fCadastro.fl_aceitelgpd = 'F'
        }

        this.fCadastro.dthr_aceitelgpd = _CurrentDateTime()

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
      } else {
        this.fValid = false
      }
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

<style scoped>
.cardtitlestyle {
  background-color: #0e5536;
  color: #ffffff;
}
.here {
  font-size: 120%;
  position: absolute;
  padding-left: 198px;
  padding-top: 20px;
  padding-block-end: 20px;
}
</style>
