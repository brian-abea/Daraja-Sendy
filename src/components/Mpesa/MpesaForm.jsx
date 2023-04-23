import React, { useState } from 'react';

function MpesaForm() {
  const [amount, setAmount] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    let errors = [];

    // Validation
    if (!amount || amount <= 0) {
      errors.push('Please enter a valid amount');
    }

    if (!phone || phone.length !== 10) {
      errors.push('Please enter a valid phone number');
    }

    if (errors.length > 0) {
      setErrors(errors);
      return;
    }

    // Handle form submission
    console.log(`Submitting form with amount: ${amount} and phone: ${phone}`);

    // Clear form inputs and errors
    setAmount('');
    setPhone('');
    setErrors([]);
  };

  return (
    <div className="formPanel">
      <h2>Mpesa Payment</h2>
      {errors.length > 0 && (
        <div className="alert" role="alert">
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="text"
            id="amount"
            name="amount"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>

        <div>
          <input className="btn" type="submit" value="Pay" />
        </div>
      </form>
    </div>
  );
}

export default MpesaForm;
