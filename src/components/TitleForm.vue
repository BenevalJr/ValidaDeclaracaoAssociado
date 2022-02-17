<template>
  <div>
    <br />
    <v-toolbar color="white info--text" dark flat>
      <h1 class="info--text">{{ fTitleForm }}</h1>
      <v-spacer />
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: 'TitleForm',
  props: {
    fTitleForm: String
  }
}
</script>
