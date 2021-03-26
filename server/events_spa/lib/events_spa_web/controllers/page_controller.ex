defmodule EventsSpaWeb.PageController do
  use EventsSpaWeb, :controller

  def index(conn, _params) do
    events = EventsSpa.Events.list_events()
    render(conn, "index.html", events: events)
  end
end
