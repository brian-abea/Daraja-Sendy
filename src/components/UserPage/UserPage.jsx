import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import MpesaForm from '../Mpesa/MpesaForm';

import './UserPage.css';

function UserPage() {
  const user = useSelector((store) => store.user);
  return (

    <div className="container">
      <div>
      <h2>Welcome, {user.username}!</h2>
      </div>
      <div className="balance-container">
        <div className="balance">
          Balance: $500.00
        </div>
        <div className="add-money">
      
          <button>Add Money</button>
        </div>
        <LogOutButton className="btn" />
      </div>
      <div className="mpesa-container">
        <MpesaForm/>
      </div>
    </div>
  );
}

export default UserPage;
