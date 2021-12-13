import styles from "../Profile/Profile.module.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Initial from "../Profile/Initial";
import Warning from "../../components/Warning.js/Warning";
import { findUser } from "../../redux/actions";

export default function User() {
  var user = useSelector((state) => state.User);
  const dispatch = useDispatch();
  const id = useParams().id;
  console.log(id);
  useEffect(() => {
    dispatch(findUser(id));
  }, [dispatch, id]);

  var ouser = useSelector((state) => state.OtherUsers);
  if (user === "Usuario no logueado") {
    return <Warning />;
  }

  return (
    <div className={styles.profile}>
      <Initial user={ouser} other={true} />
    </div>
  );
}
