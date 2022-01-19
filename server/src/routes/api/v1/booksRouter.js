import express from "express"
import { Book } from "../../../models/index.js"
import objection from "objection"

import cleanUserInput from "../../../services/cleanUserInput.js"

const {ValidationError} = objection

const booksRouter = new express.Router()

booksRouter.get('/', async (req, res) => {
  // your code here
  try{
    const bookList = await Book.query()
    return res.status(200).json({bookList})
  }catch(err){
    return(res.status(500).json({errors:err}))
  }
})

booksRouter.get('/:id', async (req,res) =>{
  try{
    const book = await Book.query().findById(req.params.id)
    return res.status(200).json({book})
  }catch(err){
    return(res.status(500).json({errors:err}))
  }
})

booksRouter.post('/', async (req,res) =>{
  const formInput = cleanUserInput(req.body)

  try{
    debugger
    //console.log(req.body)
    const book = await Book.query().insertAndFetch(formInput)
    return res.status(201).json({book})
  }catch(err){
    if(err instanceof ValidationError){
      return(res.status(422).json({errors:err.data}))
    }else{
      return(res.status(500).json({errors:err}))
    }
  }
})

export default booksRouter