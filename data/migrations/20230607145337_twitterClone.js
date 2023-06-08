/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("users", function (table) {
      table.increments("user_id").primary();
      table.string("username").notNullable();
      table.string("password").notNullable();
      table.string("email").notNullable();
      table.string("avatar");
      table.timestamp("created_at").defaultTo(knex.fn.now());
    })
    .createTable("posts", function (table) {
      table.increments("post_id").primary();
      table.integer("user_id").unsigned().notNullable();
      table.foreign("user_id").references("user_id").inTable("users");
      table.text("content").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.integer("likes_count").defaultTo(0);
    })
    .createTable("comments", function (table) {
      table.increments("comment_id").primary();
      table.integer("user_id").unsigned().notNullable();
      table.foreign("user_id").references("user_id").inTable("users");
      table.integer("post_id").unsigned().notNullable();
      table.foreign("post_id").references("post_id").inTable("posts");
      table.text("content").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.integer("likes_count").defaultTo(0);
    })
    .createTable("likes", function (table) {
      table.increments("like_id").primary();
      table.integer("user_id").unsigned().notNullable();
      table.foreign("user_id").references("user_id").inTable("users");
      table.integer("post_id").unsigned();
      table.foreign("post_id").references("post_id").inTable("posts");
      table.integer("comment_id").unsigned();
      table.foreign("comment_id").references("comment_id").inTable("comments");
      table.timestamp("created_at").defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("likes")
    .dropTableIfExists("comments")
    .dropTableIfExists("posts")
    .dropTableIfExists("users");
};
