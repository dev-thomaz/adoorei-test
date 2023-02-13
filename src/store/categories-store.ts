import { api } from "@/services/api";
import type { ActionContext, Module } from "vuex";
import type { State } from ".";

interface CategoryState {
    name: string;
}

export interface CategoriesState {
    categories: CategoryState[]
}

const state: CategoriesState = {
    categories: []
};



export const categories: Module<CategoriesState, State> = {

    state,

    getters: {


    },
    actions: {
        getCategories({commit}: ActionContext<CategoriesState, State>){
            commit('getCategories')
        }
    },
    mutations: {
        async getCategories(state: CategoriesState) {
           
            try {
                const categories = await api.get('products/categories')
                categories.data.map((category: string) => {
                    const newCategory = {
                        name: category.charAt(0).toUpperCase() + category.slice(1)
                    } as CategoryState
                    const alreadyExists = state.categories.some((ctgry) => ctgry.name.toLowerCase() === newCategory.name.toLowerCase())
                   !alreadyExists && state.categories.push(newCategory as CategoryState)
                })

            } catch (error) {
                console.log(error);

            }
            
        }
    },

}