import Api from "./Api"
export default {
    signin(credentails) {
        return Api.post(`/company/signin`, credentails)
    },
    signup(company) {
        return Api.post(`/company/signin`, company)
    },
    home() {
        return Api.get(`/company/`)
    },
    getCompanies() {
        return Api.get(`/company/list`)
    },
    getCompanyById(id) {
        return Api.get(`/company/${id}`)
    },
    profile() {
        return Api.get(`/company/profile`)
    }
}