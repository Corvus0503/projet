import './App.css';
import MainLayout from './components/layouts/MainLayout';
import Login from './pages/login/login';
import { useEffect, useState } from 'react';
import AuthProvider from './routes/authProvider';
//import Routes from './components/routes/routeIdex';
import { Route, Routes } from 'react-router-dom';
//import Routes from './components/routes/routeIdex';
import SideNav from './components/navigation/sidebar';
import { ProtectedRoute } from './routes/protectedRoute';
import Signup from './pages/login/Signup';
import UserList from './pages/user/UserList';
import ModUser from './pages/user/modUser';
import Profile from './pages/login/Profile';
import Comments from './pages/notification/Comments';
import MainDash from './pages/cliaentPage/MainDash';
import ProduitsList from './pages/produit/ProductList';
import OrderList from './pages/order/OrderList';
import Dashboard from './pages/dashboard/Dashboard';

// import io from "socket.io-client";

function App() {
  const [IsOpen, setIsOpen] = useState (true)
  const [isConn, setIsConn] = useState(false)
  const [comments, setComments] = useState([]);
  const togleSidebar = () => setIsOpen(!IsOpen)

  const [IsOpenNot, setIsOpenNot] = useState (false)
  const togleNot = () => setIsOpenNot(!IsOpenNot)

  const saveCon = () =>{
    sessionStorage.setItem("con", isConn)
  }
  const getCon = () =>{
    return sessionStorage.getItem("con")
  }
  const deconexion = () =>{
      sessionStorage.removeItem("con")
  }
  const [user, setUser] = useState([{
    id: "",
    usernama: "",
    password: "",
    type: ""
}])

    
  useEffect(() => {
    setIsConn(getCon())
    const tokenString = localStorage.getItem('token');
    setUser(JSON.parse(tokenString))
  
    
  }, [])


//  console.log(user)
 console.log(comments)

  return (
    <MainLayout isOpen={IsOpen}>
      <AuthProvider>
        {isConn && <SideNav user={user} deconexion={deconexion} IsOpen={IsOpen} setIsOpen={setIsOpen} togleSidebar={togleSidebar} comments={comments} togleNot={togleNot} />}
        {isConn && <Comments comments={comments} setComments={setComments} user={user} IsOpenNot={IsOpenNot} togleNot={togleNot} />}
          <Routes>
            <Route index element={<Login 
              isConn={isConn} setIsConn={setIsConn} saveCon={saveCon}
              user={user} setUser={setUser} getCon={getCon} 
            />} />
            <Route
              path="/login"
              element={<Login isConn={isConn} setIsConn={setIsConn} saveCon={saveCon}
              user={user} setUser={setUser} getCon={getCon} />}
            />
            <Route path="/Main" element={<MainDash />} />
            <Route element={<ProtectedRoute user={user} perm={true}/>}>
              
              <Route path="/Profile" element={<Profile user={user} />} />
              <Route path="/Comments" element={<Comments comments={comments} setComments={setComments} user={user} IsOpenNot={IsOpenNot} />} />
              <Route element={<ProtectedRoute redirectPath="/Dashboard" user={user} perm={'admin'}/>}>
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/Signup" element={<Signup />} />
                <Route path="/UserList" element={<UserList />} />
                <Route path="/Produit" element={<ProduitsList />} />
                <Route path="/Commande" element={<OrderList />} />
                <Route path="/ModUser" element={<ModUser />} />
              </Route>
            </Route>
            <Route path="/*" element={<p>There's nothing here: 404!</p>} />
          </Routes>
        
      </AuthProvider>
    </MainLayout>
    
      
   );
   
}

export default App;