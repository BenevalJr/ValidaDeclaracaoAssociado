import api from '@/services/api'

const _CurrentDateTime = () => {
  var lDatetime = new Date()
  var lResult =
    lDatetime.getFullYear() +
    '-' +
    (lDatetime.getMonth() + 1) +
    '-' +
    lDatetime.getDate() +
    'T' +
    lDatetime.getHours() +
    ':' +
    lDatetime.getMinutes() +
    ':' +
    lDatetime.getSeconds()
  return lResult
}

const _GetApiVersion = aThis => {
  api
    .get('/status')
    .then(response => {
      // handle success
      console.log(response.data.Version)
      aThis.fApiVersion = response.data.Version
    })
    .catch(error => {
      // handle error
      console.log(error)
      aThis.fApiVersion = 'OffLine'
    })
    .then(() => {
      // always executed
    })
}

export { _CurrentDateTime, _GetApiVersion }
