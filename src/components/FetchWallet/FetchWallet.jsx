import React, { useState, useEffect } from "react";

function FetchWallet() {
  const [walletData, setWalletData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/getwallet");
      const data = await response.json();
      setWalletData(data);
    };
    
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`/api/deletewallet/${id}`, { method: "DELETE" });
    setWalletData(walletData.filter((item) => item.id !== id));
  };

  const handleEdit = async (id, updatedItem) => {
    const response = await fetch(`/api/updatewallet/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    });

    const data = await response.json();
    const index = walletData.findIndex((item) => item.id === id);
    setWalletData([
      ...walletData.slice(0, index),
      data,
      ...walletData.slice(index + 1),
    ]);
  };

  return (
    <div>
      <h2 className="font-bold text-center uppercase text-lg">Wallet Details</h2>
      {walletData.map((item, index) => (
        <div key={index} className="bg-blue-100 flex items-center justify-between rounded-lg p-3 mt-2 mb-2">
          <div className="flex-col">
            <p className="text-lg font-bold mb-2">Card Type:</p>
            <span className="font-normal">{item.card_type}</span>
          </div>
          <div className="flex-col">
            <p className="text-lg font-bold mb-2">Account Number:</p>
            <span className="font-normal">{item.account_number}</span>
          </div>
          <div className="flex-col">
            <p className="text-lg font-bold mb-2">Expiration Date:</p>
            <span className="font-normal">{new Date(item.expiration_date).toLocaleDateString()}</span>
          </div>
          <div className="flex-col">
            <p className="text-lg font-bold mb-2">Security Code:</p>
            <span className="font-normal">{item.security_code}</span>
          </div>
          <div className="flex-col">
            <p className="text-lg font-bold mb-2">Billing Address:</p>
            <span className="font-normal">{item.billing_address}</span>
          </div>
          <div className="flex p-4 mt-4">
            <button className="bg-green-500 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => handleEdit(item.id, item)}>Edit</button>
            <button className="bg-red-500 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FetchWallet;
