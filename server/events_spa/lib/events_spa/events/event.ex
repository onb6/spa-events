defmodule EventsSpa.Events.Event do
  use Ecto.Schema
  import Ecto.Changeset

  schema "events" do
    field :date, :date
    field :description, :string
    field :event_name, :string
    field :time, :time

    belongs_to :user, EventsSpa.Users.User
    has_many :comments, EventsSpa.Comments.Comment
    has_many :invites, EventsSpa.Invites.Invite

    field :yes, :integer, virtual: true
    field :no, :integer, virtual: true
    field :maybe, :integer, virtual: true
    field :nr, :integer, virtual: true

    timestamps()
  end

  @doc false
  def changeset(event, attrs) do
    event
    |> cast(attrs, [:event_name, :description, :date, :time, :user_id])
    |> validate_required([:event_name, :description, :date, :time, :user_id])
  end
end
