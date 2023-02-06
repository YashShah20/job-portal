<template>
  <div class="container mt-5">
    <div class="h3 my-2">User Details</div>
    <div class="my-2">
      <!-- {{ user }} -->
      <div class="mb-3">
        <label for="">name</label> {{ user.first_name }} {{ user.last_name }}
      </div>
      <div class="mb-3">
        <label for="">email</label>
        <a :href="`mailto:${user.email}`"> {{ user.email }}</a>
      </div>
      <div class="mb-3"><label for="">address</label> {{ user.address }}</div>
      <div class="mb-3">
        <label for="">birth date</label> {{ user.birth_date}}
      </div>
    </div>

    <hr />

    <div class="h3 my-2">Application Details</div>
    <div class="mt-2">
      <!-- {{ application }} -->
      <div class="mb-3"><label>Title</label> {{ application.title }}</div>
      <div class="mb-3">
        <label>Message</label> <br />
        <span>{{ application.message }}</span>
      </div>
      <div class="mb-3">
        <label>Resume URL</label>
        <a :href="application.resume_url"> {{ application.resume_url }}</a>
      </div>
      <div class="mb-3 d-flex">
        <label>Status</label>
        <select
          class="mx-2 form-select w-25"
          v-model="updatedApplication.status"
        >
          <option disabled>choose</option>
          <option
            :value="status"
            :key="index"
            v-for="(status, index) in [
              'applied',
              'viewd',
              'confirmed',
              'rejected',
            ]"
          >
            {{ status }}
          </option>
        </select>
        <button class="btn btn-primary" @click="updateApplicationStatus">
          Update
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import applicationApi from "@/services/applicationApi";
export default {
  props: {
    app_id: {
      type: String,
    },
  },
  data() {
    return {
      application: {},
      user: {},
      updatedApplication: {
        status: "",
      },
    };
  },
  methods: {
    setApplication: async function () {
      const res = await applicationApi.getApplicationById(this.app_id);
      this.application = res.data.application;
      this.updatedApplication.status = this.application.status;
      this.user = res.data.user;
      console.log(res.data);
    },
    updateApplicationStatus: async function () {
      const res = await applicationApi.updateApplication(
        this.app_id,
        this.updatedApplication
      );
      console.log(res.data);
    },
  },
  mounted() {
    this.setApplication();
  },
};
</script>
