import React, { useEffect, useState } from 'react'

const AuthContext = React.createContext({
  token: '',
  email: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
})

export const AuthContextProvider = (props) => {
  const temp = localStorage.getItem('details')
  const initDetails = JSON.parse(temp)
  let x, y
  if (!initDetails) {
    y = ''
    x = ''
  } else {
    x = initDetails.token
    // console.log(x)
    y = initDetails.mail
    // console.log(y)
  }
  const [token, setToken] = useState(x)
  const [email, setEmail] = useState(y)

  const userIsLoggedIn = !!token // if token exists 

  const loginHandler = (token, mail) => {
    let tmp1 = mail.split('@')[0]
    let tmp2 = mail.split('@')[1]
    let tmp3 = tmp2.split('.')[0]
    let tmp4 = tmp2.split('.')[1]
    let finalMail = tmp1 + tmp3 + tmp4
    console.log(finalMail)
    setEmail(finalMail)
    setToken(token)
    const details = {
      token: token,
      mail: finalMail,
    }
    localStorage.setItem('details', JSON.stringify(details))
  }

  const logoutHandler = () => {
    // console.log(token)
    setToken(null)
    // console.log(token)
    localStorage.removeItem('details')
  }

  const contextValue = {
    token: token,
    email: email,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  }



  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext