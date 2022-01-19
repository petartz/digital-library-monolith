import React, { useState } from "react"
import { Redirect } from "react-router-dom"

import ErrorList from "./ErrorList"
import translateServerErrors from "../services/translateServerErrors"

const BookForm = (props) => {
  const [bookRecord, setBookRecord] = useState({
    title: "",
    author: "",
    description: "",
    pageCount: "",
    fiction: false
  })
  const [errors, setErrors] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const addNewBook = async () => {
    try {
      const response = await fetch("/api/v1/books", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(bookRecord)
      })
      if (!response.ok) {
        if(response.status === 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw(error)
        }
      } else {
        const body = await response.json()
        console.log("Posted successfully!", body);
        setShouldRedirect(true)
      }
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  const handleChange = (event) => {
    const targetInput = event.currentTarget
    let value

    if (targetInput.type === "checkbox") {
      value = targetInput.checked
    } else {
      value = targetInput.value
    }

    setBookRecord({
      ...bookRecord,
      [event.currentTarget.name]: value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    addNewBook()
  }

  if (shouldRedirect) {
    return <Redirect push to="/books" />
  }
  //console.log(errors);

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add a New Book</h1>
      <ErrorList errors={errors} />
      <label htmlFor="title">Title
        <input
          id="title"
          type="text"
          name="title"
          onChange={handleChange}
          value={bookRecord.title}
        />
      </label>

      <label htmlFor="author">Author
        <input
          id="author"
          type="text"
          name="author"
          onChange={handleChange}
          value={bookRecord.author}
        />
      </label>

      <label htmlFor="pageCount">Page Count
        <input
          id="pageCount"
          type="number"
          name="pageCount"
          onChange={handleChange}
          value={bookRecord.pageCount}
        />
      </label>

      <label htmlFor="description">Description
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          value={bookRecord.description}
        />
      </label>

      <label htmlFor="fiction">Fiction?
        <input
          id="fiction"
          type="checkbox"
          name="fiction"
          onChange={handleChange}
          value={bookRecord.fiction}
        />
      </label>

      <input type="submit" value="Add this Book" />
    </form>
  )
}

export default BookForm