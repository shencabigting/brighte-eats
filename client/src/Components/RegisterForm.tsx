import React, { useState, useEffect } from "react";
import { REGISTER_USER } from "../GraphQL/Mutations";
import { useMutation } from "@apollo/client";
import {
  Box,
  CssBaseline,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormLabel,
  FormControl,
  FormHelperText,
  Button,
  Link,
} from "@mui/material";

const RegisterForm: React.FC = () => {
  const [status, setStatus] = useState<{ type: string }>();
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [mobile, setMobile] = useState<string | undefined>();
  const [postcode, setPostcode] = useState<string | undefined>();
  const [res, setRes] = useState<{
    id: number;
    name: string;
    email: string;
    mobile: string;
    postcode: string;
    services: string[];
  }>();
  const [checkboxes, setCheckboxes] = React.useState({
    PICKUP: false,
    DELIVERY: false,
    PAYMENT: false,
  });
  const [submit, setSubmit] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxes({
      ...checkboxes,
      [event.target.name]: event.target.checked,
    });
  };

  const { PICKUP, DELIVERY, PAYMENT } = checkboxes;
  const checkboxError = [PICKUP, DELIVERY, PAYMENT].filter((v) => v).length < 1;

  const [register, { error, data }] = useMutation(REGISTER_USER);

  useEffect(() => {
    if (data) {
      setRes(data.register);
    }
  }, [data]);

  const registerUser = () => {
    // check for required fields
    if (!name || !email || checkboxError) {
      setSubmit(true);
      return;
    }

    register({
      variables: {
        input: {
          name,
          email,
          mobile,
          postcode,
          services: Object.entries(checkboxes)
            .filter((x) => x[1])
            .map((x) => x[0]),
        },
      },
    });

    if (error) {
      setStatus({ type: "error" });
    } else {
      setSubmit(false);
      setStatus({ type: "success" });
      setName("");
      setEmail("");
      setMobile(undefined);
      setPostcode(undefined);
      setCheckboxes({
        PICKUP: false,
        DELIVERY: false,
        PAYMENT: false,
      });
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 0.5, width: "30ch" },
              padding: 2,
              borderRadius: 2,
              boxShadow: 2,
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <h2>Registration Form</h2>
              </div>
              <div>
                {status?.type === "success" && (
                  <p>Successfully registered user ID: {res && res.id}</p>
                )}
                {status?.type === "error" && <p>Failed to register user.</p>}
              </div>
            </div>
            <div>
              <TextField
                required
                id="outlined-required"
                label="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                error={submit && !name}
                helperText={submit && !name ? "This field is required" : ""}
              />
            </div>
            <div>
              <TextField
                required
                id="outlined-required"
                label="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                error={submit && !email}
                helperText={submit && !email ? "This field is required" : ""}
              />
            </div>
            <div>
              <TextField
                id="outlined-required"
                label="Mobile"
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value);
                }}
              />
            </div>
            <div>
              <TextField
                id="outlined-required"
                label="Postcode"
                value={postcode}
                onChange={(e) => {
                  setPostcode(e.target.value);
                }}
              />
            </div>
            <div>
              <FormControl
                required
                error={submit && checkboxError}
                component="fieldset"
                sx={{ m: 3 }}
                variant="standard"
              >
                <FormLabel component="legend">Service interested in</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checkboxes.PICKUP}
                        onChange={handleChange}
                        name="PICKUP"
                      />
                    }
                    label="PICKUP"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checkboxes.DELIVERY}
                        onChange={handleChange}
                        name="DELIVERY"
                      />
                    }
                    label="DELIVERY"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checkboxes.PAYMENT}
                        onChange={handleChange}
                        name="PAYMENT"
                      />
                    }
                    label="PAYMENT"
                  />
                </FormGroup>
                <FormHelperText>Choose at least 1 option.</FormHelperText>
              </FormControl>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button variant="contained" onClick={registerUser}>
                Register User
              </Button>
            </div>
          </Box>
        </div>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div>
          <Link href="/leads" underline="hover">
            Go to Leads Page
          </Link>
        </div>
      </Box>
    </React.Fragment>
  );
};

export default RegisterForm;
