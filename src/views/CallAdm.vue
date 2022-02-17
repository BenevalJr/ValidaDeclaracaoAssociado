<template>
  <div>
    <br />
    <br />
    <br />
    <p align="center">
      <font face="Arial" size="5" class="red--text"
        >O ENDEREÇO DA APLICAÇÃO MUDOU, ATUALIZE SUA LISTA DE FAVORITOS</font
      >
    </p>
    <br />
    <p align="center" class="blue--text">
      <font face="Arial" size="5">{{ fURLAdm }}</font>
    </p>
    <br />
    <p align="center">
      <a :href="fURLAdm">
        <font face="Arial" size="3">Clique aqui acessar a aplicação</font>
      </a>
    </p>
  </div>
</template>

<script>
import { cURLADM } from '@/services/consts'

export default {
  data() {
    return {
      fURLAdm: cURLADM
    }
  }
}
</script>
