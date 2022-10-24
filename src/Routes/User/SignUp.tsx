import React from 'react'
import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { actions as userActions } from '../../features/userReducer'
import { User } from '../../models/types';
import '../../styles/_userForm.scss'
import { v4 as uuid } from 'uuid';

type Props = {}

const SignUp = (props: Props) => {
  const dispatch = useDispatch();

  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPhone, setUserPhone] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [loading, setLoading] = useState(false)
  const [alreadyExist, setAlreadyExist] = useState<boolean>(false)

  const navigate = useNavigate();

  const newUser: User = {
    name: userName,
    email: userEmail,
    accountId: '',
    phoneNumber: userPhone,
    admin: false,
    password: userPassword
  }
  async function addUser() {
    setLoading(true)
    setAlreadyExist(false)
    const response = await fetch('http://localhost:8000/api/user/signup', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: { 'Content-Type': 'application/json' }
    })

    const data = await response.json();
    if( data.success ) {
      setLoading(false)
      dispatch(userActions.setUser(data.user))
      console.log(data)
      localStorage.setItem('accountId', (data.user.accountId))
      navigate('/')
    } else {
      setLoading(false)
      setAlreadyExist(true)

    }

    
  }

  const handleSubmit: (e: FormEvent) => void = (e) => {
    e.preventDefault();
    
    addUser();
  }

  const handleName: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
    if( e.target.value !== ' ') {
      setUserName(e.target.value);
    }
  };

  const handleEmail: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
      setUserEmail(e.target.value);
  };

  const handlePassword: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
      setUserPassword(e.target.value);
  };

  const handlePhone: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
      setUserPhone(e.target.value);
  };

  return (
    <div className='userForm'>
      {loading ? 
            <div className='loading'></div>
            : ''
        }
       <button className='smallBtn' onClick={()=>navigate(-1)}>Tillbaka</button>
      <figure className='formLogo'></figure>
      <form>
        <label htmlFor="username">Användarnamn</label>
        <input type="text" name='username' required onChange={(e)=> {handleName(e)}} />
        <label htmlFor="password">Lösenord</label>
        <input type="password" name="password" required onChange={(e)=>{handlePassword(e)}} />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" required onChange={(e)=>{handleEmail(e)}} />
        <label htmlFor="phonNumber">Telefonnummer</label>
        <input type="number" name="phoneNumber" required onChange={(e)=>{handlePhone(e)}} />
        <button className='bigBtn signupBtn' onClick={(e)=>{handleSubmit(e)}}>Skapa konto</button>
      </form>
      {alreadyExist ? 
        <p>Konto finns redan</p>
        : ''
      }

    </div>
  )
}

export default SignUp

