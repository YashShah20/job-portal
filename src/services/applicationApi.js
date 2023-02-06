import Api from "./Api"
export default {
    getApplications() {
        return Api.get(`/applications`)
    },
    getApplicationById(id) {
        return Api.get(`/applications/${id}`)
    },
    addApplication(application) {
        return Api.post(`/applications/add`, application)
    },
    updateApplication(id, newApplication) {
        return Api.put(`/applications/${id}`, newApplication)
    }
}