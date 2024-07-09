import React, { createContext } from 'react'
import { createRoot } from 'react-dom/client'
import './app/styles/index.css'
import App from './app/App'
import Store from './app/store/userStore/userStore'
import PostStore from 'app/store/postsStore/postsStore'
import FilesStore from 'app/store/filesStore/filesStore'

export const userStore = new Store()
export const UserContext = createContext(userStore)

export const postStore = new PostStore()
export const PostContext = createContext(postStore)

export const filesStore = new FilesStore()
export const FilesContext = createContext(postStore)

createRoot(document.getElementById('root')).render(
  <FilesContext.Provider value={{ filesStore }}>
    <UserContext.Provider value={{ userStore }}>
      <PostContext.Provider value={{ postStore }}>
        <App />
      </PostContext.Provider>
    </UserContext.Provider>
    ,
  </FilesContext.Provider>,
)
