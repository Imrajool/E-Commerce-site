

export default function ProductReview({reviews}){
    return (
        <div className="reviews w-75">
            <h3>Other's Reviews:</h3>
            <hr />
            {reviews && reviews.map(review => (
            <div className="review-card my-3">
                <div className="rating-outer">
                    <div className="rating-inner" style={{width:`${review.rating/5*100}%`}}></div>
                </div>
                <p className="review_user">{review.user.name}</p>
                <p className="review_comment">{review.comment}</p>

                <hr />
            </div>
            ))}
        </div>
    )
}