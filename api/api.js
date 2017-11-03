import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/'
axios.defaults.headers['Content-Type'] = 'application/json'
export default {
  userInfo: null,
  token: null,
  loadingModalVisible: false,
  fillterGetData (data) {
    var temp = ''
    for (let i in data) {
      temp = temp + i + '=' + data[i]
    }
    return temp
  },
  axiosPost (url, data) {
    axios.defaults.headers['token'] = this.token
    return axios.post(url, JSON.stringify(data))
  },
  axiosGet (url, data) {
    return axios.get(url+ '?' + fillterGetData(data))
  }
}
