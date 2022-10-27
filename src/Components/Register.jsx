import React, {useEffect, useState, useRef} from 'react';
import Axios from 'axios';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';

export function Register() {
  const isMounted = useRef(false);
  const navigator = useNavigate();
  
  //Start State
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    age: '',
    email: '',
    password: '',
    confirm_password: ''
  })

  const [errorMessages, setErrorMessages] = useState({
    first_name: undefined,
    last_name: undefined,
    age: undefined,
    email: undefined,
    password: undefined,
    confirm_password: undefined
  })

  const [formIsValid, setFormIsValid] = useState(false);

  const [databaseError, setdatabaseError] = useState('');

  const [isLoading, setisLoading] = useState(false);

  //End State

  //Start Joi Object
  const schema = Joi.object({
    first_name: Joi.string().alphanum().min(2).max(10).required(),
    last_name: Joi.string().alphanum().min(2).max(10).required(),
    age: Joi.number().min(18).max(99).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: false } }).required(),
    password: Joi.string().required()
  })
  //End Joi Object

  //Start useEffect
  useEffect(()=>{
    isMounted.current && changeBorder(errorMessages.first_name , 'first_name')
  }, [errorMessages.first_name])

  useEffect(()=>{
    isMounted.current && changeBorder(errorMessages.last_name , 'last_name')
  }, [errorMessages.last_name])

  useEffect(()=>{
    isMounted.current && changeBorder(errorMessages.email , 'email')
  }, [errorMessages.email])

  useEffect(()=>{
    isMounted.current && changeBorder(errorMessages.age , 'age')
  }, [errorMessages.age])

  useEffect(()=>{
    isMounted.current && changeBorder(errorMessages.password, 'password')
  }, [errorMessages.password])

  useEffect(()=>{
    isMounted.current && changeBorder(errorMessages.confirm_password, 'confirm_password')
  }, [errorMessages.confirm_password])

  useEffect(() => {
    function enableRegisteration() {
      const registerBtn = document.querySelector('#register');
      if(formIsValid) {
        registerBtn.classList.remove('disabled', 'btn-danger')
        registerBtn.classList.add('btn-success')
      } else {
        registerBtn.classList.remove('btn-success')
        registerBtn.classList.add('disabled','btn-danger')
      }
      
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

    if (inputId === 'password') {
      if (user.confirm_password !== inputValue || user.confirm_password === '') {
        editState(setErrorMessages, 'confirm_password', "Password doesn't match!")
      } else {
        editState(setErrorMessages, 'confirm_password')
      }
    }

    if (inputId === 'confirm_password') {
      editState(setUser, inputId, inputValue)

      if (user.password === inputValue) {
        editState(setErrorMessages, inputId)
      } else {
        editState(setErrorMessages, inputId, "Password doesn't match!")
      }

    } else {
      const subSchema = schema.extract(inputId)
      console.log(subSchema)
      var validationResult = subSchema.validate(inputValue);

      if (validationResult.error) {
        editState(setUser, inputId)
        editState(setErrorMessages, inputId, validationResult.error.message)
      } else {
        editState(setUser, inputId, inputValue)
        editState(setErrorMessages, inputId)
      }
    } 
  }

  async function submitUser(e) {
    e.preventDefault();
    setisLoading(true);
    if (formIsValid) {
      const User = {...user}
      delete User.confirm_password;
      const {data} = await Axios.post('https://route-egypt-api.herokuapp.com/signup', User)

      data.message === 'success' ? navigator('/login') : setdatabaseError(data.message)

      setisLoading(false);
    } 
  }

  function changeBorder(propertyValue, property) {
    const input = document.querySelector(`#${property}`);
  
    if (propertyValue !== '') {
      input.classList.remove('is-valid')
    } else {
      input.classList.add('is-valid')
    }
  } 
  //End Functions

  return (
      <div className='row w-75 mx-auto'>
        <div className='col-12'>
          <div className='register-form'>
            <h1>JOIN US</h1>
            {databaseError && (<span className="invalid-feedback">{databaseError}</span>)}

            {/*Start Bootstrap React Form*/}
            <Form onSubmit={submitUser}>
              {/* First Name */}
              <Form.Group className='mb-2'>
                <Form.Label htmlFor="first_name" className='mt-2'>* First Name</Form.Label>
                <Form.Control
                  type="text"
                  id="first_name"
                  autoComplete='off'
                  onChange={validateInput}
                />
                {errorMessages.first_name && (<span className="invalid-feedback"> {errorMessages.first_name} </span>)}

              </Form.Group>

              {/* Last Name */}
              <Form.Group className='mb-2'>
                <Form.Label htmlFor="last_name" className='mt-2'>* Last Name</Form.Label>
                <Form.Control
                  type="text"
                  id="last_name"
                  autoComplete='off'
                  onChange={validateInput}
                />
                {errorMessages.last_name && (<span className="invalid-feedback"> {errorMessages.last_name} </span>)}
              </Form.Group>

              {/* Age */}
              <Form.Group className='mb-2'>
                <Form.Label htmlFor="age" className='mt-2'>* Age</Form.Label>
                <Form.Control
                  type="number"
                  id="age"
                  autoComplete='off'
                  onChange={validateInput}
                />
                {errorMessages.age && (<span className="invalid-feedback"> {errorMessages.age} </span>)}
              </Form.Group>

              {/* Email */}
              <Form.Group className='mb-2'>
                <Form.Label htmlFor="email" className='mt-2'>* Email</Form.Label>
                <Form.Control
                  type="email"
                  id="email"
                  autoComplete='off'
                  onChange={validateInput}
                />
                {errorMessages.email && (<span className="invalid-feedback"> {errorMessages.email} </span>)}
              </Form.Group>

              {/* Password */}
              <Form.Group className='mb-2'>
                <Form.Label htmlFor="password" className='mt-2'>* Password</Form.Label>
                <Form.Control
                  type="password"
                  id="password"
                  onChange={validateInput}
                />
                {errorMessages.password && (<span className="invalid-feedback"> {errorMessages.password} </span>)}
              </Form.Group>

              {/* Confirm Password */}
              <Form.Group className='mb-3'>
                <Form.Label htmlFor="confirm_password" className='mt-2'>* Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  id="confirm_password"
                  onChange={validateInput}
                />
                {errorMessages.confirm_password && (<span className="invalid-feedback"> {errorMessages.confirm_password} </span>)}
              </Form.Group>

              <Button id="register" type="submit" className='d-block ms-auto disabled btn-danger'>
                {isLoading? <i className='fas fa-spinner fa-spin'></i> : 'Register'}
              </Button>
            </Form>
            {/*End Bootstrap React Form*/}
          </div>

        </div>
      </div>
  )
}


