import { defineStore } from 'pinia'

export const useLocationStore = defineStore('location', {
    state: () => ({
        locationList: []
    }),
    actions: {
        'setLocations': function (locationList) {
            this.locationList = locationList
        }
    }
})

