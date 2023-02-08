import { createStore } from "vuex";


interface RatingState {
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

export const products = createStore<ProductsState>({
state: {
products: []
},

getters:{

},
mutations:{

},
actions:{

},
})