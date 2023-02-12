import { api } from "@/services/api";
import type { ActionContext } from "vuex";

export interface LoadingState {
    isLoading: boolean;
}



const state: LoadingState = {
    isLoading: false
};



export const loading = {

    state,

    getters: {
        getIsLoading: (state: LoadingState) => () => {
            return state.isLoading
        }

    },
    actions: {
        setIsLoading( {commit}: ActionContext<LoadingState, LoadingState>, payload:boolean){
            commit('setIsLoading', payload)
        }
    },
    mutations: {
        async setIsLoading(state: LoadingState, payload: boolean) {
            state.isLoading = payload
        }
    },

}