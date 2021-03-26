defmodule EventsSpaWeb.InviteView do
  use EventsSpaWeb, :view
  alias EventsSpaWeb.InviteView

  def render("index.json", %{invites: invites}) do
    %{data: render_many(invites, InviteView, "invite.json")}
  end

  def render("show.json", %{invite: invite}) do
    %{data: render_one(invite, InviteView, "invite.json")}
  end

  def render("invite.json", %{invite: invite}) do
    %{id: invite.id,
      response: invite.response,
      email: invite.email,
      event_id: invite.event_id
      }
  end
end
