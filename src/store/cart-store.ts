import type { ProductState } from "./products-store";


const productToTest: ProductState = {
    "id": 9,
		"title": "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
		"price": 64,
		"description": "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
		"category": "electronics",
		"image": "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
		"rating": {
			"rate": 3.3,
			"count": 203
}
}


export interface CartState {
    cart_count: number,
    products: ProductState[],
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
    
sayHi(state:CartState){
    const cartProducts = localStorage.getItem('@MyStore:CART_PRODUCTS')

    console.log(cartProducts);
    cartProducts ? state.products = JSON.parse(cartProducts) : localStorage.setItem('@MyStore:CART_PRODUCTS',JSON.stringify([]))
    cartProducts ?  state.cart_count = state.products.length : 0
    return "teste " + state.cart_count
}
},
actions:{

},
mutations:{
addProduct(state: CartState){
    state.products.push(productToTest);
    state.cart_count = state.products.length;
    console.log(state.products);
    
}
},

}