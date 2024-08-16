import React, { useEffect, useState } from 'react'
import './NewCollection.css'
// import new_collections from '../Assets/new_collections'
import Items from '../Items/Items'

const NewCollection = () => {

    const [new_collections, setNewCollection] = useState([])
    const fetchInfo = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/product/newcollections');
            const result = await response.json();

            if (result.success) {
                // Access the 'data' property from the response
                setNewCollection(result.data);
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
        <div className='new-collections'>
            <h1>NEW COLLECTIONS</h1>
            <hr />
            <div className='collections'>
                {new_collections.map((item, index) => {
                    return <Items key={index} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                })}
            </div>
        </div>
    )
}

export default NewCollection
