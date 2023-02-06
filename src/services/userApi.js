import Api from "./Api"
export default {
    signin(credentails) {
        return Api.post(`/user/signin`, credentails)
    },
    signup(user) {
        return Api.post(`/user/signin`, user)
    },
    home() {
        return Api.get(`/user/`)
    },
    profile() {
        return Api.get(`/user/profile`)
    }
}