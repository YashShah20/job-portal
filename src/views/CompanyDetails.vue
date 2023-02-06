<template>
  <div class="container mt-5">
    <div class="h2 text-center">Company Details</div>

    <div class="mb-3"><label>Name</label> {{ company.name }}</div>
    <div class="mb-3">
      <label>Description</label>
      <br />
      <span>{{ company.description }}</span>
    </div>
    <div class="mb-3"><label>Address</label>
      <div class="d-flex flex-column">
        <div>City : {{ company.city }}</div>
        <div>State : {{ company.state }}</div>
        <div>Country : {{ company.country }}</div>
        <div>Pin : {{ company.pin }}</div>
        <div></div>

      </div>
    </div>
    <div class="mb-3"><label>Website</label>
      <a :href="company.website_url"> {{ company.website_url }}</a>
    </div>
    <div class="mb-3"><label>Email</label>
      <a :href="'mailto:'+company.email"> {{ company.email }}</a>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import config from "@/config";
import companyApi from "@/services/companyApi";
export default {
  name: "CompanyDetails",
  props: {
    com_id: {
      type: String,
    },
  },
  data() {
    return {
      company: {},
    };
  },
  methods: {
    setCompanyDetails: async function () {
      const id = this.com_id;
      const res = await companyApi.getCompanyById(id);
      this.company = res.data.company;
      console.log(res.data);
    },
    loadMap: async function () {
      mapboxgl.accessToken = config.MAPBOX_ACCESS_TOKEN;
      const location = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.company.city}.json?access_token=${config.MAPBOX_ACCESS_TOKEN}&limit=1`
      );
      console.log(location);
      const map = new mapboxgl.Map({
        container: "map", // container ID
        style: "mapbox://styles/mapbox/streets-v12", // style URL
        center: [77.2090057, 28.6138954], // starting position [lng, lat]
        zoom: 9, // starting zoom
      });
    },
  },
  mounted() {
    this.setCompanyDetails();
    // this.loadMap();
  },
};
</script>
