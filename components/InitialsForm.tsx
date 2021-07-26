import React from 'react'
import type { FormEvent } from 'react'

const InitialsForm = ({ docToInsert, saveScoreStatus, setSaveScoreStatus }) => {
  const initialsInputRef = React.useRef(null)

  const handleFormSubmit = async (ev: FormEvent) => {
    ev.preventDefault()
    setSaveScoreStatus({ ...saveScoreStatus, updating: true })

    // save initials to DB
    // along with quiz results and category (name, id, difficulty)
    const results = await fetch('/api/scores', {
      method: 'POST',
      body: JSON.stringify({
        initials: initialsInputRef.current.value,
        ...docToInsert,
      }),
    }).then((r) => r.json())

    setSaveScoreStatus({ ...saveScoreStatus, updating: false })

    if (results.message === 'success') {
      // succesfully updated DB: update the user
      return setSaveScoreStatus({
        ...saveScoreStatus,
        updated: true,
        updating: false,
        message: results.message,
      })
      // console.log(`successfully updated the DB`)
    }
    // reload page or show leaderboard?
    return setSaveScoreStatus({ ...saveScoreStatus, updated: false })
  }

  return (
    <>
      <style jsx>
        {`
          input {
            display: block;
            min-width: 10px;
            text-align: center;
          }
          input#user-initials {
            width: 3.3rem;
            background: #00000067;
            color: #ffffff;
          }
          form {
            color: #fff;
          }
          #initials-form > * {
            margin: 1rem auto;
          }
        `}
      </style>
      <form onSubmit={handleFormSubmit} id="initials-form" className="col-12">
        {/* <h5>Enter your initials:</h5> */}
        <label htmlFor="#user-initials">
          <h5>Enter your initials:</h5>
        </label>
        <input
          ref={initialsInputRef}
          className="user-initials-input"
          autoComplete="false"
          placeholder="---"
          type="text"
          id="user-initials"
          name="user-initials"
          maxLength={3}
          onChange={() => {
            initialsInputRef.current.value =
              initialsInputRef.current.value.toUpperCase()
          }}
        />
        <input className="submit-btn" value="Submit" type="submit" />
      </form>
    </>
  )
}

export default InitialsForm
