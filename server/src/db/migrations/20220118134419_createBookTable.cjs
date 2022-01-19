/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable('books', (table) =>{
        table.bigIncrements("id")
        table.string("title").notNullable()
        table.string("author").notNullable()
        table.integer("pageCount").notNullable()
        table.string("description")
        table.boolean("fiction")


        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())

    })
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
    return knex.schema.dropTableIfExists('books')
};