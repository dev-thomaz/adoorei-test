import type { ProductState, RatingState } from "./products-store";


interface ProductInCart {
    product:{
        id: number,
        title: string,
        price: number,
        description: string,
        category: string,
        image: string,
        rating: RatingState,
    },
    amount: number,
    count: number
}

export interface CartState {
    cart_count: number,
    products: ProductInCart[],
    amount: number,
  }

  const state: CartState = {
    cart_count: 0,
    products: [],
    amount: 0,
    };



export const cart = {

state,

getters:{
    
initiCart(state:CartState){
    const cartProducts = localStorage.getItem('@MyStore:CART_PRODUCTS')
    cartProducts ? state.products = JSON.parse(cartProducts) : localStorage.setItem('@MyStore:CART_PRODUCTS',JSON.stringify([]))
    cartProducts ?  state.cart_count = state.products.length : 0
},
checkHasInCart: (state:CartState) =>  (product: ProductState) => {
    const checkProduct =  state.products.some((prod) => prod.product.id === product.id)
    return checkProduct
  },

  getProductCount: (state:CartState) =>  (product: ProductState) => {
    const count  = state.products.filter((prod) => prod.product.id === product.id)
    return count[0].count
  }

},
actions:{

},
mutations:{
addProduct(state: CartState, payload: ProductState){
   const newInCart = state.products.some((prod) => prod.product.id === payload.id)
    const newProduct = {
        product: payload,
        count: 1,
        amount: payload.price
    } as ProductInCart
    
    !newInCart && state.products.push(newProduct);
    state.cart_count = state.products.length;
    localStorage.setItem('@MyStore:CART_PRODUCTS',JSON.stringify(state.products))
},
incrementProductQtd(state: CartState, payload:ProductState){
    const i = state.products.findIndex((prod) => prod.product.id === payload.id)
    state.products[i].count +=1
    localStorage.setItem('@MyStore:CART_PRODUCTS',JSON.stringify(state.products))
},
decreaseProductQtd(state: CartState, payload:ProductState){
    const i = state.products.findIndex((prod) => prod.product.id === payload.id)
    if(state.products[i].count > 1){
        state.products[i].count -=1
       return localStorage.setItem('@MyStore:CART_PRODUCTS',JSON.stringify(state.products))
    }
   state.products = state.products.filter((product, index) => index !== i)
   state.cart_count = state.products.length
   localStorage.setItem('@MyStore:CART_PRODUCTS',JSON.stringify(state.products))
},


},

}