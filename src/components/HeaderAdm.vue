<template>
  <v-app-bar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    app
    class="white--text"
    color="#2562A3"
    dark
  >
    <v-app-bar-nav-icon @click.stop="onToggleShowMenu" v-if="fShowIconMenu" />
    <v-toolbar-title>
      <span class="hidden-sm-and-down"
        >Administração Cadastro Online Associado</span
      >
    </v-toolbar-title>
    <v-spacer />
  </v-app-bar>
</template>

<script>
export default {
  name: 'Header',
  props: {
    fShowIconMenu: Boolean
  },

  methods: {
    onToggleShowMenu() {
      this.$emit('onToggleShowMenuOwner')
    }
  }
}
</script>
