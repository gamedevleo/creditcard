import {RESET,UPDATE_HOLDERNAME,UPDATE_CARDCVV,UPDATE_EXPIREYEAR,UPDATE_EXPIREMONTH,UPDATE_CARDNUMBER,UPDATE_NUMBER} from './ActionTypes';


const cardInfo = {
  cardNumber:'0123 4567 8901 2345',
  number:'',
  holderName:'',
  expireMonth:'',
  expireYear:'',
  cvv:''
}


const reducer = (state = cardInfo,action)=>{
  switch (action.type) {
    case RESET:
      return {
        cardNumber:'0123 4567 8901 2345',
        number:'',
        holderName:'',
        expireMonth:'',
        expireYear:'',
        cvv:''
      }
    case UPDATE_CARDNUMBER:
      return {
        ...state,
        cardNumber:action.payload
      }
    case UPDATE_NUMBER:
      return {
        ...state,
        number:action.payload
      }
    case UPDATE_CARDCVV:
      return {
        ...state,
        cvv:action.payload
      }
    case UPDATE_EXPIREMONTH:
      return {
        ...state,
        expireMonth:action.payload
      }
    case UPDATE_EXPIREYEAR:
      return {
        ...state,
        expireYear:action.payload
      }
    case UPDATE_HOLDERNAME:
      return {
        ...state,
        holderName:action.payload
      }
    default:
      return state;

  }
}

export default reducer;
