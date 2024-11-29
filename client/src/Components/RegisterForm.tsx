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
} from "@mui/material";
import SuccessBanner from "./SuccessBanner";
import FailureBanner from "./FailureBanner";

const RegisterForm: React.FC = () => {
  const [status, setStatus] = useState<{ type: string; message: string }>();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [postcode, setPostcode] = useState<string>("");
  const [checkboxes, setCheckboxes] = React.useState({
    PICKUP: false,
    DELIVERY: false,
    PAYMENT: false,
  });
  const [submit, setSubmit] = useState<boolean>(false);
  const [helperText, setHelperText] = useState({
    email: "",
    mobile: "",
    postcode: "",
  });
  const [validationError, setValidationError] = useState({
    email: false,
    mobile: false,
    postcode: false,
  });

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
      setStatus({ type: "success", message: "" });
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setStatus({ type: "error", message: error.message });
    }
  }, [error]);

  const validateEmail = (email: string) => {
    if (!email) {
      setValidationError(
        Object.assign(validationError, {
          email: true,
        })
      );
      setHelperText(
        Object.assign(helperText, {
          email: "This field is required.",
        })
      );
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setValidationError(
        Object.assign(validationError, {
          email: true,
        })
      );
      setHelperText(
        Object.assign(helperText, {
          email: "Please enter a valid email address.",
        })
      );
    } else {
      setValidationError(
        Object.assign(validationError, {
          email: false,
        })
      );
      setHelperText(
        Object.assign(helperText, {
          email: "",
        })
      );
    }
  };

  const validateMobile = (mobile: string) => {
    if (mobile.length && !/^\+{0,1}[0-9]+$/.test(mobile)) {
      setValidationError(
        Object.assign(validationError, {
          mobile: true,
        })
      );
      setHelperText(
        Object.assign(helperText, {
          mobile: "Please enter a valid mobile number.",
        })
      );
    } else {
      setValidationError(
        Object.assign(validationError, {
          mobile: false,
        })
      );
      setHelperText(
        Object.assign(helperText, {
          mobile: "",
        })
      );
    }
  };

  const validatePostcode = (postcode: string) => {
    if (postcode.length && !/^[0-9]+$/.test(postcode)) {
      setValidationError(
        Object.assign(validationError, {
          postcode: true,
        })
      );
      setHelperText(
        Object.assign(helperText, {
          postcode: "Please enter a valid postcode.",
        })
      );
    } else {
      setValidationError(
        Object.assign(validationError, {
          postcode: false,
        })
      );
      setHelperText(
        Object.assign(helperText, {
          postcode: "",
        })
      );
    }
  };

  const registerUser = () => {
    validateEmail(email);
    validateMobile(mobile);
    validatePostcode(postcode);

    // check for required fields
    if (
      !name ||
      checkboxError ||
      Object.entries(validationError).filter((x) => x[1]).length // check that there are no validation errors
    ) {
      setSubmit(true);
      return;
    }

    register({
      variables: {
        input: {
          name,
          email,
          mobile: mobile === "" ? undefined : mobile,
          postcode: postcode === "" ? undefined : postcode,
          services: Object.entries(checkboxes)
            .filter((x) => x[1])
            .map((x) => x[0]),
        },
      },
    });

    setSubmit(false);
    setName("");
    setEmail("");
    setMobile("");
    setPostcode("");
    setCheckboxes({
      PICKUP: false,
      DELIVERY: false,
      PAYMENT: false,
    });
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
            autoComplete="off"
            sx={{
              "& .MuiTextField-root": { m: 0.5, width: "40ch" },
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
                  <SuccessBanner message="Successfully registered user." />
                )}
                {status?.type === "error" && (
                  <FailureBanner message={status.message} />
                )}
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
                helperText={submit && !name ? "This field is required." : ""}
              />
            </div>
            <div>
              <TextField
                required
                id="outlined-required"
                label="Email"
                value={email}
                onChange={(e) => {
                  validateEmail(e.target.value);
                  setEmail(e.target.value);
                }}
                error={validationError.email}
                helperText={helperText.email}
              />
            </div>
            <div>
              <TextField
                id="outlined-required"
                label="Mobile"
                value={mobile}
                onChange={(e) => {
                  validateMobile(e.target.value);
                  setMobile(e.target.value);
                }}
                error={validationError.mobile}
                helperText={helperText.mobile}
              />
            </div>
            <div>
              <TextField
                id="outlined-required"
                label="Postcode"
                value={postcode}
                onChange={(e) => {
                  validatePostcode(e.target.value);
                  setPostcode(e.target.value);
                }}
                error={validationError.postcode}
                helperText={helperText.postcode}
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
    </React.Fragment>
  );
};

export default RegisterForm;
