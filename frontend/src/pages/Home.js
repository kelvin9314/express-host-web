import React from 'react'
import logo from '../logo.svg';
import '../App.css';

const HomePage = () => {

  React.useEffect(() => {
    console.log('HomePage')
    console.log(window.document.cookie)

    fetchApi()

    async function fetchApi() {
      const res = await fetch("http://localhost:3000/api").then(res => res.json())

      console.log(res)
    }
  }, [])

  return (
    <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  </div>
  )
}


export default HomePage
