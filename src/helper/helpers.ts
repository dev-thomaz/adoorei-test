import type { RatingState } from "@/store/products-store";

function convertCurrency(value: number){
    let numero = value.toFixed(2).split('.');
    numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.');
    return numero.join(',');
 
 }

 function generateRatingStar(rating: RatingState) {
    let rateStar = []
    const rate = rating.rate
    for (let index = 1; index <= 5; index++) {
        if (index <= rate) {
            rateStar.push('full')
        }
        if ((rate % 1 > 0.4) && index === Math.round(rate)) {
            rateStar.push('half')
        }
        else if (index > rate) {
            rateStar.push('empty')
        }
    }
    return rateStar
}


 export {convertCurrency, generateRatingStar}