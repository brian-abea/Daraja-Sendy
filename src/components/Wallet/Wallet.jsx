import React, { useState } from "react";

function Wallet() {
  const [cardType, setCardType] = useState("");
  const [accountNumber,setAccountNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [billingAddress, setBillingAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // handle form submission here
      const response = await fetch("/api/wallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cardType, accountNumber, expirationDate, securityCode, billingAddress }),
      });
  
      const data = await response.json();
      console.log(data.message);
  
      // reset form fields
      setCardType("");
      setAccountNumber("");
      setExpirationDate("");
      setSecurityCode("");
      setBillingAddress("");
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit} className="formPanel">
        <h2>Add Bank Details</h2>

        <label htmlFor="cardType">Card Type</label>
        <select id="cardType"
          value={cardType}
          onChange={(e) => setCardType(e.target.value)}
        >
          <option value="">Select Card Type</option>
          <option value="visa">Visa</option>
          <option value="mastercard">Mastercard</option>
          <option value="american-express">American Express</option>
          <option value="union-pay">Union Pay</option>
          <option value="discover">Discover</option>
        </select>
        <label htmlFor="accountNumber">Account Number</label>
        <input
          type="text"
          id="accountNumber"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          placeholder="Enter your Account Number"
          required
          pattern="[0-9]{16}"
          maxLength={16}

        />
        <label htmlFor="expirationDate">Expiration Date</label>
        <input
          type="text"
          id="expirationDate"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          placeholder="MM / YY"
          required
          pattern="^(0[1-9]|1[0-2])\/([0-9]{2})$"
          maxLength={5}
        />
        <label htmlFor="securityCode">Security Code</label>
        <input
          type="text"
          id="securityCode"
          value={securityCode}
          onChange={(e) => setSecurityCode(e.target.value)}
          placeholder="CVV / CVC"
          required
          pattern="[0-9]{3,4}"
          maxLength={3}
        />
        <label htmlFor="billingAddress">Billing Address</label>
        <input
          type="text"
          id="billingAddress"
          value={billingAddress}
          onChange={(e) => setBillingAddress(e.target.value)}
          placeholder="Enter your billing address"
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Wallet;
