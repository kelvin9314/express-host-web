import React from 'react'
import logo from '../logo.svg';
import '../App.css';
import jwt_decode from 'jwt-decode'
import useLocalStorage from '../hooks/use-local-storage'
import { useParams } from 'react-router-dom'


const HomePage = () => {
  const { needToCall } = useParams();
  const [token, setToken] = useLocalStorage('logt', '')
  const [account, setAccount] = React.useState('')

  React.useEffect(() => {
    console.log(`needToCall: ${needToCall}`)

    if(needToCall) fetchApi()

    async function fetchApi() {
      const res = await fetch("http://localhost:3001/f2e/get-cookies",{
        mode: 'same-origin',
        redirect: 'follow',
        credentials: 'include'
      }).then(res => res.json())

      if(res.token) {
        try {
          try {
            const decoded = jwt_decode(res.token)
            console.log(decoded)

            const isTokenExpired = new Date(decoded.exp * 1000) < new Date()
            if (isTokenExpired || !decoded?.account || !decoded?.lang || !decoded?.uid) return

            setToken(res.token )
            setAccount(decoded.account)


          } catch (error) {
            console.warn('token is not a JWT ')
            return
          }
        } catch (error) {

        }
      }else {
        setToken('')
        setAccount('')
      }


    }
  }, [needToCall])


  // NOTE: 網頁已登入過，localStorage 有值
  React.useEffect(() => {
    if(!token) return

    console.log(token)
    try {
      const decoded = jwt_decode(token)
      console.log(decoded)
      const isTokenExpired = new Date(decoded.exp * 1000) < new Date()
      if (isTokenExpired || !decoded?.account || !decoded?.lang || !decoded?.uid) {
        setToken('')
        setAccount('')
        return
      }

      setAccount(decoded.account)
    } catch (error) {
      console.warn('token is not a JWT ')
      setToken('')
      setAccount('')
      return
    }

  }, [token])


  const handleResetCookie = async () => {

    fetch("http://localhost:3001/f2e/clear-cookies",{
        mode: 'same-origin',
        redirect: 'follow',
        credentials: 'include'
      })
      .then(res => res.json())
      .then(res=> console.log(res))

  }

  return (
    <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload. test
      </p>

      <div>
        <span>{token ?  '已登入' : '未登入'  }</span>
        <div><span style={{color: 'red'}}>{account}</span></div>
        <div style={{ wordBreak: 'break-all'}}>
          {token}
        </div>
        {token && <div><button onClick={handleResetCookie}> Reset</button></div>}
      </div>
    </header>
  </div>
  )
}


export default HomePage
