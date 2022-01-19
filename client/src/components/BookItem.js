import React from "react"
import { Link } from "react-router-dom"

const BookItem = (props) => {
  const { author, title, id } = props.book
  return (
    <li><Link to={`/books/${id}`}>{title} by {author}</Link></li>
  )
}

export default BookItem