import type { ActionContext } from "vuex";
import type { RatingState } from "./products-store";


interface ProductState {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: RatingState,
    amount: number,
    count: number
}

export interface CartState {
    cart: {

        cart_count: number,
        products: ProductState[],
        amount: number,
    }
}

const state: CartState = {
    cart: {

        cart_count: 0,
        products: [],
        amount: 0,
    }
};



export const cart = {

    state,

    getters: {
        initiCart(state: CartState) {
            const cartProducts = localStorage.getItem('@MyStore:CART_PRODUCTS')
            cartProducts ? state.cart = JSON.parse(cartProducts) : localStorage.setItem('@MyStore:CART_PRODUCTS', JSON.stringify([]))
            cartProducts ? state.cart.cart_count = state.cart.products.length : 0

        },
        checkHasInCart: (state: CartState) => (product: ProductState) => {
            const checkProduct = state.cart.products.some((prod) => prod.id === product.id)


            return checkProduct
        },

        getProductCount: (state: CartState) => (product: ProductState) => {
            const count = state.cart.products.filter((prod) => prod.id === product.id)
            return count[0].count
        },
        getCartAmount: (state: CartState) => () => {
            let cartAmount = 0
            state.cart.products.map((product) => {
                cartAmount += product.amount
            })
            return cartAmount
        }



    },
    actions: {
        addProduct({ commit }: ActionContext<CartState, CartState>, payload: ProductState) {
            commit('addProduct', payload)
            commit('updateCartAmount')
        },
        incrementProductQtd({ commit }: ActionContext<CartState, CartState>, payload: ProductState) {
            commit('incrementProductQtd', payload)
            commit('updateCartAmount')
        },
        decreaseProductQtd({ commit }: ActionContext<CartState, CartState>, payload: ProductState) {
            commit('decreaseProductQtd', payload)
            commit('updateCartAmount')
        },

    },
    mutations: {
        addProduct(state: CartState, payload: ProductState) {

            const alreadyInCart = state.cart.products.some((prod) => prod.id === payload.id)
            const newProduct = {
                ...payload,
                count: 1,
                amount: payload.price
            } as ProductState

            if (!alreadyInCart) {
                state.cart.products.push(newProduct)
                state.cart.amount += payload.price
                localStorage.setItem('@MyStore:CART_PRODUCTS', JSON.stringify(state.cart))
            }
            state.cart.cart_count = state.cart.products.length;


            localStorage.setItem('@MyStore:CART_PRODUCTS', JSON.stringify(state.cart))
        },
        incrementProductQtd(state: CartState, payload: ProductState) {
            const i = state.cart.products.findIndex((prod) => prod.id === payload.id)
            state.cart.products[i].count += 1
            state.cart.products[i].amount = state.cart.products[i].price * state.cart.products[i].count

            localStorage.setItem('@MyStore:CART_PRODUCTS', JSON.stringify(state.cart))
        },
        decreaseProductQtd(state: CartState, payload: ProductState) {
            const i = state.cart.products.findIndex((prod) => prod.id === payload.id)
            if (state.cart.products[i].count > 1) {
                state.cart.products[i].count -= 1
                state.cart.products[i].amount = state.cart.products[i].price * state.cart.products[i].count
                return localStorage.setItem('@MyStore:CART_PRODUCTS', JSON.stringify(state.cart))
            }
            state.cart.products = state.cart.products.filter((product, index) => index !== i)
            state.cart.cart_count = state.cart.products.length
            localStorage.setItem('@MyStore:CART_PRODUCTS', JSON.stringify(state.cart))
        },

        updateCartAmount(state: CartState) {
            state.cart.amount = state.cart.products.reduce((a, b) => a + (b['amount'] || 0), 0);
            localStorage.setItem('@MyStore:CART_PRODUCTS', JSON.stringify(state.cart))
        }
    },

}