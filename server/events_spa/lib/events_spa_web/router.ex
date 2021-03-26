defmodule EventsSpaWeb.Router do
  use EventsSpaWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", EventsSpaWeb do
    pipe_through :browser

    get "/", PageController, :index
  end

  # Other scopes may use custom stacks.
  scope "/api/v1", EventsSpaWeb do
     pipe_through :api

     resources "/users", UserController, except: [:new, :edit]
     resources "/events", EventController, except: [:new, :edit]
     resources "/comments", CommentController, except: [:new, :edit]
     resources "/invites", InviteController, except: [:new, :edit]
     resources "/session", SessionController, only: [:create]

   end
end
