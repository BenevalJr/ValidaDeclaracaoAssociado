const APPVERSION = '1.00.20210429.2315'

const ASPROFILI = 'ASPROFILI'
const ANEBRASIL = 'ANEBRASIL'

const cCliente = ASPROFILI
const cShowMessageMaintenance = false

var lClienteStr = ''
var lClienteStrCompleto = ''
var lLogoSite = ''
var lURLSite = ''
var lHeaderColorBackGround = ''
var lFooterColorBackGround = ''
var lTextFooter = ''
var lMaxHeight = ''
var lMaxWidth = ''
var lTesteString = ''

if (cCliente == ASPROFILI) {
  lClienteStr = 'ASPROFILI'
  lLogoSite =
    'https://isappsbackupbucket01.s3-sa-east-1.amazonaws.com/images/logo-asprofili.png'
  lURLSite = 'http://www.asprofili.com.br'
  lHeaderColorBackGround = '#0E5536'
  lFooterColorBackGround = '#222222'
  lTextFooter = 'Copyright 2020 Asprofili'
  lMaxHeight = '52'
  lMaxWidth = '163'
  lTesteString = ''
  lClienteStrCompleto = 'ASPROFILI - Associação dos Profissionais Liberais'
} else if (cCliente == ANEBRASIL) {
  lClienteStr = 'ANE BRASIL'
  lLogoSite =
    'https://isappsbackupbucket01.s3-sa-east-1.amazonaws.com/images/logo-ane-brasil-horizontal-1.png'
  lURLSite = 'http://www.anebrasil.com.br'
  lHeaderColorBackGround = '#FFFFFF'
  lFooterColorBackGround = '#222222'
  lTextFooter = '© 2020 ANE BRASIL'
  lMaxHeight = '80'
  lMaxWidth = '247'
  lTesteString = ''
  lClienteStrCompleto = 'ANE BRASIL - ASSOCIAÇÃO NACIONAL DOS ESTUDANTES'
}

document.title = lClienteStrCompleto

const cClienteStr = lClienteStr
const cClienteStrCompleto = lClienteStrCompleto
const cLogoSite = lLogoSite
const cURLSite = lURLSite
const cHeaderColorBackGround = lHeaderColorBackGround
const cFooterColorBackGround = lFooterColorBackGround
const cTextFooter = lTextFooter
const cMaxHeight = lMaxHeight
const cMaxWidth = lMaxWidth
const cTesteString = lTesteString

const HOMOLOG = 1
const PROD = 2
const LOCAL = 3

const AMBIENTE = HOMOLOG

const cDOMAINPROD = 'https://api.isapps.com.br/'
const cDOMAINHOMOLOGACAO = 'https://homologacao.api.isapps.com.br/'
const cDOMAINLOCAL = 'http://localhost'

var lDomain = ''
var lBaseURL
var lBaseURLDeclaracaoAssociado

switch (AMBIENTE) {
  case HOMOLOG:
    lDomain = cDOMAINHOMOLOGACAO
    break
  case PROD:
    lDomain = cDOMAINPROD
    break
  case LOCAL:
    lDomain = cDOMAINLOCAL
    break
}

if (AMBIENTE == LOCAL) {
  lBaseURL = lDomain + ':9000/api/v1'
  lBaseURLDeclaracaoAssociado = lDomain + ':9002/api/v1/dec'
} else {
  lBaseURL = lDomain + cCliente.toLowerCase() + '/api/v1'
  lBaseURLDeclaracaoAssociado = lBaseURL + '/dec'
}

const cBaseURL = lBaseURL
const cBaseURLDeclaracaoAssociado = lBaseURLDeclaracaoAssociado

const _getImageURL = () => {
  return cLogoSite
}

export {
  ASPROFILI,
  ANEBRASIL,
  APPVERSION,
  cCliente,
  cClienteStr,
  cURLSite,
  //cBaseURLADM,
  cBaseURLDeclaracaoAssociado,
  cHeaderColorBackGround,
  cFooterColorBackGround,
  cTextFooter,
  cMaxHeight,
  cMaxWidth,
  cBaseURL,
  cTesteString,
  _getImageURL,
  cShowMessageMaintenance,
  AMBIENTE,
  HOMOLOG,
  PROD,
  LOCAL,
  cClienteStrCompleto
}
