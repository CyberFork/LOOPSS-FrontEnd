import { http } from 'assets/js/util'

const { get, post } = http
const userApi = {
  login(params) {
    return post('/api/auth/login', params)
  },
  logout() {
    return get('/api/auth/logout')
  },
  getUserInfo() {
    return get('/api/auth/getUserInfo')
  }
}
export default userApi
