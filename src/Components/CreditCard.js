import React from 'react';
import './css/CreditCard.css';
import chipImg from '../images/chip.png';
import mastercard from '../images/MastercardLogo.png';
import visa from '../images/VisaLogo.png';
import UnionPay from '../images/UnionPayLogo.png';
import amex from '../images/AmericanExpressLogo.png';
import discover from '../images/DiscoverLogo.png';
import emptyImg from '../images/Empty.png';

export const CreditCard = ({cardNumber,faceFront,faceBack,holderName,cvv,expireMonth,expireYear,cardType}) => {
  //get last 2 digits of year
  let img = emptyImg;
  if(cardType === 'AMEX'){
    img = amex;
  }
  else if(cardType === 'VISA')
  {
    img = visa;
  }
  else if(cardType === 'MASTERCARD')
  {
    img = mastercard;
  }
  else if(cardType === 'CHINA_UNION_PAY')
  {
    img = UnionPay;
  }
  else if(cardType === 'DISCOVER')
  {
    img = discover;
  }

  expireYear = expireYear?.slice(-2);
  return (
    <div className='creditcard'>
        <div ref={faceFront} className="face front">
          <h3 className="debit">Debit Card</h3>
          <h3 className="bank">Bank Name</h3>
          <img src={chipImg} className='chip' alt=''/>
          <h3 className="number">{cardNumber}</h3>
          <h5 className="valid">
              <span>Valid<br/>thru</span>
              <span>{expireMonth ? expireMonth: '0'+(new Date().getMonth()+1)}/{expireYear? expireYear:new Date().getFullYear().toString().slice(-2)}</span>
          </h5>
          <div className = 'card_issuer'>
            <img src={img} alt=""/>
          </div>
          <h5 className="cardHolder">{holderName ? holderName.toUpperCase():'Leo Li'}</h5>
        </div>
        <div ref={faceBack} className="face back">
          <div className="blackbar"></div>
          <div className="ccvtext">
            <h5>Authorized Signature-not valid unless signed</h5>
            <div className="whitebar"></div>
            <div className="ccv">{cvv? cvv:123}</div>
          </div>
          <p className="text">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.
          </p>
        </div>
      </div>
  )
}
