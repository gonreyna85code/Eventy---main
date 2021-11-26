function form(){
  return(
  <div className='cont-center'>
    <h1>Crear nuevo Usuario</h1>
    <form>
      <div>
          <Input
            label='Nombre:'
            type='text'
            name='name'
            value = {input.name}
            onChange={(e) => handleChangeProfile(e)}
          />
        {errores.name && <p className="error">{errores.name}</p>}
      </div>
      <div className="input">
      <Input
          label='Apellido:'
          type='text'
          name='username'
          value = {input.surname}
          onChange={(e) => handleChangeProfile(e)}
      />
        {errores.surname && <p className="error">{errores.surname}</p>}
      </div>
      <div className="input">
      <Input
          label='Usuario:'
          type='text'
          name='username'
          value = {input.username}
          onChange={(e) => handleChange(e)}
      />
        {errores.username && <p className="error">{errores.username}</p>}
      </div>
      <div className="input">
      <Input
          label='Contraseña:'
          type='password'
          name='password'
          value = {input.password}
          onChange={(e) => handleChange(e)}
        />
        {errores.password && <p className="error">{errores.password}</p>}
      </div>
      <div className="input">
      <Input
          label='Edad:'
          type='number'
          name='age'
          value = {input.age}
          onChange={(e) => handleChangeProfile(e)}
      />
        {errores.age && <p className="error">{errores.age}</p>}
      </div>
      <div className="input">
      <Input
          label='Email:'
          type='text'
          name='email'
          value = {input.email}
          onChange={(e) => handleChangeProfile(e)}
      />
        {errores.email && <p className="error">{errores.email}</p>}
      </div>
      <div className="input">
      <Input
          label='Ciudad:'
          type='text'
          name='city'
          value = {input.city}
          onChange={(e) => handleChangeProfile(e)}
      />
        {errores.city && <p className="error">{errores.city}</p>}
      </div>
      <div className="divcrear">
      <Boton colorBtn='btn_azul' onClick={(e) => handleSubmit(e)}>Crear Usuario</Boton>
      </div>
    </form>
    </div>
  )
}