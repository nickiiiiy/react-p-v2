import React from "react";
import { useState } from "react";
import Cards from "react-credit-cards-2";
import styles from "./CreditCard.module.scss";
import "react-credit-cards-2/dist/es/styles-compiled.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";

const CreditCard = () => {
  const [state, setState] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    mode: "onChange",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };
  const handleInputFocus = (e) => {
    setState((prev) => ({ ...prev, focus: e.target.name }));
  };
  return (
    <div className={styles.container}>
      <Cards
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus}
      />
      <Paper className={{ root: styles.root }}>
        <form className={styles.form}>
          <TextField
            className={styles.field}
            type="number"
            label="Card Number"
            name="number"
            // placeholder="Card Number"
            value={state.number}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            required
            fullWidth
          />
          <TextField
            className={styles.field}
            type="text"
            label="Name"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            required
            fullWidth
          />
          <div className={styles.row}>
            <TextField
              className={styles.field}
              type="number"
              label="MM/YY"
              pattern="\d\d/\d\d"
              value={state.expiry}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              required
              fullWidth
            />
            <TextField
              className={styles.field}
              // type="number"
              // label="CVC"
              // pattern="\d{3,4}"
              // value={state.cvc}
              // onChange={handleInputChange}
              // onFocus={handleInputFocus}
              // required
              // fullWidth
              type="number"
              name="cvc"
              placeholder="CVC"
              pattern="\d{3,4}"
              value={state.cvc}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              maxLength={3}
              required
            />
          </div>
          <Button type="submit" size="large" variant="contained" fullWidth>
            Submit
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default CreditCard;
