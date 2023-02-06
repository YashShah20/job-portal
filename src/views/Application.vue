<template>
  <div class="container mt-5">
    <div class="h2 text-center mb-3">Your Applications</div>
    <!-- {{ titleWiseApplicationList }}
    <div v-for="application in applicationList" :key="application.length">
      {{ application }}
    </div> -->
    <div
      :id="application.application_id"
      class="card mb-3"
      v-for="application in applicationList"
      :key="application.application_id"
    >
      <ApplicationCard
        :application="application"
        :company-view="authStore.type === 'company'"
      />
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "../store/authStore";
import applicationApi from "@/services/applicationApi";
// eslint-disable-next-line
import ApplicationCard from "@/components/applications/ApplicationCard.vue";
export default {
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  name: "ApplicationDisplay",
  components: {
    // eslint-disable-next-line
    ApplicationCard,
  },
  data() {
    return {
      applicationList: [],
    };
  },
  computed: {
    titleWiseApplicationList: function () {
      let temp = [];
      this.applicationList.map((application) => {
        temp[application.title]
          ? temp[application.title].push(application)
          : (temp[application.title] = [application]);
      });
      console.log(temp);
      return temp;
    },
  },
  methods: {
    setApplicationList: async function () {
      const res = await applicationApi.getApplications();
      this.applicationList = res.data.applications;

      // console.log(temp);
    },
  },
  mounted() {
    this.setApplicationList();
  },
};
</script>
