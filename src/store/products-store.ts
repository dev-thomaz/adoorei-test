import { api } from "@/services/api";
import type { ActionContext } from "vuex";


export interface RatingState {
rate: number,
count: number
}

 export interface ProductState {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: RatingState,
  }

  export interface ProductsState {
    products: ProductState[]
  }
const state: ProductsState =  {
  products: []
  }

export const products ={
state,

getters:{
},
mutations:{
        async getProducts(state: ProductsState) {
          // store.dispatch('setIsLoading', true)
         
          state.products = []
            try {
                const categories = await api.get('products/')
                categories.data.map((product: ProductState) => {
                    

                    state.products.push(product as ProductState)
                })

            } catch (error) {
                console.log(error);

            }
        },
        async getProductByCategory(state: ProductsState, payload:string){
          state.products = [] 
          const query = payload.toLowerCase()
          try {
            const products = await api.get(`products/category/${query}`)
            products.data.map((product: ProductState) => {
                state.products.push(product as ProductState)
            })
       
        } catch (error) {
            console.log(error);

        }
        },

        async searchProduct(state: ProductsState, payload: string){
          state.products = [] 
          const filter = payload.toUpperCase();
          try {
            const products = await api.get(`products/`)
           
            state.products = products.data.filter((product: ProductState) => product.title.toUpperCase().indexOf(filter) > -1)
            console.log(state.products);
          
        } catch (error) {
            console.log(error);

        }
        }
},
actions:{
  async getProducts({ commit }: ActionContext<ProductState, ProductState>) {
      commit('getProducts')
},
async searchProduct({commit}: ActionContext<ProductState, ProductState>, payload: string){
  commit('searchProduct', payload)
}
}
}