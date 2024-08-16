import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DescriptionBox.css';

const DescriptionBox = ({ productId, product }) => {
    // const { product } = props
    const [currentSection, setCurrentSection] = useState('description');
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:4000/api/comment/${productId}`)
            .then(response => setReviews(response.data))
            .catch(error => console.error(error));
    }, [productId]);

    const handleAddReview = () => {
        const token = localStorage.getItem('auth-token');
        if (token) {
            axios.post('http://localhost:4000/api/comment/addcomment', {
                productId,
                author: 'Anonymous',
                content: newReview
            },
                {
                    headers: {
                        'auth-token': token
                    }
                })
                .then(response => {
                    setReviews([response.data, ...reviews]);
                    setNewReview('');
                })
                .catch(error => console.error(error));
        } else {
            alert('Please login now !')
        }
    };

    return (
        <div className='descriptionbox'>
            <div className="descriptionbox-navigator">
                <div
                    className={`descriptionbox-nav-box ${currentSection === 'description' ? 'active' : ''}`}
                    onClick={() => setCurrentSection('description')}
                >
                    Description
                </div>
                <div
                    className={`descriptionbox-nav-box ${currentSection === 'reviews' ? 'active' : 'fade'}`}
                    onClick={() => setCurrentSection('reviews')}
                >
                    Reviews ({reviews.length})
                </div>
            </div>
            <div className="descriptionbox-content">
                {currentSection === 'description' && (
                    <div className="descriptionbox-description">
                        {/* Description content here */}
                        <p>{product.description}</p>
                    </div>
                )}
                {currentSection === 'reviews' && (
                    <div className="descriptionbox-reviews">
                        {reviews.length > 0 ? (
                            reviews.map(comment => (
                                <div key={comment._id} className="comment">
                                    <p><strong>{comment.author}</strong>: {comment.content}</p>
                                    <p><small>{new Date(comment.createdAt).toLocaleString()}</small></p>
                                </div>
                            ))
                        ) : (
                            <p>No reviews yet. Be the first to leave a review!</p>
                        )}
                        <div className="add-review">
                            <textarea
                                value={newReview}
                                onChange={(e) => setNewReview(e.target.value)}
                                placeholder="Write your review here..."
                            />
                            <button onClick={handleAddReview}>Submit Review</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DescriptionBox;
