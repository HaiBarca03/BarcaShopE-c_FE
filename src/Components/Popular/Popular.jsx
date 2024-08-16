import React, { useEffect, useState } from 'react'
import './Popular.css'
// import data_product from '../Assets/data'
import Items from '../Items/Items'

const Popular = () => {
    const [popularwomen, setPopularwomen] = useState([])
    const fetchInfo = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/product/popularwomen');
            const result = await response.json();

            if (result.success) {
                // Access the 'data' property from the response
                setPopularwomen(result.data);
            } else {
                console.error('Failed to fetch products:', result.message);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchInfo()
    }, [])
    return (
        <div className='popular'>
            <h1>POPULAR IN WOMEN</h1>
            <hr />
            <div className="popular-item">
                {popularwomen.map((item, index) => {
                    return <Items key={index} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                })}
            </div>
        </div>
    )
}

export default Popular
