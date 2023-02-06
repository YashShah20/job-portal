<template>
  <div class="container container-fulid mt-5">
    <div class="d-flex justify-content-center">
      <form class="p-3 w-75" @submit.prevent="handleSubmit">
        <legend class="mb-3 h1 text-center">Sign in</legend>
        <div class="mb-3">
          <label class="form-label">Email address</label>
          <input
            type="email"
            class="form-control"
            v-model="credentials.email"
          />
        </div>
        <div class="mb-3">
          <label class="form-label"> Password </label>
          <input
            type="password"
            class="form-control"
            v-model="credentials.password"
          />
        </div>
        <div class="mb-3">
          <label class="form-label"> Account type </label>
          <select class="form-select" v-model="type">
            <option value="" disabled>choose...</option>
            <option value="user">User</option>
            <option value="company">Company</option>
          </select>
        </div>
        <div class="mb-3 text-center">
          <button class="btn btn-primary">Signin</button>
        </div>
        <div class="mb-3 text-center">
          Don't have an account? <a href="">signup here</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "../store/authStore";
import userApi from "@/services/userApi";
import companyApi from "@/services/companyApi";
export default {
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  data() {
    return {
      credentials: {
        email: "company1@test.com",
        password: "abc",
      },
      type: "company",
    };
  },
  methods: {
    handleSubmit: async function () {
      try {
        let res = null;
        switch (this.type) {
          case "user":
            res = await userApi.signin(this.credentials);
            this.authStore.saveToken(res.data.token);
            this.authStore.setId(res.data.id);
            this.$router.replace({ name: "jobs" });
            break;
          case "company":
            res = await companyApi.signin(this.credentials);
            this.authStore.saveToken(res.data.token);
            this.authStore.setId(res.data.id);
            this.$router.replace({ name: "jobs" });
            break;
        }
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
