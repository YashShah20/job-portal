<template>
  <div class="container container-fluid mt-5">
    <template v-if="authStore.type == 'user'">
      <h4>Your last 5 applications</h4>
      <ApplicationList :applicationList="recentApplications"  />
    </template>
    <template v-else-if="authStore.type == 'company'">
      <AddJob />
    </template>
    <h4>Jobs</h4>
    <jobList :jobList="jobList" />
  </div>
</template>

<script>
import jobApi from "@/services/jobApi";
import JobList from "@/components/jobs/JobList.vue";
import ApplicationList from "@/components/applications/ApplicationList.vue";
import AddJob from "@/components/jobs/AddJob.vue";
import { useLocationStore } from "../store/locationStore";
import { useSkillStore } from "../store/skillStore";
import { useAuthStore } from "../store/authStore";
export default {
  setup() {
    const locationStore = useLocationStore();
    const skillStore = useSkillStore();
    const authStore = useAuthStore();

    return { locationStore, skillStore, authStore };
  },
  name: "JobDisplay",
  components: {
    AddJob,
    JobList,
    ApplicationList,
  },
  data() {
    return {
      jobList: [],
      recentApplications: [],
    };
  },
  methods: {
    setJobList: async function () {
      const res = await jobApi.getJobs();
      this.jobList = res.data.jobs;
      this.recentApplications = res.data.applications;
      this.locationStore.setLocations(res.data.locations);
      this.skillStore.setSkills(res.data.skills);
      console.log(res.data);
    },
  },
  mounted() {
    this.setJobList();
  },
};
</script>
