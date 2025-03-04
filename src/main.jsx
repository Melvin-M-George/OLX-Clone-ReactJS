import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FirebaseContext } from './store/Context.jsx'
import Context from './store/Context.jsx'
import { auth, db, storage ,firebase} from './firebase/config.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FirebaseContext.Provider value={{auth,db,storage,firebase}}>
    <Context>
          <App />
    </Context>
    </FirebaseContext.Provider>
  </StrictMode>,
)
