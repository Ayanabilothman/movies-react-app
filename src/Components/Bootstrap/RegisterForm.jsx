import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import Joi from 'joi';

export function RegisterForm() {

  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    age: '',
    email: '',
    password: '',
    confirm_password: ''
  })

  const [errorMessages, setErrorMessages] = useState({
    first_name: '',
    last_name: '',
    age: '',
    email: '',
    password: '',
    confirm_password: ''
  })

  const schema = Joi.object({
    first_name: Joi.string().alphanum().min(2).max(10).required(),
    last_name: Joi.string().alphanum().min(2).max(10).required(),
    age: Joi.number().min(18).max(99).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: false } }).required(),
    password: Joi.string().required()
  })

  useEffect(() => {
    if (user.password !== user.confirm_password) {
      setUser((oldState) => {
        return { ...oldState, confirm_password: '' }
      })

      setErrorMessages((oldState) => {
        return { ...oldState, confirm_password: "Password doesn't match!" }
      })
    } else {
      setErrorMessages((oldState) => {
        return { ...oldState, confirm_password: '' }
      })
    }
  }, [user.password, user.confirm_password])

  useEffect(() => {
    for (const property in user) {
      changeBorder(property)
    }
  }, [user])


  function validateInput(e) {
    const inputValue = e.currentTarget.value;
    const inputId = e.currentTarget.id;

    if (inputId === 'confirm_password') {
      if (user.password === inputValue) {
        setUser((old) => {
          return { ...old, [inputId]: inputValue }
        })
      } else {
        setUser((old) => {
          return { ...old, [inputId]: '' }
        })
      }
    } else {
      const subSchema = schema.extract(inputId)
      var validationResult = subSchema.validate(inputValue);
      if (validationResult.error) {
        setUser((old) => {
          return { ...old, [inputId]: '' }
        })

        setErrorMessages((old) => {
          return { ...old, [inputId]: validationResult.error.message }
        })
      } else {
        setUser((old) => {
          return { ...old, [inputId]: inputValue }
        })

        setErrorMessages((old) => {
          return { ...old, [inputId]: '' }
        })
      }
    }
  }

  function submitUser(e) {
    e.preventDefault();
    console.log('New User')
  }

  function changeBorder(id) {
    const input = document.querySelector(`#${id}`);
    if (user[id]) {
      input.classList.add('is-valid')
    } else {
      input.classList.remove('is-valid')
    }
  }

  return (

    <Form onSubmit={submitUser}>
      <Form.Group>
        {/* First Name */}
        <Form.Label htmlFor="first_name" className='mt-2'>First Name</Form.Label>
        <Form.Control
          type="text"
          id="first_name"
          // className = {}
          onChange={validateInput}
        />

      </Form.Group>

      {errorMessages.first_name && (<span className="invalid-feedback"> {errorMessages.first_name} </span>)}
      {/* Last Name */}

      <Form.Group>

        <Form.Label htmlFor="last_name" className='mt-2'>Last Name</Form.Label>
        <Form.Control
          type="text"
          id="last_name"
          onChange={validateInput}
        />
      </Form.Group>
      {errorMessages.last_name && (<span className="invalid-feedback"> {errorMessages.last_name} </span>)}

      {/* Age */}
      <Form.Group>

        <Form.Label htmlFor="age" className='mt-2'>Age</Form.Label>
        <Form.Control
          type="number"
          id="age"
          onChange={validateInput}

        />
      </Form.Group>
      {errorMessages.age && (<span className="invalid-feedback"> {errorMessages.age} </span>)}

      {/* Email */}
      <Form.Group>

        <Form.Label htmlFor="email" className='mt-2'>Email</Form.Label>
        <Form.Control
          type="email"
          id="email"
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
          aria-describedby="passwordHelpBlock"
          onChange={validateInput}

        />
      </Form.Group>
      {errorMessages.password && (<span className="invalid-feedback"> {errorMessages.password} </span>)}

      {/* Confirm Password */}
      <Form.Group>

        <Form.Label htmlFor="confirm_password" className='mt-2'>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          id="confirm_password"
          onChange={validateInput}

        />
      </Form.Group>
      {errorMessages.confirm_password && (<span className="invalid-feedback"> {errorMessages.confirm_password} </span>)}

      <br />
      <Button type="submit" className='d-block ms-auto'>Register</Button>

    </Form>
  );
}