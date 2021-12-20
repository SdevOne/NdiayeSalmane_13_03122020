import React from "react"
import Nav from "../components/Nav"
import Banner from "../components/Banner"
import Features from "../components/Features"
import Footer from "../components/Footer"

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Banner />
        <Features />
      </main>

      <Footer />
    </>
  )
}
