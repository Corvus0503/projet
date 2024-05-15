import React from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';
import SideUser from "../images/SideUser";
import NewspaperIcon from '@mui/icons-material/Newspaper';
import SideValid from "../images/SideValid";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../routes/authProvider";
import '../styles/sidebar.css'
import SellIcon from '@mui/icons-material/Sell';
import Topnav from "./Topnav";
import { useNavigate } from "react-router-dom";
import SubMenu from "./SubMenu";
import Swal from 'sweetalert2'

const SideNav = ({IsOpen, togleSidebar, deconexion, user, comments, togleNot}) =>{
    const navigate = useNavigate();
    const { setToken } = useAuth();
const [lien] = useState([
    {name : 'Dashboard', icon: <DashboardIcon/>, lien: "/Dashboard"},
    {name : 'Prevision', icon: <NewspaperIcon/>, lien: "/Prevision"},
    {name: 'Besoin',icon: <SideValid/>, lien:"/Besoin" }
])

const [lienAdmin] = useState([
    {name : 'Dashboard', icon: <DashboardIcon/>, lien: "/Dashboard"},
    {name : 'Produit',icon: <NewspaperIcon/>, lien: "/Produit"},
    {name : 'Utilistaeurs', icon: <SideUser/>,  lien:"/UserList"}
])

const lienPerm = () =>{
    if(user.type==="User"){
        return(
            lien.map((item, index)=>{
                return(<SubMenu item={item} key={index} IsOpen={IsOpen}/>)
            })
        )
    } else if(user.type==="admin"){
        return(
            lienAdmin.map((item, index)=>{
                return(<SubMenu item={item} key={index} IsOpen={IsOpen}/>)
            })
        )
    } 
}

const logout = () => {
    deconexion()
    setToken();
    navigate("/");
    localStorage.removeItem("token")
    window.location.reload()
}

const handleLogout = () =>{
    Swal.fire({
        title: 'Deconexion',
        text: "Voulez vous vraimentn vous deconnecter ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Annuler',
        confirmButtonText: 'Deconnection'
      }).then((result) => {
        if (result.isConfirmed) {
            logout()
          
        }
      })
  
}

return(
    <>
        <Topnav togleSidebar={togleSidebar} user={user} IsOpen={IsOpen} logout={handleLogout} comments={comments} togleNot={togleNot}/>
        <aside className={`sidebar ${IsOpen ? "open" : ""}`}>
            <nav>
                <br/><br/><br/><br/><br/>
                {lienPerm()}
            </nav>
        </aside>
    </>
)
}

export default SideNav