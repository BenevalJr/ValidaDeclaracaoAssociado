<template>
  <div>
    <Header />
    <v-app>
      <br />
      <v-main>
        <v-layout align-center justify-center>
          <MessageAlert
            :fShowMessageMaintenance="fShowMessageMaintenance"
          ></MessageAlert>
          <v-card class="elevation-12" width="95%">
            <TitleForm :fTitleForm="fTitleForm" />
            <router-view />
          </v-card>
        </v-layout>
      </v-main>
      <br />
    </v-app>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import TitleForm from '@/components/TitleForm'
import { cTesteString, cShowMessageMaintenance } from '@/services/consts'
import MessageAlert from '@/views/MessageAlert'
import { mapGetters } from 'vuex'

export default {
  name: 'AreaDoAssociado',

  data() {
    return {
      fTitleForm: cTesteString + 'Cadastro Online Ficha do Associado'
    }
  },

  components: {
    Header,
    Footer,
    TitleForm,
    MessageAlert
  },

  computed: {
    ...mapGetters({
      fApiVersionOffLine: 'ApiVersionOffLine'
    }),
    fShowMessageMaintenance: function() {
      return cShowMessageMaintenance || this.fApiVersionOffLine
    }
  }
}
</script>
