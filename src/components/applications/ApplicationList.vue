<template>
  <div class="d-flex flex-wrap justify-content-center align-items-center">
    <div
      class="card col col-2 m-2"
      style="cursor: pointer;"
      v-for="application in applicationList"
      :key="application.application_id"
    >
      <ApplicationCard :application="application" :showSmall="true"/>
    </div>
  </div>
</template>

<script>
import ApplicationCard from "./ApplicationCard.vue";
export default {
  props: ["applicationList"],
  components: {
    ApplicationCard,
  },
};
</script>
