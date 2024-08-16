import React from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Offer from '../Components/Offer/Offer'
import NewCollection from '../Components/NewCollection/NewCollection'
import NewLetter from '../Components/NewLetter/NewLetter'

const Shop = () => {
    return (
        <div>
            <Hero />
            <Popular />
            <Offer />
            <NewCollection />
            <NewLetter />
        </div>
    )
}

export default Shop
