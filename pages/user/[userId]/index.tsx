import React from 'react'
import Head from 'next/head'
// import Link from 'next/link'
// import Img from 'next/image'
// import { useCurrentUser, useUser } from '../../../lib/hooks'

export default function UserPage({ userId }) {
  //   const [currentUser] = useCurrentUser()
  //   const { user, isLoading: userIsLoading } = useUser(userId)
  //   const { name, email, bio, profilePicture, image } = user || {}
  //   const isCurrentUser = currentUser?._id === user?._id

  // React.useEffect(() => {
  //   console.log(user)
  // }, [user])

  return (
    <>
      <style jsx>
        {`
          h2 {
            text-align: left;
            margin-right: 0.5rem;
          }
          img {
            width: 10rem;
            height: auto;
            border-radius: 50%;
            box-shadow: rgba(0, 0, 0, 0.05) 0 10px 20px 1px;
            margin-right: 1.5rem;
            background-color: #f3f3f3;
          }
          p {
            font-family: monospace;
            color: #444;
            margin: 0.25rem 0 0.75rem;
          }
        `}
      </style>
      <Head>
        <title>QD?! | {userId}</title>
      </Head>

      <section id="account" className="account">
        USER PAGE UNDER CONSTRUCTION
      </section>
    </>
  )
}
export async function getServerSideProps({ params }) {
  if (!params.userId) {
    return {
      notFound: true,
    }
  }
  return {
    props: { userId: params.userId }, // will be passed to the page component as props
  }
}
