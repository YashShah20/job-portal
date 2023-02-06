<template>
  <div v-if="small">
    <div>
      <router-link
        :to="{name:'applications',reference:application.application_id}"
        class="card-body text-center justify-items-center"
      >
        <div class="card-text px-2" style="font-weight: 800">
          {{ application.title || 'job deleted' }}
        </div>
      </router-link>
    </div>
  </div>
  <div v-else-if="companyView">
    <div class="card-header">
      {{ application.title || 'deleted'}}
    </div>
    <div class="card-body">
      <div class="card-text mb-1">
        <label>Username</label> {{ application.username }}
      </div>
      <div class="card-text mb-1">
        <label>Applied on</label> {{ application.applied_on.slice(0, 10) }}
      </div>
    </div>
    <div class="card-footer">
      <router-link
        :to="{
          name: 'application-details',
          params: { app_id: application.application_id },
        }"
        class="btn btn-primary"
        >View Details</router-link
      >
    </div>
    <!-- <span class="float-end">Applied on</span> -->
  </div>
  <div v-else>
    <div class="card-header">
      <span class="h4">{{ application.job_title || 'Job Deleted' }}</span>
      <span class="float-end badge p-2" :class="bgClass"
        >{{ application.status }}
      </span>
    </div>
    <div class="card-body">
      <div class="card-text mb-2">
        <label for="">Company</label>
        {{ application.company_name }}
        <!-- <router-link :to="{name:'company-details',params:{com_id:application.company_id}}">view details</router-link> -->
      </div>
      <div class="card-text mb-2">
        <label for="">Applied On</label>
        {{ application.applied_on.slice(0, 10) }}
      </div>
      <div class="card-text mb-2">
        <label for="">Message</label> {{ application.message }}
      </div>
      <div class="card-text mb-2">
        <label for="">Resume URL</label>
        <a :href="application.resume_url"> {{ application.resume_url }}</a>
      </div>
      <div class="card-text mb-2">
        <label for="">Status</label>
        <div
          class="progress"
          role="progressbar"
          aria-label="Example with label"
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div
            class="progress-bar"
            :class="bgClass"
            :style="`width:${progress}%`"
          >
            {{ application.status }}
          </div>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <div class="card-text mb-2">
        <router-link
          class="btn btn-primary"
          :to="{
            name: 'job-details',
            params: { job_id: application.job_id },
          }"
          >Job Details</router-link
        >
      </div>
    </div>
  </div>
</template>

<!-- application_id : (...) applied_on : "2023-01-22T18:30:00.000Z" company_name :
"Topdrive" job_id : (...) job_title : (...) message : (...) resume_url : (...)
status : (...) user_id : (...) -->
<script>
export default {
  props: {
    application: {
      type: Object,
    },
    showSmall: {
      type: Boolean,
      default: false,
    },
    companyView: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      small: false,
    };
  },
  mounted() {
    this.small = this.showSmall;
  },
  computed: {
    bgClass: function () {
      var bgCls = "";
      switch (this.application.status) {
        case "applied":
          bgCls = "bg bg-info";
          break;
        case "viewd":
          bgCls = "bg bg-warning";
          break;
        case "confirmed":
          bgCls = "bg bg-success";
          break;
        case "rejected":
          bgCls = "bg bg-danger";
          break;
      }
      return bgCls;
    },
    progress: function () {
      var progress = "";
      switch (this.application.status) {
        case "applied":
          progress = 25;
          break;
        case "viewd":
          progress = 50;
          break;
        case "confirmed":
          progress = 100;
          break;
        case "rejected":
          progress = 100;
          break;
      }
      return progress;
    },
  },
};
</script>

<style scoped>
a {
  outline-style: none;
  outline: none;
}
</style>
