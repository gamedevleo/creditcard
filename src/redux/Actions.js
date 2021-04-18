import {RESET,UPDATE_HOLDERNAME,UPDATE_CARDCVV,UPDATE_EXPIREYEAR,UPDATE_EXPIREMONTH,UPDATE_CARDNUMBER,UPDATE_NUMBER} from './ActionTypes';


const reset = ()=>{
  return {
    type:RESET
  }
}

const updateCardNumber = (cardNumber)=>{
  return {
    type:UPDATE_CARDNUMBER,
    payload:cardNumber
  }
}

const updateHolderName = (holderName)=>{
  return {
    type:UPDATE_HOLDERNAME,
    payload:holderName
  }
}
const updateCardCvv = (cvv)=>{
  return {
    type:UPDATE_CARDCVV,
    payload:cvv
  }
}
const updateExpireMonth = (expireMonth)=>{
  return {
    type:UPDATE_EXPIREMONTH,
    payload:expireMonth
  }
}
const updateEipireYear = (expireYear)=>{
  return {
    type:UPDATE_EXPIREYEAR,
    payload:expireYear
  }
}
const updateNumber = (number)=>{
  return {
    type:UPDATE_NUMBER,
    payload:number
  }
}

export {reset,updateCardNumber,updateEipireYear,updateHolderName,updateNumber,updateExpireMonth,updateCardCvv};
