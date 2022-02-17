<template>
  <v-app-bar
    app
    :color="fHeaderColorBackGround"
    height="107px"
    :clipped-left="$vuetify.breakpoint.lgAndUp"
  >
    <a :href="fURLSite" target="_blank">
      <v-img
        :src="getImageURL()"
        :max-height="fMaxHeight"
        :max-width="fMaxWidth"
      ></v-img>
    </a>
  </v-app-bar>
</template>

<script>
import {
  ASPROFILI,
  cCliente,
  cURLSite,
  cHeaderColorBackGround,
  cMaxHeight,
  cMaxWidth,
  _getImageURL
} from '@/services/consts'
export default {
  name: 'Header',
  data() {
    return {
      fAsprofili: ASPROFILI,
      fCliente: cCliente,
      fURLSite: cURLSite,
      fHeaderColorBackGround: cHeaderColorBackGround,
      fMaxHeight: cMaxHeight,
      fMaxWidth: cMaxWidth
    }
  },
  methods: {
    getImageURL() {
      return _getImageURL()
    }
  }
}
</script>
