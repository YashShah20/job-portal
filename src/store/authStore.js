import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: 'Yash',
        id: '',
    }),
    getters: {
        isLoggedIn: (state) => {
            return state.token.indexOf('Bearer') != -1
        },
        type: (state) => {
            if (state.id.startsWith('U')) {
                return 'user';
            } else if (state.id.startsWith('C')) {
                return 'company';
            } else {
                return 'visitor';
            }
        }
    },
    actions: {
        saveToken(token) {
            this.token = `Bearer ${token}`
        },
        deleteToken() {
            this.token = ``
        },
        setId(id) {
            this.id = id
        }
    }
})