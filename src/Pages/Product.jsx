import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom'
import Breakcrum from '../Components/Breakcrum/Breakcrum'
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay'
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox'
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts'

const Product = () => {
    const { all_products } = useContext(ShopContext)
    const { productId } = useParams()
    const product = all_products.find((e) => e.id === Number(productId))
    return (
        <div>
            <Breakcrum product={product} />
            <ProductDisplay product={product} />
            <DescriptionBox product={product} productId={productId} />
            <RelatedProducts />
        </div>
    )
}

export default Product
