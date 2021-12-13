import React from "react";
import { useDispatch } from "react-redux";
import { findEvent } from "../../redux/actions";
import style from "./SearchBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";

export default function SearchBar(props) {
  const [state, setState] = React.useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function search(event) {
    if (state !== "") {
      navigate("/result");
      dispatch(findEvent(state));
      setState("");
    }
  }

  return (
    <div className={style.container}>
      <input
        className={style.input}
        value={state}
        onChange={(event) =>
          setState(event.target.value.split(" ").filter((e) => e !== ""))
        }
        onKeyDown={(event) => {
          if (event.key === "Enter") search();
        }}
      />
      <button className={style.boton} onClick={search}>
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
}
