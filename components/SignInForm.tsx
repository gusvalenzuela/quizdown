import React, { useState } from 'react'
// import Link from 'next/link'
// import { Icon } from 'semantic-ui-react'

const SignInForm = ({ mutate }) => {
  const [errorMsg, setErrorMsg] = useState(null)

  async function onSubmit(e) {
    e.preventDefault()
    // clear any error msg after 3sec
    setTimeout(() => {
      setErrorMsg(null)
    }, 3000)

    // AUTH SIGN IN FLOW
    if (errorMsg) {
      const userObj = {}
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
          form.signin input {
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
      <form className="signin" onSubmit={onSubmit}>
        {errorMsg ? <p style={{ color: 'red' }}>{errorMsg}</p> : null}
        SIGNING IN IS UNAVAILABLE AT THIS TIME
      </form>
    </>
  )
}

export default SignInForm
