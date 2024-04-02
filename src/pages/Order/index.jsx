import React, { useEffect, useState } from "react";
import ShippingForm from "../../components/ShippingForm";
import { SelectIsAuth, fetchAuthMe } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styles from "./Order.module.scss";

export const Order = () => {
  const dispatch = useDispatch();

  const [userName, setUserName] = useState("");
  const isAuth = useSelector(SelectIsAuth);

  useEffect(() => {
    const fetchData = async () => {
      const user = await dispatch(fetchAuthMe());
      setUserName(user.payload.fullName);
    };
    fetchData();
  }, [dispatch]);
  // if (!isAuth) {
  //   return <Navigate to="/login" />;
  // }
  return (
    <>
      <div className={styles.title}>
        <h1>Добро пожаловать, {userName}!</h1>
        <h1>Оформите ваш заказ</h1>
      </div>
      <ShippingForm />
    </>
  );
};
