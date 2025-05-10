import { useState } from "react"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { Star } from "lucide-react"

const ReviewForm = ({ productId, onSubmit }) => {
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit({ productId, rating, review })
        setRating(0)
        setReview("")
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Rating</label>
                <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none">
                            <Star
                                size={24}
                                className={`${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} cursor-pointer`}
                            />
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <label htmlFor="review" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Review
                </label>
                <Textarea
                    id="review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    rows={4}
                    placeholder="Write your review here..."
                    className="w-full"
                />
            </div>
            <Button type="submit" className="bg-[#C17F82] hover:bg-[#A66467] text-white">
                Submit Review
            </Button>
        </form>
    )
}

export default ReviewForm

