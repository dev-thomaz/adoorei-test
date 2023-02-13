import type { InjectionKey } from "vue";
import { createStore, Store, type Module } from "vuex";
import {cart, type CartState} from './cart-store'
import { categories, type CategoriesState } from "./categories-store";
import { products, type ProductsState } from "./products-store";
export interface State {
    cart: CartState,
    products: ProductsState,
    categories: CategoriesState,
  }

  export const key: InjectionKey<Store<State>> = Symbol()



export const store = createStore({
modules: {
    cart,
    products,
    categories,
},

})