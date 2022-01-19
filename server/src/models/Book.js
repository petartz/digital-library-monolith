const Model = require('./Model')
const uniqueFactory = require("objection-unique")


const unique = uniqueFactory({
    fields: ["title"],
    identifiers: ["id"]
})

class Book extends unique(Model){

    static get tableName(){
        return("books")
    }


    static get jsonSchema(){
        return{
            type: "object",
            required: ["title", "author", "pageCount"],
            properties: {
                title: {type:"string", minLength:1, maxLength:20},
                author: {type:"string", minLength:1, maxLength:20},
                pageCount: {type: ["integer","string"]},
                description: {type:"string", minLength:20},
                fiction: {type:"boolean"}
            }

        }


    }

}

module.exports = Book