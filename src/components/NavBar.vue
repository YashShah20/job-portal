<template>
  <div>
    <nav
      class="navbar navbar-expand-lg bg-white border border-bottom text-white"
    >
      <div class="container-fluid">
        <a class="navbar-brand" href="#">JOB PORTAL</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Jobs</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/company" class="nav-link"
                >Companies</router-link
              >
            </li>
            <li class="nav-item" v-if="authStore.isLoggedIn">
              <router-link to="/application" class="nav-link"
                >Applications</router-link
              >
            </li>
            <!-- <li class="nav-item">
              <router-link to="/" class="nav-link">About</router-link>
            </li> -->
          </ul>
          <!-- <form class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Filter Jobs"
              aria-label="Search"
            />
            <button class="btn btn-outline-success" type="submit">
              Search
            </button>
          </form> -->
          <div class="d-flex mx-2">
            <router-link
              :to="{ name: 'signin' }"
              class="btn btn-dark"
              v-if="!authStore.isLoggedIn"
            >
              Sign In</router-link
            >
            <router-link :to="{ name: 'profile' }" class="btn btn-dark" v-else>
              View Profile</router-link
            >
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { useAuthStore } from "../store/authStore";
export default {
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
};
</script>

<style scoped>
.router-link-exact-active {
  font-weight: 900;
}
</style>
