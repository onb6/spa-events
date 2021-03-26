defmodule EventsSpa.Invites.Invite do
  use Ecto.Schema
  import Ecto.Changeset

  schema "invites" do
    field :response, :integer
    belongs_to :event, EventsSpa.Events.Event
    belongs_to :user, EventsSpa.Users.User, foreign_key: :email, references: :email, type: :string
    

    timestamps()
  end

  @doc false
  def changeset(invite, attrs) do
    invite
    |> cast(attrs, [:response, :email, :event_id])
    |> validate_required([:response, :email, :event_id])
  end
end
