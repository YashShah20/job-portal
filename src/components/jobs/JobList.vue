<template>
  <div>
    <form class="d-flex mb-3 justify-content-end align-items-center">
      <span class="mx-2">showing {{ filteredJobList.length }} results</span>
      <input
        type="search"
        class="form-control mx-1 w-25"
        placeholder="Search Jobs"
        v-model="filter"
      />
    </form>
    <div class="d-flex flex-wrap justify-content-center">
      <div
        class="card mb-3 w-100"
        v-for="job in filteredJobList"
        :key="job.job_id"
      >
        <JobCard :job="job" />
      </div>
    </div>
  </div>
</template>

<script>
import JobCard from "./JobCard.vue";
export default {
  props: ["jobList"],
  components: {
    JobCard,
  },
  data() {
    return {
      filter: "",
    };
  },
  computed: {
    filteredJobList: function () {
      return this.jobList.filter((job) => {
        return (
          this.filter === "" ||
          job.title.toLowerCase().indexOf(this.filter.toLowerCase()) != -1
        );
      });
    },
  },
};
</script>
