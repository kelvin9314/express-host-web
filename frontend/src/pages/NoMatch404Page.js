import React from 'react'

import { Link } from 'react-router-dom'


const NoMatch404Page = () => {
  React.useEffect(() => {
    console.log('NoMatch404Page')
    console.log(window.document.cookie)

    // fetchApi()

    // async function fetchApi() {
    //   const res = await fetch("http://localhost:3001/api").then(res => res.json())

    //   console.log(res)
    // }
  }, [])

  return(
    <div style={{marginLeft: 20}}>
      <h2>404 Page Not Found</h2>
      <p> Redirecting to
        <Link to="/home"><span style={{color: 'dodgerblue'}}> Home Page</span></Link>
      </p>
    </div>
  )
}

export default NoMatch404Page
