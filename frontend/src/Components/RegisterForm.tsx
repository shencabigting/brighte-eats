import React, { useState, useEffect } from "react";
import { REGISTER_USER } from "../GraphQL/Mutations";
import { useMutation } from "@apollo/client";

function RegisterForm() {
  const [status, setStatus] = useState<{ type: string }>();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [postcode, setPostcode] = useState<string>("");
  const [selectedServices, setSelectedServices] = useState<String[]>([]);
  const [res, setRes] = useState<{
    id: number;
    name: string;
    email: string;
    mobile: string;
    postcode: string;
    services: string[];
  }>();

  function checkboxHandler(e: React.ChangeEvent<HTMLInputElement>) {
    let isSelected = (e.target as HTMLInputElement).checked;
    let value = (e.target as HTMLInputElement).value;

    if (isSelected) {
      setSelectedServices([...selectedServices, value]);
    } else {
      setSelectedServices((prevState) => prevState.filter((x) => x !== value));
    }
  }

  const [register, { error, data }] = useMutation(REGISTER_USER);

  useEffect(() => {
    if (data) {
      setRes(data.register);
    }
  }, [data]);

  const registerUser = () => {
    register({
      variables: {
        input: {
          name: name,
          email: email,
          mobile: mobile,
          postcode: postcode,
          services: selectedServices,
        },
      },
    });

    if (error) {
      setStatus({ type: "error" });
    } else {
      setStatus({ type: "success" });
      setName("");
      setEmail("");
      setMobile("");
      setPostcode("");
      setSelectedServices([]);
    }
  };

  return (
    <div>
      <h2>Registration Page</h2>
      <div>
        {status?.type === "success" && (
          <p>Successfully registered user ID: {res && res.id}</p>
        )}
        {status?.type === "error" && <p>Failed to register user.</p>}
      </div>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Mobile"
          value={mobile}
          onChange={(e) => {
            setMobile(e.target.value);
          }}
          required
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Postcode"
          value={postcode}
          onChange={(e) => {
            setPostcode(e.target.value);
          }}
          required
        />
      </div>
      <div>
        <div>Service of Interest (choose at least 1):</div>
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
      </div>
      <button onClick={registerUser}>Register User</button>
    </div>
  );
}

export default RegisterForm;
