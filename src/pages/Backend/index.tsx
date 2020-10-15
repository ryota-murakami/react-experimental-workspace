import React from 'react'
import useSWR from 'swr'
import { Layout, Contents } from './index.style'

// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json())

const BackendPage: React.FC = () => {
  // @ts-ignore
  const { data, error } = useSWR(process.env.REACT_APP_DEV_SERVER_URL, fetcher)
  if (error) return <div>SWR showing error</div>
  if (!data) return <div>SWR showing LOADING...</div>

  return (
    <Layout>
      <Contents>
        <h1>Backend Page</h1>
        <section>
          <h1>{data.msg}</h1>
        </section>
        <p>
          text field. <br />
          this will be show something fetch from backend.
        </p>
      </Contents>
    </Layout>
  )
}

export default BackendPage
