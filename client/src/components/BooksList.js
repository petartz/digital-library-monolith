import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import BookItem from "./BookItem"

const BooksList = (props) => {
  const [books, setBooks] = useState([])

  const getBooks = async () => {
    try {
      const response = await fetch("/api/v1/books")
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const responseBody = await response.json()
      setBooks(responseBody.bookList)
    } catch(err) {
      console.error(`Error in Fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    getBooks()
  }, [])

  const bookItems = books.map((book) => {
    return (
      <BookItem
        key={book.id}
        book={book}
      />
    )
  })

  return (
    <div>
      <h1>My Book Wishlist</h1>
      <ul className="books">
        {bookItems}
      </ul>
      <Link to="/books/new">Add New Book</Link>
    </div>
  )
}

export default BooksList
