<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex'
import { key } from '@/store'
import { convertCurrency } from '@/helper/helpers'
import { ProductCounter } from '@/components'
import { useRouter } from 'vue-router';
import type { ProductState } from '@/store/products-store';
import CreditCard from '@/assets/images/credit_card.png';
import BarCode from '@/assets/images/bar_code.png';
import Pix from '@/assets/images/Pix.png';
import Qrcode from '@/assets/images/qr_code.png';
import router from '@/router';
const store = useStore(key);
const cartStore = store.state.cart

interface paymentType {
    id: number,
    type: string,
    img: string,
}

const paymentSelected = ref<number>(0)
const showModal = ref<boolean>(false)
const paymentForms: paymentType[] = [
    { id: 1, type: 'Crédito', img: CreditCard },
    { id: 2, type: 'Boleto', img: BarCode },
    { id: 3, type: 'Pix', img: Pix },
]

const userLogged = {
    address: {
        city: "kilcoole",
        street: "new road",
        number: 7682,
        zipcode: "12926-3874",
    },
    id: 1,
    email: "john@gmail.com",
    username: "johnd",
    password: "m38rmF$",
    name: {
        firstname: "john",
        lastname: "doe"
    },
    phone: "1-570-236-7033",
}
onMounted(() => {
    document.title = 'Checkout - Mystore'
})

function getTotalCount() {
    return store.getters.getTotalCount
}

function handleChangePaymentForm(id: number) {
    paymentSelected.value = id
}

function verifyIsPAymentSelected(id: number) {
    return id === paymentSelected.value as number
}


function FinishOrder(){
    showModal.value = false
    store.dispatch('finishCart');
    router.push('/')
}


</script>

<template>
    <div class="h-screen flex bg-white flex-row justify-center gap-8">
        <div class=" flex flex-col p-5 w-1/3">
            <span class="font-medium text-lg">Dados de Pagamento</span>
            <div class="flex flex-col gap-5 mt-10">
                <div class="flex flex-col">
                    <span class="font-medium text-lg">Forma de Pagamento</span>
                    <span class="font-light text-sm">selecione uma forma Pagamento</span>
                </div>
                <div>

                    <div class="flex flex-row gap-3">
                        <div v-for="paymentForm in paymentForms">
                            <div @click="handleChangePaymentForm(paymentForm.id)"
                                class="flex flex-col items-center justify-center border-2 rounded-lg gap-1 border-soft_gray p-3"
                                :class="{ 'border-primary text-primary': verifyIsPAymentSelected(paymentForm.id) }">
                                <span> {{ paymentForm.type }} </span>
                                <img :src="paymentForm.img" alt="">
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div v-if="paymentSelected === 1" class=" p-2 flex flex-col  gap-3 h-80 mt-8">
                <div class="flex flex-col gap-2">
                    <span>número do cartão</span>
                    <input class="bg-soft_white rounded-md h-10 p-4" placeholder="número do cartão"/>
                </div>
                <div class="flex flex-col gap-2">
                    <span>nome impresso no cartão</span>
                <input class="bg-soft_white rounded-md h-10 p-4" placeholder="nome impresso no cartão"/>
                </div>
                <div class=" flex gap-6">
                    <div class="flex flex-col gap-2">
                        <span>validade</span>
                    <input class="bg-soft_white rounded-md h-10 p-4" placeholder="validade"/>
                    </div>
                    <div class="flex flex-col gap-2">
                        <span>código de segurança</span>
                    <input class="bg-soft_white rounded-md h-10 p-4" placeholder="código de segurança"/>
                    </div>
                </div>
                <div class="flex flex-col gap-2">
                    <span>número de parcelas</span>
                <input class="bg-soft_white rounded-md h-10 p-4" placeholder="número de parcelas"/>
                </div>
            </div>

            <div v-if="paymentSelected === 2" class=" p-2 flex flex-col justify-center gap-8 h-80 mt-8">
                <span>
                    - Imprima o boleto e pague no banco
                </span>
                <span>

                    - Ou pague pela internet utilizando o código de barras do boleto
                </span>
                <span>
                    - O prazo de validade do boleto é de 1 dia util

                </span>
                <div class="flex justify-between items-center">
                    <span class="text-md font-medium">
                        Total:
                    </span>

                    <span class="text-lg font-medium">
                        {{ convertCurrency(cartStore.cart.amount + 35.80) }}
                    </span>

                </div>

            </div>
            <div v-if="paymentSelected === 3" class=" p-2 flex items-center justify-center gap-3 h-80 mt-8">
                <img :src="Qrcode" class="w-48 h-48">
                <div class="w-96 bg-soft_white rounded-md flex flex-col p-2 h-28">
                    <span>
                        Pague com <span class="font-medium">Pix</span>!
                    </span>
                    <span>
                        O pagamento é instantâneo, prático e pode ser feito em poucos segundos. É rápido e seguro.
                    </span>
                    <span>
                        (o Qrcode gerado é apenas um exemplo)
                    </span>

                </div>
            </div>

            <button @click="showModal = true" v-if="paymentSelected !== 0" class="bg-primary w-full text-white font-bold h-14 rounded-md mt-5">
                Finalizar pedido
            </button>


        </div>
        <div class="w-1/6 ">
            <div class="flex flex-col   p-5 ">
                <div class="bg-soft_white shadow-sm p-2 rounded-md">
                    <span class="font-medium text-lg">Dados de entrega</span>
                    <div class="flex items-center gap-3">
                        <span>Destinatário:</span>
                        <span class="text-lg font-medium"> {{ userLogged.name.firstname }} {{ userLogged.name.lastname }} </span>
                    </div>
                    <div class="flex items-center gap-3">
                        <span>Endereço:</span>
                        <span class="text-lg font-medium"> {{ userLogged.address.street }} , {{ userLogged.address.number }} </span>
                    </div>
                    <div class="flex items-center gap-3">
                        <span>Cidade:</span>
                        <span class="text-lg font-medium"> {{ userLogged.address.city }} </span>
                    </div>
                    <div class="flex items-center gap-3">
                        <span>Cep:</span>
                        <span class="text-lg font-medium"> {{ userLogged.address.zipcode }} </span>
                    </div>
                </div>
            </div>
            <div class=" flex flex-col   p-5 ">
                <div class="bg-soft_white shadow-sm p-2 rounded-md ">
                    <span class="font-medium text-lg">Informações de frete</span>
                    <div class="flex items-center gap-3">
                        <span>Correios</span>
                    </div>
                    <div class="flex items-center gap-3">
                        <span>Receba até 01 de Março</span>
                    </div>
                    <div class="flex items-center gap-3">
                        <span>Valor:</span>
                        <span class="text-lg font-medium">{{ convertCurrency(35.80) }}</span>
                    </div>

                </div>
            </div>
            <div class=" p-5">
                <div class="bg-soft_white shadow-sm rounded-md flex flex-col p-2 gap-3">
                    <span class="font-medium text-lg">Resumo do pedido:</span>
                    <div>
                        <div class="flex gap-3 items-center justify-between">
                            <span class="text-lg font-bold">{{ getTotalCount() }} Produtos: </span>
                            <span>{{ convertCurrency(cartStore.cart.amount) }}</span>
                        </div>
                        <div class="flex gap-3 items-center justify-between">
                            <span class="text-lg font-bold">Valor do Frete: </span> <span>{{
                                convertCurrency(35.80)
                            }}</span>
                        </div>
                        <div class="flex gap-3 items-center justify-between">
                            <span class="text-lg font-bold">Valor do pedido: </span>
                            <span>{{ convertCurrency(cartStore.cart.amount + 35.80) }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>



    <div :class="{ hidden: !showModal }"
        class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full bg-black_rgba flex justify-center items-center">
        <div class="bg-soft_white w-1/3 h-1/3 rounded-lg p-5 flex items-center flex-col gap-3">
            <span class=" text-lg font-bold text-gray">Pedido realizado com sucesso</span>
            <span>número do pedido 0212-5984/2023</span>
            <span>confirmação do pedido enviada para: <span class="text-lg font-bold">{{userLogged.email}}</span> 
            </span>
            <button @click="FinishOrder()" class="bg-primary w-3/4 text-white font-bold h-14 rounded-md mt-5">
                Finalizar pedido
            </button>
        </div>
    </div>
</template>