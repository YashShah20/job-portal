<template>
  <div>
    <div class="card-header">
      <span class="float-end">Created: <b>{{ job.created_on | dateFilter }}</b></span>
      <h5 class="card-title">{{ job.title || 'job-deleted' }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">
        By,
        <span class="text-dark" style="font-style: italic">
          {{ job.company_name || 'you' }}</span>
      </h6>
    </div>
    <div class="card-body">
      <p class="card-text">
        <b>Description:</b> <br />
      <ul>
        <li v-for="(line, index) in job.description.split(`. `)" :key="index">
          {{ line }}
        </li>
      </ul>
      </p>
      <div class="d-flex justify-content-left">
        <p class="card-text" style="margin-right: 20px">
          <b>Experience:</b> {{ job.experience }}
        </p>
        <p class="card-text" style="margin-right: 20px">
          <b>Salary:</b> {{ job.salary }}
        </p>
        <p class="card-text" style="margin-right: 20px">
          <b>Openings:</b> {{ job.n_openings }}
        </p>
      </div>
      <p class="card-text"><b>Last date:</b> {{ job.due_date | dateFilter }}</p>
      <!-- <hr /> -->
      <router-link :to="{ name: 'job-details', params: { job_id: job.job_id } }"
        class="btn btn-primary">Details</router-link>

      <button v-if="authStore.type === 'company'" class="mx-2 btn btn-danger" @click="handleDelete">Delete</button>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../../store/authStore';
import jobApi from '@/services/jobApi';
export default {
  setup() {
    const authStore = useAuthStore()
    return { authStore }
  },
  props: ["job"],
  filters: {
    dateFilter: function (date) {
      return date.slice(0, 10);
    },
  },
  methods: {
    handleDelete: async function () {
      try {
        const res = await jobApi.deleteJob(this.job.job_id);
        console.log(res.data);
      }
      catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
router-link {
  outline: none;
}
</style>
