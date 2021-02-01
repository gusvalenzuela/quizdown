import React, { useState, FormEvent } from 'react'
import Link from 'next/link'
import { Icon } from 'semantic-ui-react'

const SignupForm = ({ mutate }) => {
  const [errorMsg, setErrorMsg] = useState(null)

  const handleSubmit = async (e: FormEvent<any>) => {
    // console.log(e)

    const body = {
      email: e.currentTarget.email.value,
      name: e.currentTarget.name.value,
      password: e.currentTarget.password.value,
    }
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (res.status === 201) {
      const userObj = await res.json()
      mutate(userObj)
    } else {
      setErrorMsg(await res.text())
    }
  }
  return (
    <>
      <style jsx>
        {`
          form {
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
            padding: 1.5rem;
            margin: 2.5rem auto;
            width: 100%;
            max-width: 420px;
            transition: box-shadow 0.2s ease 0s;
            background: #ffff;
            text-align: center;
          }
          div.input-wrap {
            display: grid;
            grid-template-columns: auto 1fr;
          }
          form.signup input {
            border: none;
            border-bottom: 2px solid black;
            padding: 0.5rem 0.1rem;
            margin-bottom: 1.25rem;
          }
          form > button {
            width: 65%;
            padding: 0.5rem 1rem;
            margin-top: 1rem;
          }
        `}
      </style>
      <form className="signup" onSubmit={handleSubmit}>
        {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
        <div className="input-wrap">
          <Icon name="user" size="big" aria-label="Username" />
          <input
            required
            id="name"
            type="name"
            name="name"
            autoComplete="true"
            placeholder="Username"
          />
        </div>
        <div className="input-wrap">
          <Icon name="envelope" size="big" aria-label="Email" />
          <input
            required
            id="email"
            type="email"
            name="email"
            autoComplete="true"
            placeholder="Email"
          />
        </div>
        <div className="input-wrap">
          <Icon name="lock" size="big" aria-label="Password" />
          <input
            required
            id="password"
            type="password"
            name="new-password"
            autoComplete="true"
            placeholder="Password"
          />
        </div>
        <button className="button" type="submit" disabled>
          Sign up
        </button>
        <br />
        <br />
        <Link href="/login" passHref>
          <a>Already have an account?</a>
        </Link>
      </form>
    </>
  )
}

export default SignupForm
