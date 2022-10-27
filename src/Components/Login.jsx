import React, {useEffect, useState, useRef} from 'react';
import Form from 'react-bootstrap/Form';
import Axios from 'axios';
import { Button } from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import Joi from 'joi';

export function Login() {
  
  const isMounted = useRef(false);
  const navigator = useNavigate();
  
  //Start State
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const [errorMessages, setErrorMessages] = useState({
    email: undefined,
    password: undefined
  })

  const [formIsValid, setFormIsValid] = useState(false);

  const [databaseError, setdatabaseError] = useState('');
  //End State

  //Start Joi Object
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: false } }).required(),
    password: Joi.string().required()
  })
  //End Joi Object

  //Start useEffect
  useEffect(() => {
    function enableRegisteration() {
      const registerBtn = document.querySelector('#login');
      formIsValid ?
        registerBtn.classList.remove('disabled', 'btn-danger') :
        registerBtn.classList.add('disabled','btn-danger')
    }

    enableRegisteration()
  }, [formIsValid])

  useEffect(()=> {
      const isEmpty = Object.values(errorMessages).every(errorMsg => errorMsg === '');
      isEmpty ? setFormIsValid(true) : setFormIsValid(false)
  }, [errorMessages])

  //End useEffect

  //Start Functions
  function editState(updateFunction, key, value='') {
    updateFunction(
      (oldState) => { 
        return { ...oldState, [key]: value} 
      }
    )
  }

  function validateInput(e) {
    const inputValue = e.currentTarget.value;
    const inputId = e.currentTarget.id;
    isMounted.current = true;
    
    const subSchema = schema.extract(inputId)
    var validationResult = subSchema.validate(inputValue);

    if (validationResult.error) {
      editState(setUser, inputId)
      editState(setErrorMessages, inputId, validationResult.error.message)
    } else {
      editState(setUser, inputId, inputValue)
      editState(setErrorMessages, inputId)
    }
  }

  async function submitUser(e) {
    e.preventDefault();
    if (formIsValid) {
      let {data} = await Axios.post('https://route-egypt-api.herokuapp.com/signin', user)
      console.log(data)
      if(data.message === 'success') {
        navigator('/home')
        localStorage.setItem('token', data.token)
      } else {
        setdatabaseError(data.message)
      }

    } 
  }
  //End Functions

  return (
    
      <div className='row w-75 mx-auto'>
        <div className='col-12'>
          <div className='login-form'>
            
            {/*Start Bootstrap React Form*/}
            <Form className='position-relative' onSubmit={submitUser}>
              {/* Email */}
              <Form.Group>
                <Form.Label htmlFor="email" className='mt-2'>Email</Form.Label>
                <Form.Control
                  type="email"
                  id="email"
                  autoComplete='off'
                  onChange={validateInput}
                />
              </Form.Group>
              {errorMessages.email && (<span className="invalid-feedback"> {errorMessages.email} </span>)}

              {/* Password */}
              <Form.Group>
                <Form.Label htmlFor="password" className='mt-2'>Password</Form.Label>
                <Form.Control
                  type="password"
                  id="password"
                  onChange={validateInput}
                />
              </Form.Group>
              {errorMessages.password && (<span className="invalid-feedback"> {errorMessages.password} </span>)}

              {databaseError && (<span className="invalid-feedback">{databaseError}</span>)}
              
              <br />
              <Button id="login" type="submit" className='d-block ms-auto disabled btn-danger'>Login</Button>
              <span className='position-absolute bottom-0 start-0 mb-1'>Don't have an account? <Link to='/register'> Register Now </Link> </span>
            </Form>

            {/*End Bootstrap React Form*/}
          </div>

        </div>
      </div>
  )
}


