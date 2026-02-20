import React from 'react'
import Hero from "../components/Landing/Hero"
import Features from '../components/Landing/Features'
import Testimonials from '../components/Landing/Testimonials'
import FAQ from '../components/Landing/FAQ'
import Footer from '../components/Landing/Fotter'

const GetStarted = () => {
  return (
    <div>
      <Hero />
      <Features />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  )
}

export default GetStarted