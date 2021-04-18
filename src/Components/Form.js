import React,{useRef,useEffect} from 'react';
import './css/Form.css';
import {useSelector, useDispatch} from 'react-redux';
import {reset,updateNumber,updateEipireYear,updateExpireMonth,updateCardNumber,updateHolderName,updateCardCvv} from '../redux/Actions';

import {CreditCard} from './index';
import {db} from '../firebase';


export const Form = () => {

  const cardNumber = useSelector(state=>state.cardNumber);
  const holderName = useSelector(state=>state.holderName);
  const cvv = useSelector(state=>state.cvv);
  const expireMonth = useSelector(state=>state.expireMonth);
  const expireYear = useSelector(state=>state.expireYear);
  const number = useSelector(state=>state.number);
  const dispatch = useDispatch();
  //set UseRefs
  const faceFront = useRef(null);
  const faceBack = useRef(null);
  const cardNumberRef = useRef(null);
  const holderNameRef = useRef(null);
  const cvvRef = useRef(null);

  //set Patterns for validation
  const cardnumberPatt = /^\d{16}$/;
  const holderNamePatt = /^[A-Za-z\s]{4,20}$/;
  const cardcvvPatt = /\d{3}/;

  //validate cardInfo when it changed
  useEffect(()=>{
    if(number)
    {
      validateInput(cardnumberPatt,cardNumberRef,number);
    }
    if(holderName)
    {
      validateInput(holderNamePatt,holderNameRef,holderName);
    }
    if(cvv)
    {
      validateInput(cardcvvPatt,cvvRef,cvv);
    }
  },[number,holderName,cvv,holderNamePatt,cardnumberPatt,cardcvvPatt])

  //validateInput function using pattern
  const validateInput = (pattern,ref,input) =>{
    if(pattern.test(input))
    {
      //set border and outline to show warning
      ref.current.style.border = '1px solid green';
      ref.current.style.outline = '1px solid green';
      return true;
    }
    else
    {
      //set border and outline to show it's valid
      ref.current.style.border = '1px solid red';
      ref.current.style.outline = '1px solid red';
      return false;
    }
  }
  //handle submit function
  const handleSubmit = e=>{
    e.preventDefault();

    let ccvValid = validateInput(cardcvvPatt,cvvRef,cvv);
    let holderNameValid = validateInput(holderNamePatt,holderNameRef,holderName);

    let cardNumberValid = validateInput(cardnumberPatt,cardNumberRef,number);

    if(!ccvValid)
    {
      alert('Please enter 3 digital cvv numbers!');
      cvvRef.current.style.border = '1px solid red';
      cvvRef.current.style.outline = '1px solid red';
      cvvRef.current.focus();
    }
    if(!holderNameValid){
      alert('Please enter your name!');
      holderNameRef.current.style.border = '1px solid red';
      holderNameRef.current.style.outline = '1px solid red';
      holderNameRef.current.focus();
    }
    if(!cardNumberValid){
      alert('Please enter 16 digital card numbers!');
      cardNumberRef.current.style.border = '1px solid red';
      cardNumberRef.current.style.outline = '1px solid red';
      cardNumberRef.current.focus();
    }

    //if all valid add cardInfo to firestore
    if(ccvValid && cardNumberValid && holderNameValid)
    {
      db.collection('cardInfo').add({holderName,number,cvv,expireMonth,expireYear,cardNumber});
      dispatch(reset());
      cardNumberRef.current.style ='';
      holderNameRef.current.style ='';
      cvvRef.current.style ='';
    }
  }

  //turn creditCard to back from front
  const turnToBack=()=>{
    faceFront.current.style.transform ='rotateY(180deg)';
    faceBack.current.style.transform ='rotateY(360deg)';
  }

  //turn creditCard to front from back
  const turnToFront = () =>{
    faceFront.current.style.transform ='rotateY(0deg)';
    faceBack.current.style.transform ='rotateY(180deg)';
  }

  //handle cardNumber input
  const inputCardNumber = e=>{
    //set the style in case uses delete all the input
    if(!e.target.value) {
      cardNumberRef.current.style ='';
    };

    //can only accept number input
    let value = e.target.value.replace(/[^\d]/,'');

    //set cardNumber to show on Credit Card with space after every 4 digits
    let cardNumber = value.replace(/(\s)/g,'').replace(/(\d{4})/g,'$1 ').replace(/\s*$/,'')
    //save number and cardNumber to cardInfo
    dispatch(updateNumber(value));
    dispatch(updateCardNumber(cardNumber));
  }

  //handle holderName input
  const inputHolderName = e=>{
    //set the style in case uses delete all the input
    if(!e.target.value) {
      holderNameRef.current.style ='';
    };

    //can only accept the alphabets and space
    let value = e.target.value.replace(/[^a-zA-Z\s]/,'');
    console.log(e.target.value);
    //save holderName to cardInfo
    dispatch(updateHolderName(value));
  }

  //handle cvv input
  const inputCvv =e=>{
    e.preventDefault();
    //set the style in case uses delete all the input
    if(!e.target.value) {
      cvvRef.current.style ='';
    };
    //only accept digits
    let value = e.target.value.replace(/[^\d]/,'');
    //save cvv to cardInfo
    dispatch(updateCardCvv(value));
  }

  //handle expireMonth
  const inputExpireMonth =e =>{
    e.preventDefault();
    dispatch(updateExpireMonth(e.target.value));
  }

  //handle expireYear
  const inputExpireYear= e=>{
    e.preventDefault();
    dispatch(updateEipireYear(e.target.value));
  }


  return (
    <form className='form' noValidate onSubmit={e=>handleSubmit(e)}>
      {/*
        use CreditCard components with all props
        */}
      <CreditCard
        cardNumber= {cardNumber}
        holderName={holderName}
        cvv ={cvv}
        expireMonth ={expireMonth}
        expireYear ={expireYear}
        faceFront = {faceFront}
        faceBack ={faceBack}
        />
      {/* just a placeholder for style */}
      <div className='placeholder'></div>
      {/* cardNumber input div*/}
      <div className="card_number">
        <label htmlFor="cardnumber">Card Number</label>
        <input ref={cardNumberRef} id='cardnumber' name="username" type="text" pattern={cardnumberPatt} title='16 digital numbers' maxLength={16} onChange ={e=>inputCardNumber(e)} value={number}  required/>
      </div>

      {/*holderName input div*/}
      <div className="card_holder">
        <label htmlFor="holdername">Holder Name</label>
        <input type="text" ref={holderNameRef} id='holdername' pattern={holderNamePatt} title='4-20 characters' maxLength={20} onChange={inputHolderName} value={holderName} required />
      </div>

      {/* cardCvv input div */}
      <div className="container">
        <div className="card_expiredate">
          <label htmlFor="expiredate">Expiration Date</label>
          <div id='expiredate'>
            <select name="months" id="months" value={expireMonth} onChange={e=>inputExpireMonth(e)} required>
              <option value='s'>Month</option>
              <option value="01">01</option>
              <option value="02">02</option>
              <option value="03">03</option>
              <option value="04">04</option>
              <option value="05">05</option>
              <option value="06">06</option>
              <option value="07">07</option>
              <option value="08">08</option>
              <option value="09">09</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
            <select name="years" id="years" value ={expireYear}  onChange ={e=>inputExpireYear(e)}  required>
              <option value="">Year</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
              <option value="2030">2030</option>
            </select>
          </div>
        </div>
        {/*card cvv input div*/}
        <div className="card_cvv">
          <label htmlFor="cvv">CVV</label>
          <input type="text" id='cvv' ref={cvvRef} pattern={cardcvvPatt} title='3 characters' value={cvv} maxLength={3} onChange={e=>inputCvv(e)} onFocus={turnToBack} onBlur={turnToFront} required/>
        </div>
      </div>
      {/* submit button */}
      <div>
        <input type="submit" value='Submit'/>
      </div>
    </form>
  )
}
