<template>
  <div class="container mt-5">
    <table class="table table-bordered">
      <caption class="h3" style="caption-side: top; text-align: center">
        List of Companies
      </caption>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <!-- <th>Website</th> -->
          <th>#Jobs</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(company, index) in companyList" :key="company.company_id">
          <td>{{ index + 1 }}</td>
          <td>{{ company.name }}</td>
          <!-- <td>{{ company }}</td> -->
          <td>
            {{ company.jobs_posted }}
          </td>
          <td>
            <router-link
              :to="{
                name: 'company-details',
                params: { com_id: company.company_id },
              }"
            >View</router-link>
          </td>
          <!-- <td>@mdo</td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import companyApi from "@/services/companyApi";
export default {
  name: "CompanyDisplay",
  data() {
    return {
      companyList: [],
    };
  },
  methods: {
    setCompanyList: async function () {
      const res = await companyApi.getCompanies();
      console.log(res.data);
      this.companyList = res.data.companies;
    },
  },
  mounted() {
    this.setCompanyList();
  },
};
</script>
