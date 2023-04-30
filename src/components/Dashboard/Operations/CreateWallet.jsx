import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function CreateWallet() {
  const [name, setName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // handle form submission here
      const response = await fetch("/api/createwallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, accountNumber, description, priority }),
      });

      const data = await response.json();
      console.log(data.message);

      // reset form fields
      setName("");
      setAccountNumber("");
      setDescription("");
      setPriority("");
    } catch (error) {
      console.error(error);
    }
  }

  const changeHandler = (event, fieldName) => {
    switch (fieldName) {
      case "name":
        setName(event.target.value);
        break;
      case "accountNumber":
        setAccountNumber(event.target.value);
        break;
      case "description":
        setDescription(event.target.value);
        break;
      case "priority":
        setPriority(event.target.value);
        break;
      default:
        break;
    }
  }

  return (
    <div className="project">
      <div>
        <div className="row">
          <div className="col-md-8 m-auto">
            <h5 className="display-4 text-center">Create Wallet</h5>
            <hr />
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="text" onChange={(event) => changeHandler(event, "name")} value={name} className="form-control form-control-lg " placeholder="Account Name" />
              </div>
              <div className="form-group">
                <input type="text" onChange={(event) => changeHandler(event, "accountNumber")} value={accountNumber} className="form-control form-control-lg" placeholder="Account No" />
              </div>
              <div className="form-group">
                <textarea onChange={(event) => changeHandler(event, "description")} value={description} className="form-control form-control-lg" placeholder="Description"></textarea>
              </div>
              <div className="form-group">
                <select className="form-control form-control-lg" onChange={(event) => changeHandler(event, "priority")} value={priority}>
                  <option value={3}>Display Priority</option>
                  <option value={1}>High</option>
                  <option value={2}>Medium</option>
                  <option value={3}>Low</option>
                </select>
              </div>
              <input type="submit" className="btn btn-primary btn-block mt-4" value="Create/Update" />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateWallet;
