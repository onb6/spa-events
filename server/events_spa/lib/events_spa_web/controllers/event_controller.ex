defmodule EventsSpaWeb.EventController do
  use EventsSpaWeb, :controller

  alias EventsSpa.Events
  alias EventsSpa.Events.Event

  alias EventsSpaWeb.Plugs
  plug Plugs.RequireAuth when action
   in [:create]


  plug :require_owner when action in [:edit, :update, :delete]


  action_fallback EventsSpaWeb.FallbackController

  def index(conn, _params) do
    events = Events.list_events()
    |> Enum.map(fn e -> Events.load_users(e) end)
    render(conn, "index.json", events: events)
  end

  def create(conn, %{"event" => event_params}) do
    user = conn.assigns[:current_user]
    event_params = event_params
    |> Map.put("user_id", user.id)
    
    IO.inspect({:event, event_params})

    with {:ok, %Event{} = event} <- Events.create_event(event_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.event_path(conn, :show, event))
      |> render("show.json", event: event)
    end
  end

  def show(conn, %{"id" => id}) do
    #event = conn.assigns[:event]
    event = Events.get_event!(id)
    |> Events.load_invites()
    |> Events.load_responses()

    render(conn, "show.json", event: event)
  end

  def update(conn, %{"id" => id, "event" => event_params}) do
    event = Events.get_event!(id)

    with {:ok, %Event{} = event} <- Events.update_event(event, event_params) do
      render(conn, "show.json", event: event)
    end
  end

  def delete(conn, %{"id" => id}) do
    event = Events.get_event!(id)

    with {:ok, %Event{}} <- Events.delete_event(event) do
      send_resp(conn, :no_content, "")
    end
  end

  # From lecture notes
  def require_owner(conn, _args) do
    user = conn.assigns[:current_user]
    event = conn.assigns[:event]

    if user.id == event.user_id do
      conn
    else
      conn
      |> put_flash(:error, "Not your event!")
      |> redirect(to: Routes.page_path(conn, :index))
      |> halt()
    end
  end
end
