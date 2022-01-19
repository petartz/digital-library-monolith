import React, { useState, useEffect } from "react"

const BookShow = (props) => {
  const [book, setBook] = useState({})

  const getBook = async () => {
    try {
      const bookId = props.match.params.id
      const response = await fetch(`/api/v1/books/${bookId}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const responseBody = await response.json()
      setBook(responseBody.book)
    } catch(err) {
      console.error(`Error in Fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    getBook()
  }, [])
  
  let descriptionSection
  if(book.description) {
    descriptionSection = <p>{book.description}</p>
  }

  let fictionSection
  if(book.fiction == true) {
    fictionSection = <p><em>This book is fictional.</em></p>
  }

  return (
    <>
      <h1>{book.title}</h1>
      <h2>{book.author}</h2>
      <h3>{book.pageCount} pages</h3>
      {descriptionSection}
      {fictionSection}
    </>
  )
}

export default BookShow