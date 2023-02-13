import { api } from "@/services/api";
import type { ActionContext, Module } from "vuex";
import type { State } from ".";


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
  products: ProductState[],
  product: ProductState
}
const state: ProductsState = {
  products: [],
  product: {} as ProductState
}

export const products: Module<ProductsState, State>   = {
  state,

  getters: {
    getProductInfo: (state: ProductsState) => () => {
      console.log(state.product);
      return state.product
    },
  },
  mutations: {
    async getProducts(state: ProductsState) {
      try {
        const categories = await api.get('products/')
        categories.data.map((product: ProductState) => {
          const alreadyExists = state.products.some((prod) => prod.id === product.id)
          !alreadyExists && state.products.push(product as ProductState)
        })

      } catch (error) {
        console.log(error);
      }
    },
    async getProductByCategory(state: ProductsState, payload: string) {
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
    async getProductById(state: ProductsState, payload: number) {
      state.product = {
        title: '',
        image: '',
        category: '',
        description: '',
        id: 0,
        price: 0,
        rating: { count: 0, rate: 0 }
      }
      try {
        const product = await api.get(`products/${payload}`)
        state.product = product.data


      } catch (error) {

        console.log(error);

      }
    },

    async searchProduct(state: ProductsState, payload: string) {
      state.products = []
      const filter = payload.toUpperCase();
      try {
        const products = await api.get(`products/`)

        state.products = products.data.filter((product: ProductState) => product.title.toUpperCase().indexOf(filter) > -1)

      } catch (error) {
        console.log(error);
      }
    },
    setProductDetail(state: ProductsState, payload: ProductState) {
      state.product = payload
    },

    setSortProductList(state: ProductsState, payload: string) {
      switch (payload) {
        case 'Nome-asc':
          state.products = state.products.sort((a: ProductState, b: ProductState) => a.title > b.title ? 1 : ((b.title > a.title) ? -1 : 0))
          break;
        case 'Preço-asc':
          state.products = state.products.sort((a: ProductState, b: ProductState) => a.price - b.price)
          break;
        case 'Avaliação-asc':
          state.products = state.products.sort((a: ProductState, b: ProductState) => a.rating.rate - b.rating.rate)
          break;
        case 'Nome-desc':
          state.products = state.products.sort((a: ProductState, b: ProductState) => a.title > b.title ? -1 : ((b.title > a.title) ? 1 : 0))
          break;
        case 'Preço-desc':
          state.products = state.products.sort((a: ProductState, b: ProductState) => b.price - a.price)
          break;
        case 'Avaliação-desc':
          state.products = state.products.sort((a: ProductState, b: ProductState) => b.rating.rate - a.rating.rate)
          break;
        default:
          state.products = state.products.sort((a: ProductState, b: ProductState) => a.id - b.id)
          break;
      }
    }
  },
  actions: {
    async getProducts({ commit }: ActionContext<ProductsState, State>) {
      commit('getProducts')
    },
    async searchProduct({ commit }: ActionContext<ProductsState, State>, payload: string) {
      commit('searchProduct', payload)
    },
    async setProductDetail({ commit }: ActionContext<ProductsState, State>, payload: ProductState) {
      commit('setProductDetail', payload)
    },
    async getProductById({ commit }: ActionContext<ProductsState, State>, payload: number) {
      commit('getProductById', payload)
    },
    async setSortProductList({ commit }: ActionContext<ProductsState, State>, payload: string) {
      commit('setSortProductList', payload)
    }
  }
}