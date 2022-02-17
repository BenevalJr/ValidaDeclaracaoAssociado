<template>
  <div>
    <v-app-bar
      v-if="fCliente == fAsprofili"
      color="#333333"
      height="107px"
      bottom
    >
      <a :href="fURLSite" target="_blank">
        <v-img
          :src="getImageURL()"
          :max-height="fMaxHeight"
          :max-width="fMaxWidth"
        ></v-img>
      </a>
    </v-app-bar>
    <v-app-bar :color="fFooterColorBackGround" height="70px" bottom>
      <v-spacer />
      <h5 class="white--text">
        {{ fTextFooter }} - App Version: {{ fAppVersion }} - API Version:
        {{ fApiVersion }}
      </h5>
      <v-spacer />
    </v-app-bar>
  </div>
</template>

<script>
import {
  ASPROFILI,
  cCliente,
  cURLSite,
  cTextFooter,
  cFooterColorBackGround,
  cMaxHeight,
  cMaxWidth,
  _getImageURL,
  APPVERSION
} from '@/services/consts'
//import api from '@/services/api'
import { mapGetters } from 'vuex'

export default {
  name: 'Footer',

  data() {
    return {
      //fApiVersion: '',
      fAppVersion: APPVERSION,
      fAsprofili: ASPROFILI,
      fCliente: cCliente,
      fURLSite: cURLSite,
      fTextFooter: cTextFooter,
      fFooterColorBackGround: cFooterColorBackGround,
      fMaxHeight: cMaxHeight,
      fMaxWidth: cMaxWidth
    }
  },

  mounted() {
    this.setApiVersion()
    /*
    if (this.fApiVersion == undefined || this.fApiVersion == '') {
      this.$store
        .dispatch('checkAPIVersion')
        .then(lVersions => {
          this.fApiVersion = lVersions.apiversion
        })
        .catch(lAPIVersionError => {
          this.fApiVersion = lAPIVersionError.apiversion
        })
    }
    */
  },

  methods: {
    setApiVersion() {
      console.log('this.fAppVersion: ' + this.fAppVersion)
      if (this.fApiVersion == undefined || this.fApiVersion == '') {
        this.$store
          .dispatch('checkAPIVersion')
          .then(lVersions => {
            this.fApiVersion = lVersions.apiversion
            console.log('lVersions.apiversion: ' + lVersions.apiversion)
            console.log('this.fAppVersion: ' + this.fAppVersion)
          })
          .catch(lAPIVersionError => {
            this.fApiVersion = lAPIVersionError.apiversion
            console.log(
              'lAPIVersionError.apiversion: ' + lAPIVersionError.apiversion
            )
            console.log('this.fAppVersion: ' + this.fAppVersion)
          })
      }
      /*
      api
        .get('/status')
        .then(response => {
          // handle success
          console.log(response.data.Version)
          //this.setApiVersion(response.data.Version)
          this.fApiVersion = response.data.Version
        })
        .catch(error => {
          // handle error
          console.log(error)
        })
        .then(() => {
          // always executed
        })
    */
    },

    getImageURL() {
      return _getImageURL()
    }
  },

  computed: {
    ...mapGetters({
      fApiVersion: 'ApiVersion'
    })
  }
}
</script>
