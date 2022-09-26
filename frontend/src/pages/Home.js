import React from 'react'
import logo from '../logo.svg';
import '../App.css';
import jwt_decode from 'jwt-decode'
import useLocalStorage from '../hooks/use-local-storage'
import { useSearchParams } from 'react-router-dom'
import Cookies from 'universal-cookie';

const cookies = new Cookies();


const HomePage = () => {

  let [searchParams, setSearchParams] = useSearchParams();
  // const [token, setToken] = useLocalStorage('logt', '')
  const [token, setToken] = React.useState(cookies.get('logt') || '')
  const [account, setAccount] = React.useState('')

  const resetTokenAndInfo = () => {
    setToken('')
    setAccount('')
  }

  // NOTE: 網頁已登入過，localStorage 有值
  React.useEffect(() => {
    if(!token) return

    console.log(token)
    try {
      const decoded = jwt_decode(token)
      console.log(decoded)
      const isTokenExpired = new Date(decoded.exp * 1000) < new Date()
      if (isTokenExpired || !decoded?.account || !decoded?.lang || !decoded?.uid) {
        resetTokenAndInfo()
        return
      }

      setAccount(decoded.account)
    } catch (error) {
      console.warn('token is not a JWT ')
      resetTokenAndInfo()
      return
    }

  }, [token])

    // React.useEffect(() => {
  //   console.log(searchParams)
  //   const needToCall = searchParams.get('needToCall')
  //   console.log(`needToCall: ${needToCall}`)
  //   console.log(typeof needToCall)

  //   if(needToCall === '1') fetchApi()

  //   async function fetchApi() {
  //     const res = await fetch("/f2e/get-cookies",{
  //       mode: 'same-origin',
  //       redirect: 'follow',
  //       credentials: 'include'
  //     }).then(res => res.json())

  //     if(res.token) {
  //       try {
  //         try {
  //           const decoded = jwt_decode(res.token)
  //           console.log(decoded)

  //           const isTokenExpired = new Date(decoded.exp * 1000) < new Date()
  //           if (isTokenExpired || !decoded?.account || !decoded?.lang || !decoded?.uid) return

  //           setToken(res.token )
  //           setAccount(decoded.account)


  //         } catch (error) {
  //           console.warn('token is not a JWT ')
  //           return
  //         }
  //       } catch (error) {

  //       }
  //     }else {
  //       setToken('')
  //       setAccount('')
  //     }

  //     // TODO 這邊再把 url 上的 query params 清空


  //   }
  // }, [searchParams])

  // React.useEffect(() => {
  //   console.log(cookies.get('token'))

  // }, [])



  const handleResetCookie = async () => {

    cookies.remove('logt')
    console.log('resetTokenAndInfo')
    resetTokenAndInfo()



    // fetch("http://localhost:3001/f2e/clear-cookies",{
    //     mode: 'same-origin',
    //     redirect: 'follow',
    //     credentials: 'include'
    //   })
    //   .then(res => res.json())
    //   .then(res=> console.log(res))
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
        {token && <div><button onClick={handleResetCookie}> 登出(清除前端 Cookie )</button></div>}
      </div>
    </header>
  </div>
  )
}


export default HomePage
