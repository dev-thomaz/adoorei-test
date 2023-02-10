import { api } from "@/services/api";
import { createStore } from "vuex";


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
            try {
                const categories = await api.get('products/')
                categories.data.map((product: ProductState) => {
                    

                    state.products.push(product as ProductState)
                })

            } catch (error) {
                console.log(error);

            }
        },
        async getPRoductByCategory(state: ProductsState, payload:string){
          state.products = [] 
          const query = payload.toLowerCase()
          try {
            const categories = await api.get(`products/category/${query}`)
            categories.data.map((product: ProductState) => {
                state.products.push(product as ProductState)
            })

        } catch (error) {
            console.log(error);

        }
        }
},
actions:{

},
}