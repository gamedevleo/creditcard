import React,{useEffect} from 'react';
import './css/ShowCase.css';
import {db} from '../firebase';

export const ShowCase = () => {

  var cardInfoList;


  //render all the doc data in cardInfoList;
  const renderCardInfo = doc=>{

    //create all the element to hold the data
    let li = document.createElement('li');
    let holderNameLabel = document.createElement('span');
    let holderName = document.createElement('span');

    let cardNumberLabel = document.createElement('span');
    let cardNumber = document.createElement('span');

    let cardCvvLabel = document.createElement('span');
    let cardCvv = document.createElement('span');

    let expireDateLabel = document.createElement('span');
    let expireDate = document.createElement('span');

    let close = document.createElement('div');

    close.textContent = 'x';

    //set data-id to the li element to use when delete the element
    li.setAttribute('data-id',doc.id);

    //get data assign to all the elememts
    holderNameLabel.textContent = 'Name:';
    holderName.textContent = doc.data().holderName;

    cardNumberLabel.textContent = 'Card Number:';
    cardNumber.textContent = doc.data().number;

    cardCvvLabel.textContent = 'CVV:';
    cardCvv.textContent = doc.data().cvv;

    expireDateLabel.textContent = 'Expire Date:';
    expireDate.textContent = doc.data().expireMonth+'/'+doc.data().expireYear.slice(-2);

    //append all element to li element
    li.appendChild(close);
    li.appendChild(holderNameLabel);
    li.appendChild(holderName);
    li.appendChild(cardNumberLabel);
    li.appendChild(cardNumber);
    li.appendChild(cardCvvLabel);
    li.appendChild(cardCvv);
    li.appendChild(expireDateLabel);
    li.appendChild(expireDate);

    //append li to cardInfoList
    cardInfoList?.appendChild(li);

    // addEventListener to close element
    close.addEventListener('click',e=>{
      e.stopPropagation();
      let id = e.target.parentElement.getAttribute('data-id');
      db.collection('cardInfo').doc(id).delete();
    })
  }

  //realtime database
  db.collection('cardInfo').orderBy('holderName').onSnapshot(snapshot=>{
    let changes = snapshot.docChanges();
    changes.forEach(change=>{
      if(change.type ==='added'){
        renderCardInfo(change.doc);
      }
      else if(change.type === 'removed')
      {
        let li = cardInfoList?.querySelector('[data-id="'+change.doc.id+'"]');
        cardInfoList?.removeChild(li);
      }

    })
  })

  //get cardInfoList element
  useEffect(()=>{
    cardInfoList = document.getElementById('cardinfo_list');
  },[])

  return (
    <div className='showcase'>
      <h1>ShowCase</h1>
      <ul id='cardinfo_list'></ul>
    </div>
  )
}
