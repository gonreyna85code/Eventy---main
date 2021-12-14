import React from "react";
import { useDispatch } from "react-redux";
import { findEvent } from "../../redux/actions";
import style from "./SearchBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";

export default function SearchBar(props) {
  var [state, setState] = React.useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function search(event) {
    const search = state.slice(" ").trim();
    console.log(search);
    if (search !== "") {
      navigate("/result");
      dispatch(findEvent(search));
      setState("");
    }
  }

  return (
    <div className={style.container}>
      <input
        className={style.input}
        value={state}
        onChange={(event) =>
          setState(event.target.value)
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
