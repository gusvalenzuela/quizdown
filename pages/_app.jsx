import React from 'react'
import Head from 'next/head'
import Moment from 'react-moment'
import Layout from '../components/layout'
import './_app.css'
import 'semantic-ui-css/semantic.min.css'

export default function MyApp({ Component, pageProps }) {
  // Start the pooled timer which runs every 60 seconds
  // (60000 milliseconds) by default.
  Moment.startPooledTimer(1000)
  return (
    <Layout>
      <Head>
        <title>QuizDown⁉</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}
