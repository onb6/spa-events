defmodule EventsSpa.Events do
  @moduledoc """
  The Events context.
  """

  import Ecto.Query, warn: false
  alias EventsSpa.Repo

  alias EventsSpa.Events.Event

  @doc """
  Returns the list of events.

  ## Examples

      iex> list_events()
      [%Event{}, ...]

  """
  def list_events do
    Repo.all(Event)
  end

  @doc """
  Gets a single event.

  Raises `Ecto.NoResultsError` if the Event does not exist.

  ## Examples

      iex> get_event!(123)
      %Event{}

      iex> get_event!(456)
      ** (Ecto.NoResultsError)

  """
  def get_event!(id), do: Repo.get!(Event, id)

  @doc """
  Creates a event.

  ## Examples

      iex> create_event(%{field: value})
      {:ok, %Event{}}

      iex> create_event(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_event(attrs \\ %{}) do
    %Event{}
    |> Event.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a event.

  ## Examples

      iex> update_event(event, %{field: new_value})
      {:ok, %Event{}}

      iex> update_event(event, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_event(%Event{} = event, attrs) do
    event
    |> Event.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a event.

  ## Examples

      iex> delete_event(event)
      {:ok, %Event{}}

      iex> delete_event(event)
      {:error, %Ecto.Changeset{}}

  """
  def delete_event(%Event{} = event) do
    Repo.delete(event)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking event changes.

  ## Examples

      iex> change_event(event)
      %Ecto.Changeset{source: %Event{}}

  """
  def change_event(%Event{} = event) do
    Event.changeset(event, %{})
  end

  def list_events do
    Repo.all(Event)
    |> Repo.preload(:user)
  end

  def get_event!(id) do
    Repo.get!(Event, id)
    |> Repo.preload(:user)
  end

  def load_users(%Event{} = event) do
    Repo.preload(event, :user)
  end

  def load_invites(%Event{} = event) do
    Repo.preload(event, :invites)
  end

  def load_responses(%Event{} = event) do 
    yes = event.invites
    |> Enum.filter(fn i -> i.response == 1 end) 
    |> Enum.count()
    maybe = event.invites
    |> Enum.filter(fn i -> i.response == 2 end) 
    |> Enum.count()
    no = event.invites
    |> Enum.filter(fn i -> i.response == 0 end) 
    |> Enum.count()
    nr = event.invites
    |> Enum.filter(fn i -> i.response == -1 end) 
    |> Enum.count()
    %{ event | yes: yes, no: no, maybe: maybe, nr: nr}
  end
end
