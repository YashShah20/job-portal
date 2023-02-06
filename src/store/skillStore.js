import { defineStore } from 'pinia'

export const useSkillStore = defineStore('skill', {
    state: () => ({
        skillList: []
    }),
    actions: {
        'setSkills': function (skillList) {
            this.skillList = skillList
        }
    }
})

