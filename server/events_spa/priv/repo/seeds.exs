# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     EventsSpa.Repo.insert!(%EventsSpa.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias EventsSpa.Repo
alias EventsSpa.Users.User
alias EventsSpa.Events.Event

defmodule Inject do
   def user(name, email, pass) do
    hash = Argon2.hash_pwd_salt(pass)
    Repo.insert!(%User{name: name, email: email, password_hash: hash})
  end
end

olivia = Inject.user("olivia", "blier.o@northeastern.edu", "test1")
jodi = Inject.user("jodi", "vuong.j@northeastern.edu", "test2")
ryan = Inject.user("ryan", "hart.ry@northeastern.edu", "largepenis")
dan = Inject.user("dan", "brown.dan@northeastern.edu", "password")

date1 = Ecto.Date.cast!("2021-07-15")
date2 = Ecto.Date.cast!("2014-04-17")

time1 = Ecto.Time.cast!("12:00:00")
time2 = Ecto.Time.cast!("18:00:00")

Repo.insert!(%Event{user_id: olivia.id, event_name: "EVENT", description: "Event!", date: date1, time: time1})
Repo.insert!(%Event{user_id: jodi.id, event_name: "EVENT2", description: "Event Jodi!", date: date2, time: time2})