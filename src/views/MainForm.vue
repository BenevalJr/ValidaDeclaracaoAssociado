<template>
  <div>
    <Header />
    <v-app v-if="fCliente == fAsprofili">
      <br />
      <CadastroAsprofili />
      <br />
    </v-app>
    <v-app v-else>
      <br />
      <CadastroAne />
      <br />
    </v-app>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CadastroAsprofili from '@/views/CadastroAsprofili'
import CadastroAne from '@/views/CadastroAne'
import { ASPROFILI, cCliente } from '@/services/consts'

export default {
  name: 'MainFormCadastro',
  data() {
    return {
      fAsprofili: ASPROFILI,
      fCliente: cCliente
    }
  },
  components: {
    Header,
    Footer,
    CadastroAne,
    CadastroAsprofili
  }
}
</script>
