exports.up = function (knex) {
  return knex.schema.alterTable("comments", function (table) {
    table.dropForeign("post_id");
    table
      .foreign("post_id")
      .references("post_id")
      .inTable("posts")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("comments", function (table) {
    table.dropForeign("post_id");
    table.foreign("post_id").references("post_id").inTable("posts");
  });
};
