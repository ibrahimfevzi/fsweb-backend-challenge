/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .table("posts", function (table) {
      table.integer("likes_count").defaultTo(0);
    })
    .table("comments", function (table) {
      table.integer("likes_count").defaultTo(0);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .table("posts", function (table) {
      table.dropColumn("likes_count");
    })
    .table("comments", function (table) {
      table.dropColumn("likes_count");
    });
};
