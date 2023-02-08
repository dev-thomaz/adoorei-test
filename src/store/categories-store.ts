import { api } from "@/services/api";

interface CategoryState {
    name: string;
}

export interface CategoriesState {
    categories: CategoryState[]
}

const state: CategoriesState = {
    categories: []
};



export const categories = {

    state,

    getters: {


    },
    actions: {

    },
    mutations: {
        async getCategories(state: CategoriesState) {
            try {
                const categories = await api.get('products/categories')
                categories.data.map((category: string) => {
                    const newCategory = {
                        name: category
                    } as CategoryState

                    state.categories.push(newCategory as CategoryState)
                    console.log(state.categories);
                })

            } catch (error) {
                console.log(error);

            }
        }
    },

}