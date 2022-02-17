<template>
  <div>
    <v-row justify="center">
      <v-dialog
        v-model="fShowDialogConfirm"
        persistent
        max-width="400"
        @keydown.esc="onCloseDialogConfirm"
      >
        <v-card>
          <v-card-title class="info white--text">
            {{ fTextTitleDialog }}
          </v-card-title>
          <v-divider />
          <br />
          <v-card-text class="white info--text">
            <v-icon class="blue--text">mdi-alert</v-icon>
            {{ fTextDialog }}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small class="info--text" @click="onResultYes">Sim</v-btn>
            <v-btn small class="info--text" @click="onResultNo">Não</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'DialogConfirm',

  props: {
    fShowDialogConfirm: Boolean,
    fTextTitleDialog: String,
    fTextDialog: String
  },

  methods: {
    onResultYes() {
      this.$emit('onResultYesOwner')
    },

    onResultNo() {
      this.$emit('onResultNoOwner')
    }
  }
}
</script>
