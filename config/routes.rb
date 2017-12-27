Rails.application.routes.draw do
  devise_for :users #sign_upとsign_inとかはこちらかな？
  root 'groups#index' #初めは'messages#index'だった
  resources :users, only: [:index, :edit, :update]  #ログインユーザーの編集＆更新
  resources :groups, only: [:index, :new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]  #groupsのデータを引っ張れる？
  end
end
