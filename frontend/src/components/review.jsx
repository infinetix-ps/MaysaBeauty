import StarRating from "./starRating.jsx"

const Review = ({ review }) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 py-4">
      <div className="flex items-center mb-2">
        <StarRating rating={review.rating} size={16} />
        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{review.author}</span>
      </div>
      <p className="text-gray-800 dark:text-gray-200">{review.text}</p>
    </div>
  )
}

export default Review

