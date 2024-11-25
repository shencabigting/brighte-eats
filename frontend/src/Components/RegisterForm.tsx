import React, { useState } from "react";
import { REGISTER_USER } from "../GraphQL/Mutations";
import { useMutation } from "@apollo/client";

function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [selectedServices, setSelectedServices] = useState<String[]>([]);

  function checkboxHandler(e: React.ChangeEvent<HTMLInputElement>) {
    let isSelected = (e.target as HTMLInputElement).checked;
    let value = (e.target as HTMLInputElement).value;

    if (isSelected) {
      setSelectedServices([...selectedServices, value]);
    } else {
      setSelectedServices((prevState) => prevState.filter((x) => x !== value));
    }
  }

  const [register, { error }] = useMutation(REGISTER_USER);

  const registerUser = () => {
    register({
      variables: {
        input: {
          name: name,
          email: email,
          mobile: mobile,
          services: selectedServices,
        },
      },
    });

    if (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Mobile"
        onChange={(e) => {
          setMobile(e.target.value);
        }}
      />
      <div>
        <label>
          <input
            type="checkbox"
            checked={selectedServices.includes("DELIVERY")}
            value="DELIVERY"
            onChange={checkboxHandler}
          />
          Delivery
        </label>
        <label>
          <input
            type="checkbox"
            checked={selectedServices.includes("PICKUP")}
            value="PICKUP"
            onChange={checkboxHandler}
          />
          Pick-Up
        </label>
        <label>
          <input
            type="checkbox"
            checked={selectedServices.includes("PAYMENT")}
            value="PAYMENT"
            onChange={checkboxHandler}
          />
          Payment
        </label>
      </div>
      <button onClick={registerUser}>Register User</button>
    </div>
  );
}

export default RegisterForm;
