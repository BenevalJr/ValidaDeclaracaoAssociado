<template>
  <!-- FORM DIALOG -->
  <v-dialog
    v-model="fShowMessageMaintenance"
    max-width="50%"
    class="elevation-1"
    persistent
  >
    <v-card width="100%">
      <!--v-card-title class="red white--text">
        ALERTA
      </v-card-title>
      <v-divider /-->
      <v-card-text class="white red--text">
        <br />
        <br />
        <v-row>
          <v-spacer />
          <h1>Sistema está em manutenção</h1>
          <v-spacer />
        </v-row>
        <br />
        <br />
        <v-row>
          <v-spacer />
          <h1>Por favor tente acessar novamente em instantes</h1>
          <v-spacer />
        </v-row>
        <br />
        <br />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="white" class="text-none red--text" @click="DoGoSite">
          <v-icon class="red--text">mdi-check-circle</v-icon> &nbsp;&nbsp; Ok
        </v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'MessageAlert',

  props: {
    fShowMessageMaintenance: Boolean
  },

  methods: {
    DoGoSite() {
      window.location.href = 'http://www.asprofili.com.br'
    }
  }
}
</script>
