import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import Home from './pages/Home';
import { useContext, useEffect,lazy,Suspense } from 'react';
import {AuthContext} from './store/Context'
import {getAuth,onAuthStateChanged} from 'firebase/auth'
import Post from './store/PostContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './components/Loader/loader'

const Login = lazy(()=>import("./pages/Login"))
const Create = lazy(()=>import("./pages/Create"))
const View = lazy(()=>import("./pages/Viewpost"))
const Signup = lazy(()=>import("./pages/Signup"))

function ProtectedRoute({children}){
  const {user} = useContext(AuthContext);
  return user ? children : <Navigate to="/login"/>
}

function App() {
  const {setUser} =useContext(AuthContext)

  useEffect(()=>{
    const auth = getAuth();//is a firebase fun for getting authrntication services 
    const unsubscribe = onAuthStateChanged(auth,(user)=>{ //is a listener fun which monitors chages to the user auth changes 
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