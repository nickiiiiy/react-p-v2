import React, { FC } from "react";
import ReactSelect from "react-select";
import { IOption, IShippingFields } from "../app.interface";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { logout } from "../redux/slices/auth";
import { Navigate } from "react-router-dom";
import styles from "./ShippingForm.module.scss";
import { Paper, TextField, Typography } from "@mui/material";

export const options: IOption[] = [
  {
    value: "russia",
    label: "Russia",
  },
  {
    value: "china",
    label: "China",
  },
  {
    value: "usa",
    label: "USA",
  },
  {
    value: "new-zeeland",
    label: "New Zeeland",
  },
];

export const getValue = (value: string) =>
  value ? options.find((option) => option.value === value) : "";

const ShippingForm: FC = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    control,
  } = useForm<IShippingFields>({
    mode: "onChange",
  });
  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
      window.location.href = "/";
    }
  };

  const onSubmit: SubmitHandler<IShippingFields> = (data) => {
    console.log(data);
    fetch("https://65b63a6ada3a3c16ab006363.mockapi.io/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data sent successfully", data);
        reset();
      })
      .catch((error) => {
        console.error("Error sending data", error);
      });
  };
  return (
    <Paper classes={{ root: styles.root }}>
      {/* <h1>Shipping</h1> */}
      <Typography classes={{ root: styles.title }} variant="h5">
        Shipping
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextField
            {...register("name", {
              required: "Name is require field!",
            })}
            type="text"
            className={styles.field}
            label="Полное имя"
            fullWidth
          />
          {errors?.name && (
            <div style={{ color: "red", marginBottom: 10 }}>
              {errors.name.message}
            </div>
          )}
        </div>
        <div>
          <TextField
            type="tel"
            className={styles.field}
            label="Телефон"
            fullWidth
            {...register("phone", {
              required: "Phone is required field!",
              //   pattern: {
              //     value:
              //       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              //     message: "Please enter valid email!",
              //   },
            })}
          />
          {errors?.phone && (
            <div style={{ color: "red" }}>{errors.phone.message}</div>
          )}
        </div>
        {/* <Controller
          control={control}
          name="address.country"
          rules={{
            required: "Country is required!",
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div>
              <ReactSelect
                className={styles.field}
                placeholder="Выберите страну"
                options={options}
                value={getValue(value)}
                onChange={(newValue) => onChange((newValue as IOption).value)}
              />
              {error && (
                <div style={{ color: "red", marginBottom: 10 }}>
                  {error.message}
                </div>
              )}
            </div>
          )}
        /> */}
        <div>
          <TextField
            className={styles.field}
            type="text"
            label="Город"
            fullWidth
            {...register("address.city", {
              required: "City is required field!",
            })}
          />
          {errors?.address?.city && (
            <div style={{ color: "red", marginBottom: 10 }}>
              {errors.address.city.message}
            </div>
          )}
        </div>

        <div>
          <TextField
            className={styles.field}
            type="text"
            label="Улица"
            fullWidth
            {...register("address.street", {
              required: "Street is required field!",
            })}
          />
          {errors?.address?.street && (
            <div style={{ color: "red", marginBottom: 10 }}>
              {errors.address.street.message}
            </div>
          )}
        </div>
        <div>
          <TextField
            className={styles.field}
            type="text"
            label="Дом"
            fullWidth
            {...register("address.house", {
              required: "House is required field!",
            })}
            placeholder="House"
          />
          {errors?.address?.house && (
            <div style={{ color: "red", marginBottom: 10 }}>
              {errors.address.house.message}
            </div>
          )}
        </div>
        <Button
          disabled={!isValid}
          size="large"
          variant="contained"
          fullWidth
          type="submit"
          style={{ marginBottom: 10 }}
        >
          Оформить
        </Button>
        <Button
          onClick={onClickLogout}
          variant="contained"
          color="error"
          fullWidth
          size="large"
        >
          Выйти
        </Button>
      </form>
    </Paper>
  );
  // return (
  //   // <div>
  //   //   {/* <h1>Shipping</h1> */}
  //   //   <form
  //   //     onSubmit={handleSubmit(onSubmit)}
  //   //     style={{ width: "66%", margin: "0 auto" }}
  //   //   >
  //   //     <div>
  //   //       <input
  //   //         {...register("name", {
  //   //           required: "Name is require field!",
  //   //         })}
  //   //         placeholder="Введите своё имя"
  //   //       />
  //   //       {errors?.name && (
  //   //         <div style={{ color: "red", marginBottom: 10 }}>
  //   //           {errors.name.message}
  //   //         </div>
  //   //       )}
  //   //     </div>
  //   //     <div style={{ marginBottom: 15 }}>
  //   //       <input
  //   //         {...register("phone", {
  //   //           required: "Phone is required field!",
  //   //           //   pattern: {
  //   //           //     value:
  //   //           //       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  //   //           //     message: "Please enter valid email!",
  //   //           //   },
  //   //         })}
  //   //         placeholder="phone"
  //   //       />
  //   //       {errors?.phone && (
  //   //         <div style={{ color: "red" }}>{errors.phone.message}</div>
  //   //       )}
  //   //     </div>
  //   //     <Controller
  //   //       control={control}
  //   //       name="address.country"
  //   //       rules={{
  //   //         required: "Country is required!",
  //   //       }}
  //   //       render={({ field: { onChange, value }, fieldState: { error } }) => (
  //   //         <div>
  //   //           <ReactSelect
  //   //             placeholder="Countries"
  //   //             options={options}
  //   //             value={getValue(value)}
  //   //             onChange={(newValue) => onChange((newValue as IOption).value)}
  //   //           />
  //   //           {error && (
  //   //             <div style={{ color: "red", marginBottom: 10 }}>
  //   //               {error.message}
  //   //             </div>
  //   //           )}
  //   //         </div>
  //   //       )}
  //   //     />
  //   //     <div style={{ marginTop: 15 }}>
  //   //       <input
  //   //         {...register("address.city", {
  //   //           required: "City is required field!",
  //   //         })}
  //   //         placeholder="City"
  //   //       />
  //   //       {errors?.address?.city && (
  //   //         <div style={{ color: "red", marginBottom: 10 }}>
  //   //           {errors.address.city.message}
  //   //         </div>
  //   //       )}
  //   //     </div>

  //   //     <div>
  //   //       <b>Street</b>
  //   //       <input
  //   //         {...register("address.street", {
  //   //           required: "Street is required field!",
  //   //         })}
  //   //         placeholder="Street"
  //   //       />
  //   //       {errors?.address?.street && (
  //   //         <div style={{ color: "red", marginBottom: 10 }}>
  //   //           {errors.address.street.message}
  //   //         </div>
  //   //       )}
  //   //     </div>
  //   //     <div>
  //   //       <input
  //   //         {...register("address.house", {
  //   //           required: "House is required field!",
  //   //         })}
  //   //         placeholder="House"
  //   //       />
  //   //       {errors?.address?.house && (
  //   //         <div style={{ color: "red", marginBottom: 10 }}>
  //   //           {errors.address.house.message}
  //   //         </div>
  //   //       )}
  //   //     </div>
  //   //     <button>Send</button>
  //   //     <Button onClick={onClickLogout} variant="contained" color="error">
  //   //       Выйти
  //   //     </Button>
  //   //   </form>
  //   // </div>
  // );
};

export default ShippingForm;
