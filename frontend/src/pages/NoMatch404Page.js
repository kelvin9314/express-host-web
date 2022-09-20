import { Link } from 'react-router-dom'


const NoMatch404Page = () => {
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
