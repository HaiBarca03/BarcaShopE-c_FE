import React, { useContext } from 'react'
import './RelatedProducts.css'
import Items from '../Items/Items'
import { ShopContext } from '../../Context/ShopContext'

const RelatedProducts = (props) => {
    const { all_products } = useContext(ShopContext)
    return (
        <div className='relatedproducts'>
            <h1>Related Products</h1>
            <hr />
            <div className='relatedproducts-item'>
                {all_products.map((item, index) => {
                    return <Items key={index} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                })}
            </div>
        </div>
    )
}

export default RelatedProducts
