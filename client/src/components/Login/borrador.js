const [input, setInput] = useState({
  username: "",
  password: "",
  profile: {
    name: "",
    surname: "",
    age: 0,
    email: "",
    city: "",
  },
});

const [register, setRegister] = useState(false);

function handleChange(e) {
  setInput({
    ...input,
    [e.target.name]: e.target.value,
  });
  setErrores(
    validatorInput({
      ...input,
      [e.target.name]: e.target.value,
    })
  );
  console.log(input);
}

function handleChangeProfile(e) {
  setInput({
    ...input,
    profile: {
      ...input.profile,
      [e.target.name]: e.target.value,
    },
  });
  setErrores(
    validatorInput({
      ...input,
      profile: {
        ...input.profile,
        [e.target.name]: e.target.value,
      },
    })
  );
  console.log(input);
}

function handleSubmit(e) {
  e.preventDefault();
  console.log(input);
  if (
    !input.profile.name ||
    !input.profile.surname ||
    !input.username ||
    !input.password ||
    !input.profile.age ||
    !input.profile.email
  ) {
    alert("Todos los campos deben ser completados correctamente");
  } else {
    dispatch(register(input));
    alert("Usuario creado, Bienvenido a Eventy");
    setInput({
      username: "",
      password: "",
      profile: {
        name: "",
        surname: "",
        age: 0,
        email: "",
        city: "",
      },
    });
  }
}

function handleEnter(e){
  e.preventDefault();
  console.log(input);
  if (
    !input.username ||
    !input.password
  ) {
    alert("Todos los campos deben ser completados correctamente");
  } else {
    //dispatch(accion de ingreso(input));
    alert("Usuario confirmado, Bienvenido a Eventy");
    setInput({
      username: "",
      password: "",
      profile: {
        name: "",
        surname: "",
        age: 0,
        email: "",
        city: "",
      },
    });
  }
}

function handleNotRegister(e){
  e.preventDefault();
  setRegister(true);
  console.log(register);
} 