// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const sharedConfig = {
  client: "sqlite3",
  migrations: { directory: "./data/migrations" },
  seeds: { directory: "./data/seeds" },
  pool: {
    afterCreate: (conn, done) => conn.run("PRAGMA foreign_keys = ON", done),
  },
  useNullAsDefault: true,
};

module.exports = {
  development: {
    ...sharedConfig,
    connection: {
      filename: "./twitterClone.db3",
    },
  },
  testing: {
    ...sharedConfig,
    connection: {
      filename: "./testTwitterClone.db3",
    },
  },
};
