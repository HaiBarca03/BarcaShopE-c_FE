import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';
// import all_products from '../Components/Assets/all_product'

export const ShopContext = createContext(null)

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 1000; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart())
    const [all_products, setAllProduct] = useState([])

    const fetchInfo = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/product/allproduct');
            const result = response.data;

            if (result.success) {
                // Access the 'data' property from the response
                setAllProduct(result.data);
            } else {
                console.error('Failed to fetch products:', result.message);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchInfo();

        const token = localStorage.getItem('auth-token');
        if (token) {
            axios.post('http://localhost:4000/api/cart/gettocart', {}, {
                headers: {
                    'auth-token': token,
                    'Content-Type': 'application/json',
                }
            })
                .then((response) => {
                    setCartItems(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching cart items:', error);
                });
        }
    }, []);

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));

        const token = localStorage.getItem('auth-token');
        if (token) {
            axios.post('http://localhost:4000/api/cart/addtocart', { itemId }, {
                headers: {
                    'auth-token': token,
                    'Content-Type': 'application/json',
                }
            })
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error('Error adding to cart:', error);
                });
        }
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 1) - 1 }));

        const token = localStorage.getItem('auth-token');
        if (token) {
            axios.post('http://localhost:4000/api/cart/removetocart', { itemId }, {
                headers: {
                    'auth-token': token,
                    'Content-Type': 'application/json',
                }
            })
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error('Error removing from cart:', error);
                });
        }
    };


    const sumTotalCart = Object.keys(cartItems).reduce((sum, itemId) => {
        return sum + cartItems[itemId];
    }, 0);

    const getTotalCart = () => {
        let total = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_products.find((product) => product.id === Number(item))
                total += itemInfo.new_price * cartItems[item]
            }
        }
        console.log('total', total)
        return total
    }

    const contextValue = {
        all_products,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCart,
        sumTotalCart
    }
    console.log('cartItems: ', cartItems)
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;