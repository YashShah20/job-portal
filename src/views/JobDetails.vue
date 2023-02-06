<template>
  <div class="container mt-5">
    <div class="text-center h2">Job Details</div>
    <!-- {{ job }} -->
    <div class="mb-3"><label>Title</label> {{ job.title }}</div>
    <div class="mb-3">
      <label>Description</label>
      <ul>
        <li v-for="(line, index) in job.description.split('.')" :key="index">
          {{ line }}
        </li>
      </ul>
    </div>
    <div class="mb-3">
      <label>Company</label> {{ job.company_name }}
      <router-link
        :to="{ name: 'company-details', params: { com_id: job.company_id } }"
        >View details</router-link
      >
    </div>
    <div class="mb-3">
      <label for="">Locations</label>
      <ul class="">
        <li class="" v-for="(location,index) in job.locations" :key="index"> {{ location }}</li>
      </ul>
    </div><div class="mb-3">
      <label for="">Skills</label>
      <ul class="">
        <li v-for="(skill,index) in job.skills" :key="index"> {{ skill }}</li>
      </ul>
    </div>
    <div class="mb-3">
      <label>Created On</label> {{ job.created_on | dateFilter }}
    </div>
    <div class="mb-3">
      <label>Due Date</label>{{ job.due_date | dateFilter }}
    </div>
    <div class="mb-3"><label>Experience</label> {{ job.experience }}</div>
    <div class="mb-3"><label>Salary</label> {{ job.salary }}</div>
    <div class="mb-3"><label>Openings</label> {{ job.n_openings }}</div>

    <div class="mb-3" v-if="authStore.type == 'user'">
      <div v-if="job.applied">
        <span class="badge bg-success p-3">Already Applied</span>
      </div>
      <div v-else>
        <router-link :to="{name:'job-apply',params:{job_id:job.job_id}}" class="btn btn-primary">Apply</router-link>
      </div>
    </div>
    <div class="mb-3" v-else-if="authStore.type == 'visitor'">
      <router-link :to="{ name: 'signin' }" class="btn btn-primary"
        >Login to apply</router-link
      >
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "../store/authStore";
import jobApi from "@/services/jobApi";
export default {
  setup() {
    const authStore = useAuthStore();

    return { authStore };
  },
  props: {
    job_id: {
      type: Number,
    },
  },
  filters: {
    dateFilter: function (date) {
      return date.slice(0, 10);
    },
  },
  data() {
    return {
      job: {},
    };
  },
  methods: {
    getJobDetails: async function () {
      const res = await jobApi.getJobById(this.job_id);
      console.log(res);
      this.job = res.data.job;
    },
  },
  mounted() {
    this.getJobDetails();
  },
};
</script>

<style>
label::after {
  content: ": ";
}
label {
  text-transform: capitalize;
  font-weight: 700;
}
</style>
