/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.alterTable('books', function(table) {
        table.unique('title')
    })

};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
    return knex.schema.alterTable('books', (table) =>{
        table.dropUnique('title')
    })
};