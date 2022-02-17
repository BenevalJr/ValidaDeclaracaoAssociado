import Vue from 'vue'
import VueRouter from 'vue-router'
//import MainForm from '@/views/MainForm'
import AreaDoAssociado from '@/views/AreaDoAssociado'
/*import AreaDoAssociadoLogin from '@/views/AreaDoAssociadoLogin'
import AreaDoAssociadoDashBoard from '@/views/AreaDoAssociadoDashBoard'
import AreaDoAssociadoConfirmaCadastro from '@/views/AreaDoAssociadoConfirmaCadastro'
import AreaDoAssociadoConfirmaCancelamento from '@/views/AreaDoAssociadoConfirmaCancelamento'*/
import AreaDoAssociadoValidaDeclaracao from '@/views/AreaDoAssociadoValidaDeclaracao'
//import CallAdm from '@/views/CallAdm'

Vue.use(VueRouter)

const routes = [
  //{ path: '/', component: MainForm },
  { path: '/', component: AreaDoAssociado },
  //{ path: '/adm', component: CallAdm },
  {
    path: '/areadoassociado',
    component: AreaDoAssociado,
    children: [
      /*{ path: '/', component: AreaDoAssociadoLogin },
      { path: 'login', component: AreaDoAssociadoLogin },
      { path: 'dashboard/:token', component: AreaDoAssociadoDashBoard },
      {
        path: 'confirmacadastro/:token',
        component: AreaDoAssociadoConfirmaCadastro
      },
      { path: 'dashboard', component: AreaDoAssociadoLogin },
      {
        path: 'confirmacancelamento/:token',
        component: AreaDoAssociadoConfirmaCancelamento
      },*/
      {
        path: 'validadeclaracao/:token',
        component: AreaDoAssociadoValidaDeclaracao
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
