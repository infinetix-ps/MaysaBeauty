import { useState } from "react"
import Review from "./review.jsx"
import { Button } from "./ui/button.jsx"

const ReviewList = ({ reviews }) => {
    const [visibleReviews, setVisibleReviews] = useState(3)

    const loadMore = () => {
        setVisibleReviews((prev) => Math.min(prev + 3, reviews.length))
    }

    return (
        <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4 text-[#402e20] dark:text-gray-100">Customer Reviews</h3>
            {reviews.slice(0, visibleReviews).map((review, index) => (
                <Review key={index} review={review} />
            ))}
            {visibleReviews < reviews.length && (
                <Button onClick={loadMore} className="mt-4 bg-[#C17F82] hover:bg-[#A66467] text-white transition-colors">
                    Load More Reviews
                </Button>
            )}
        </div>
    )
}

export default ReviewList

