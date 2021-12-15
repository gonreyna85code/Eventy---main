import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import Boton from '../../components/Boton/Boton'
import Input from '../../components/Input/Input'
import Map from '../../components/Maps/Map'
import { changeUserCity, completeUser, getUser } from '../../redux/actions'
import styles from './completarPerfil.module.css'


function CompletePerfil(){
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const UserCity = useSelector(state=>state.UserCity)
  const [name, setName] = useState('')
  const [surname ,setSurname]= useState('')
  const [password, setPassword]= useState('')
  const [age, setAge] = useState(0)



  const events= useSelector(state=>state.User.events)
  const follows= useSelector(state=>state.User.follows)
  const near= useSelector(state=>state.User.near)
  const subscriptions= useSelector(state=>state.User.subscriptions)
  const _id= useSelector(state=>state.User._id)
  const username= useSelector(state=>state.User.username)
  const email= useSelector(state=>state.User?.email? state.User.email : state.User.profile?.email)
  const __v= useSelector(state=>state.User.__v)
  const promises= useSelector(state=>state.User.promises)
  const user = useSelector(state=>state.User)





  useEffect(()=>{
    dispatch(getUser())
  },[dispatch])

  
  
  
  
  
  console.log(user)
  
  return (
    
      <div className={styles.Container}>
        { user && user?.password?.length > 0 ? navigate('/') : null }
        <h1>ya casi estas listo para terminar tu registro en eventy!</h1>
        <h2>solo te faltan completar los siguientes datos de la cuenta:</h2>
        <form>
          <div >
              <Input
                label='Nombre:'
                type='text'
                onChange={e=>{
                  setName(e.target.value)
                }}
              />
          </div>
          <div >
              <Input
                label='Apellido:'
                type='text'
                onChange={e=>{
                  setSurname(e.target.value)
                }}
              />
          </div>
          <div >
              <Input
                label='Contraseña:'
                type='password'
                onChange={e=>{
                  setPassword(e.target.value)
                }}
              />
          </div>
          <div >
              <Input
                label='Edad:'
                type='number'
                onChange={e=>{
                  setAge(e.target.value)
                }}
              />
          </div>
          <Map
          type='user'
          places ={true}
          coords={UserCity.cityCords}
          LabelName='Ciudad'
          />
          {name !=='' && surname !==''  && password !=='' && age >=18?
          <Boton colorBtn='btn_azul'
        
        onClick={ (e)=>{
          
          e.preventDefault()
          let userComplete= {
            events,
            follows,
            near,
            subscriptions,
            _id,
            payedEvents: [ ],
            selledEvents: [ ],
            username,
            password,
            profile:{
              name,
              surname,
              age,
              email,
              city: {
                cityName: UserCity.cityName,
                cityCords: {
                  lat: UserCity.cityCords.lat,
                  lng: UserCity.cityCords.lng,
                },
              },
            },
            __v,
            promises,
          }
          dispatch(completeUser(userComplete))
          dispatch(changeUserCity({}))
          dispatch(getUser())
          setTimeout(function () {
            window.location.reload();
            navigate("/");
          }, 2000);
          
        }}
        > Completar Perfil </Boton>
        :null
          
        }
        </form>
      </div>
  )
}

export default CompletePerfil