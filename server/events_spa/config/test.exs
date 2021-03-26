use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :events_spa, EventsSpaWeb.Endpoint,
  http: [port: 4002],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :events_spa, EventsSpa.Repo,
  username: "events_spa",
  password: "qEt6NVnrjXPa",
  database: "events_spa_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
