import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import "./style.css";

function Donation() {
  const [formData, setFormData] = useState({
    name: "",
    locality: "",
    phno: "",
    amt: 500,
    donationType: "Dustbins",
    token: null,
  });

  const handleToken = (token) => {
    setFormData({ ...formData, token });
    fetch("http://localhost:3001/api/donate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="Dcontainer">
      <div className="Dheading">Donate For Good!</div>
      <div className="Dcard">
        <div className="Dcard__content">
          <form>
          <div className="ipDiv" id="nameIp">
              <label htmlFor="name">Name</label>
              <br />
              <input type="text" name="name" />
            </div>
            <div className="ipDiv">
              <label htmlFor="locality">Locality</label>
              <br />
              <input type="text" name="locality" />
            </div>
            <div className="ipDiv">
              <label htmlFor="phno">Phone Number</label>
              <br />
              <input type="text" name="phno" />
            </div>
            <div className="ipDiv">
              <label htmlFor="amt">Amount</label>
              <br />
              <input type="number" name="amt" />
            </div>
            <span>What do you want us to implant?</span>
            <div className="radio-inputs">
              <label className="radio">
                <input type="radio" name="radio" required />
                <span className="name">Dustbins</span>
              </label>
              <label className="radio">
                <input type="radio" name="radio" required />
                <span className="name">Trees</span>
              </label>
            </div>
            <div className="submitBtn">
              <StripeCheckout
                token={handleToken}
                stripeKey="pk_test_51NKIwDSBNl6Ptx1wvzYNsTXtrLi3Ne2crtZDSSTUebN08QZ8NMWRPjtUxj7Yt4kR9bFD52hOvIyjHKx7UXFThEji00VmE0n6at"
                amount={formData.amt}
                currency="USD"
                name="Donate For Good"
                description={`Proceed to pay $${formData.amt / 100} for donation`}
                billingAddress
                zipCode
              >
                <button type="button" className="btn">
                  Proceed to Pay
                </button>
              </StripeCheckout>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Donation;
