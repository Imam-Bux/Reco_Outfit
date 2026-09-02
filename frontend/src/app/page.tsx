import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import WhyChooseUs from './components/WhyChooseUs'
import GarmentCategories from './components/GarmentCategories'
import Banner from './components/Banner'
import Testimonials from './components/Testimonials'
import About from './components/About'
import Footer from './components/Footer'
export default function page() {
  return (
    <div>
      <Navbar></Navbar>
      <Hero></Hero>
      <HowItWorks></HowItWorks>
      <WhyChooseUs></WhyChooseUs> 
      <GarmentCategories></GarmentCategories>
      <Banner></Banner>
      <Testimonials></Testimonials>
      <About></About>
      <Footer></Footer>
    </div>
  )
}
