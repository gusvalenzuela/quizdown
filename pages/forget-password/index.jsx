import React from 'react'
import Head from 'next/head'
import Router from 'next/router'

const ForgetPasswordPage = () => {
  async function handleSubmit(e) {
    e.preventDefault(e)

    const body = {
      email: e.currentTarget.email.value,
    }

    const res = await fetch('/api/user/password/reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (res.status === 200) Router.replace('/')
  }

  return (
    <>
      <style jsx>
        {`
          form {
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
            padding: 1.5rem;
            margin: 0 auto;
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
      <Head>
        <title>Forget password</title>
      </Head>
      <h2>Forget password</h2>
      <form onSubmit={handleSubmit}>
        <p>Do not worry. Simply enter your email address below.</p>
        <label>
          Email:{' '}
          <input id="email" type="email" placeholder="sample@address.com" />
        </label>
        <button disabled type="submit">
          Submit
        </button>
      </form>
    </>
  )
}

export default ForgetPasswordPage
