import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import { useContext, useEffect,lazy,Suspense } from 'react';
import {AuthContext} from './store/Context'
import {getAuth,onAuthStateChanged} from 'firebase/auth'
import Post from './store/PostContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './components/Loader/loader'


const Login = lazy(()=>import("./Pages/Login"))
const Create = lazy(()=>import("./Pages/Create"))
const View = lazy(()=>import("./Pages/ViewPost"))
const Signup = lazy(()=>import("./Pages/Signup"))

function ProtectedRoute({children}){
  const {user} = useContext(AuthContext);
  return user ? children : <Navigate to="/login"/>
}

function App() {
  const {setUser} =useContext(AuthContext)

  useEffect(()=>{
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth,(user)=>{  
      setUser(user);
    })
    return ()=>unsubscribe();
  },[])
  return (
    <Post>
    <Router>
      <ToastContainer/>
      <Suspense fallback={<Loader/>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/signup' element={<Signup />}/> 
        <Route path='/login' element={<Login />}/> 
        <Route path='/sell' element={<ProtectedRoute><Create /></ProtectedRoute>}/> 
        <Route path='/view' element={<ProtectedRoute><View /></ProtectedRoute>}/>
      </Routes>
      </Suspense>
    </Router>
    </Post>
  );
}

export default App;