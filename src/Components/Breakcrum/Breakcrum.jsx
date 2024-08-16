import React from 'react'
import './Breakcrum.css'
import arrow_icon from '../Assets/breadcrum_arrow.png'

const Breakcrum = (props) => {
    const { product } = props
    return (
        <div className='breakcrum'>
            HOME <img src={arrow_icon} alt="" />
            SHOP <img src={arrow_icon} alt="" />
            {product.category} <img src={arrow_icon} alt="" />
            {product.name}
        </div>
    )
}

export default Breakcrum
