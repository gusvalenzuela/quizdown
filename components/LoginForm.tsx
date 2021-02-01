import React, { useState } from 'react'
import Link from 'next/link'
import { Icon } from 'semantic-ui-react'

const LoginForm = ({ mutate }) => {
  const [errorMsg, setErrorMsg] = useState(null)

  async function onSubmit(e) {
    e.preventDefault()
    // clear any error msg after 3sec
    setTimeout(() => {
      setErrorMsg(null)
    }, 3000)

    const body = {
      email: e.currentTarget.email.value.trim(),
      password: e.currentTarget.password.value.trim(),
    }
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (res.status === 200) {
      const userObj = await res.json()
      mutate(userObj)
    } else {
      setErrorMsg('Incorrect username or password. Try again!')
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
          form.login input {
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
      <form className="login" onSubmit={onSubmit}>
        {errorMsg ? <p style={{ color: 'red' }}>{errorMsg}</p> : null}
        <div className="input-wrap">
          <Icon name="envelope" aria-label="Email" />{' '}
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
          <Icon name="lock" aria-label="Password" />{' '}
          <input
            required
            id="password"
            type="password"
            autoComplete="true"
            name="current-password"
            placeholder="Password"
          />
        </div>
        <button className="button" type="submit" disabled>
          <span>LOG IN</span>
        </button>
        <br />
        <br />
        <Link href="/forget-password">
          <a>Forgot password?</a>
        </Link>
        <br />
        <Link href="/signup">
          <a>Don&apos;t have an account?</a>
        </Link>
      </form>
    </>
  )
}

export default LoginForm
