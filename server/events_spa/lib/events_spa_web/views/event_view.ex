defmodule EventsSpaWeb.EventView do
  use EventsSpaWeb, :view
  alias EventsSpaWeb.EventView
  alias EventsSpaWeb.UserView

  def render("index.json", %{events: events}) do
    %{data: render_many(events, EventView, "event.json")}
  end

  def render("show.json", %{event: event}) do
    %{data: render_one(event, EventView, "event.json")}
  end

  def render("event.json", %{event: event}) do
  #   #from lecture notes
  #   user = if Ecto.assoc_loaded?(event.user) do
  #     render_one(event.user, UserView, "user.json")
  #   else
  #     nil
  #   end

    %{
      id: event.id,
      event_name: event.event_name,
      description: event.description,
      date: event.date,
      time: event.time,
      user_id: event.user_id,
      yes: event.yes,
      no: event.no,
      maybe: event.maybe,
      nr: event.nr,
    }
  end
end
