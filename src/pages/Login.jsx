import React, { useState } from "react"
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import "../styles/login.css"
import { useHistory } from "react-router-dom"
import { useStore, useDispatch, useSelector } from "react-redux"
import * as login from "../redux/login"
import * as authentication from "../redux/authentication"

export default function Login() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [logError = false, setLogError] = useState()
  const store = useStore()
  const dispatch = useDispatch()
  const loginStatus = useSelector((state) => state.login.status)
  const authenticationStatus = useSelector(
    (state) => state.authentication.status
  )
  // const token = useSelector((state) => state.login.token)
  const history = useHistory()

  const handleLogin = async (e) => {
    e.preventDefault()
    if (loginStatus === "pending" || loginStatus === "updating") {
      return
    }
    dispatch(login.fetching())
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
      const data = await response.json()
      dispatch(login.resolved(data.body.token))
    } catch (error) {
      setLogError(true)
      dispatch(login.rejected(error))
      dispatch(login.logout())
    }
  }

  const handleRedirection = async (e) => {
    await handleLogin(e)
    const token = store.getState().login.token
    if (
      authenticationStatus === "pending" ||
      authenticationStatus === "updating"
    ) {
      return
    }
    dispatch(authentication.fetching())

    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer" + token,
          },
        }
      )
      const data = await response.json()
      dispatch(authentication.resolved(data))
      history.push("/profile")
    } catch (error) {
      dispatch(authentication.rejected(error))
      dispatch(authentication.logout())
    }
  }

  return (
    <>
      <Nav />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button
              className="sign-in-button"
              onClick={(e) => handleRedirection(e)}
            >
              Sign In
            </button>
          </form>
          {logError ? (
            <div className="sign-in-error-msg">
              Identifiant ou mot de passe incorrect
            </div>
          ) : null}
        </section>
      </main>
      <Footer />
    </>
  )
}
