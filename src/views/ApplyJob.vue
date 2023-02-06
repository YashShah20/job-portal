<template>
  <div class="container mt-5">
    <form class="form" @submit.prevent="handleSubmit">
      {{ job_id }}
      <legend>Apply for the Job</legend>
      <div class="mb-3">
        <label>Message</label>
        <textarea class="form-control" required v-model="application.message"></textarea>
      </div>
      <div class="mb-3">
        <label>Resume URL</label>
        <input
          type="url"
          class="form-control"
          required v-model="application.resume_url"
        />
      </div>
      <div class="mb-3">
        <button class="btn btn-primary">Apply</button>
      </div>
    </form>
  </div>
</template>

<script>
import applicationApi from "@/services/applicationApi";
export default {
  props: {
    job_id: {
      type: Number,
    },
  },
  data() {
    return {
      application: {
        job_id: -1,
        message: "",
        status: "applied",
        resume_url: "",
        applied_on: "",
      },
    };
  },
  methods: {
    handleSubmit: async function () {
      this.application.applied_on = new Date().toISOString();
      this.application.job_id = this.job_id;
      console.log(this.application);
      const res = await applicationApi.addApplication(this.application);
      console.log(res);
    },
  },
};
</script>
