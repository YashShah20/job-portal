<template>
  <div>
    <fieldset>
      <legend>Add Job</legend>
      <form class="">
        <div class="mb-3">
          <label>Job Title</label>
          <input type="text" class="form-control" v-model="job.title" />
        </div>
        <div class="mb-3">
          <label for="">Description</label>
          <textarea class="form-control" v-model="job.description"></textarea>
        </div>
        <div class="row">
          <div class="col">
            <div class="mb-3">
              <label for="">Locations</label>
              <span
                class="chip badge bg-white border border-1 text-info mx-2"
                v-for="(_location, index) in job.locations"
                @click="removeLocation(index)"
                :key="index"
                >{{ _location }}</span
              >
              <input
                type="text"
                list="locations"
                class="form-control"
                v-model="location"
                @keyup.right="
                  job.locations.push(location);
                  location = '';
                "
              />
              <datalist id="locations">
                <option
                  :value="location"
                  :key="index"
                  v-for="(location, index) in locationStore.locationList"
                ></option>
              </datalist>
            </div>
          </div>
          <div class="col">
            <div class="mb-3">
              <label for="">Skills</label>
              <span
                class="chip badge bg-white border border-1 text-info mx-2"
                v-for="(_skill, index) in job.key_skills"
                @click="removeSkill(index)"
                :key="index"
                >{{ _skill }}</span
              >
              <input
                type="text"
                list="skills"
                class="form-control"
                v-model="skill"
                @keyup.right="
                  job.key_skills.push(skill);
                  skill = '';
                "
              />
              <datalist id="skills">
                <option
                  :value="skill"
                  :key="index"
                  v-for="(skill, index) in skillStore.skillList"
                ></option>
              </datalist>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <div class="mb-3">
              <label for="">Due Date</label>
              <input type="date" class="form-control" v-model="job.due_date" />
            </div>
          </div>
          <div class="col">
            <div class="mb-3">
              <label for="">Experience</label>
              <input
                type="number"
                class="form-control"
                v-model="job.experience"
              />
            </div>
          </div>
          <div class="col">
            <div class="mb-3">
              <label for="">Salary</label
              ><input type="number" class="form-control" v-model="job.salary" />
            </div>
          </div>
          <div class="col">
            <div class="mb-3">
              <label for="">Openings</label
              ><input
                type="number"
                class="form-control"
                v-model="job.n_openings"
              />
            </div>
          </div>
          <div class="mb-3">
            <button
              type="submit"
              class="btn btn-primary"
              @click.prevent="handleSubmit"
            >
              Add Job
            </button>
          </div>
        </div>
      </form>
    </fieldset>

  </div>
</template>

<script>
import jobApi from "@/services/jobApi";

import { useLocationStore } from "../../store/locationStore";
import { useSkillStore } from "../../store/skillStore";
export default {
  setup() {
    const locationStore = useLocationStore();
    const skillStore = useSkillStore();

    return { locationStore, skillStore };
  },
  data() {
    return {
      job: {
        title: "Java Developer",
        description: "Building Java applications.",
        experience: 0,
        salary: 10000,
        due_date: "",
        created_on: "",
        n_openings: 5,
        locations: [],
        key_skills: [],
      },
      location: "",
      skill: "",
    };
  },
  methods: {
    handleSubmit: async function () {
      this.job.created_on = new Date().toISOString();

      const newJob = await jobApi.addJob(this.job);
      console.log(newJob);
    },
    removeLocation: function (index) {
      this.job.locations = this.job.locations.filter(
        (job, _index) => _index != index
      );
    },
    removeSkill: function (index) {
      this.job.key_skills = this.job.key_skills.filter(
        (skill, _index) => _index != index
      );
    },
  },
};
</script>

<style scoped>
label {
  margin-bottom: 5px;
  text-transform: capitalize;
}
.chip {
  cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='red' class='bi bi-x' viewBox='0 0 16 16'><path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z'/></svg>")
      16 0,
    auto;
}
</style>
