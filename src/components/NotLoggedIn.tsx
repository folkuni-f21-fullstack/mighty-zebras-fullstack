import React from 'react'
import '../styles/_notloggedin.scss'
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import {User, Order} from "../models/types";
import {actions as userActions} from '../features/userReducer';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { actions as tempOrderActions } from '../features/tempOrderReducer';
import { actions as cartActions } from '../features/cartReducer';



type Props = {
  setUser:(user:User)=> void
}

const NotLoggedIn = (props: Props) => {

    event?.preventDefault()
    const user: User = useSelector((state: RootState) => state.user);
    const tempOrder: Order[] = useSelector((state: RootState) => state.tempOrder);


    const dispatch = useDispatch();

  function loginGuest(){
    dispatch(userActions.setGuest())
      if (tempOrder !== undefined && tempOrder.length > 0  ){
        dispatch(userActions.setUser(tempOrder[0].user))
       };
    
    }
  


    const [loading, setLoading] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>('')
    const [userPassword, setUserPassword] = useState<string>('')


    const navigate = useNavigate()
    

    async function userLogin() {
      setLoading(true)

      let userCreds = {
        name: userName,
        password: userPassword
      }

      const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify(userCreds),
        headers: { 'Content-Type': 'application/json' }
      })
      const data = await response.json();
      console.log('response data: ', data)
      if( data.success ) {
            setLoading(false);
            dispatch(userActions.setUser(data.user))      
            props.setUser(data.user)    
            localStorage.setItem('accountId', (data.user.accountId))
      }

    }

    const handleName: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
      if( e.target.value !== ' ') {
        setUserName(e.target.value);
      }
    };
    const handlePassword: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
      setUserPassword(e.target.value);
    };

    const handleSubmit: (e: FormEvent) => void = (e) => {
      e.preventDefault();
    
      
      userLogin();
    }
    
    function backBtn(){
      navigate("/Menu")
    }






  return (
    <div className='login'>
    <section className="flex-container">
      <form className='form' onSubmit={() => console.log('loggain')}>
        <div>
            <input className='form__input' placeholder=' ' type="text" name='username' required onChange={(e)=> handleName(e)} />
            <label className='form__label form--name' htmlFor="username">Användarnamn</label>
        </div>
        <div>
            <input className='form__input' placeholder=' ' type="password" name="password" required onChange={(e)=>handlePassword(e)} />
            <label className='form__label form--password' htmlFor="password">Lösenord</label>
        </div>
        <p>Inget konto? <a href="/SignUp"> Skapa </a></p>
        <div>
            <button type="submit" className='login-btn' onClick={(e)=>{handleSubmit(e)}}>Logga in</button>
            <button onClick={loginGuest} className='guest-btn'>Fortsätt som gäst</button>
        </div>
      </form>
    </section>
  </div>
  )
}

export default NotLoggedIn