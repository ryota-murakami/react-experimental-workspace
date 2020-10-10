import React from 'react'
import useSWR from 'swr'
import { Layout, Contents } from './index.style'

// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json())

const BackendPage: React.FC = () => {
  // @ts-ignore
  const { data, error } = useSWR(process.env.REACT_APP_DEV_SERVER_URL, fetcher)
  if (error) return <div>ERROR!</div>
  if (!data) return <div>LOADING...</div>

  return (
    <Layout>
      <Contents>
        <h1>Fake Text</h1>
        <section>
          <h1>{data.msg}</h1>
        </section>
        <p>
          wfjewfjwef;wjfewijfw;jfwjb
          <br />
          fiowefojew;fjwfwfwjoiehvdji
        </p>
      </Contents>
    </Layout>
  )
}

export default BackendPage
