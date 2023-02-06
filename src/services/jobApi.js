import Api from "./Api"

export default {
    getJobs() {
        return Api.get(`/jobs`)
    },
    getJobById(id) {
        return Api.get(`/jobs/${id}`)
    },
    addJob(job) {
        return Api.post(`/jobs/add`, job)
    },
    addPost(post) {
        return Api('https://jsonplaceholder.typicode.com/').post('/posts', post)
    },
    updateJob(id, newJob) {
        return Api.put(`/jobs/${id}`, newJob)
    },
    deleteJob(id) {
        return Api.delete(`/jobs/${id}`)
    }
}