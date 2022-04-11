import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import api from '../services/api';
export  function TopBarAdmin(){
    const { logout,auth} = useAuth();
    const [user, setUser] = useState(null);



    // useEffect(() => {
    //     function capitalizeString(string) { 
    //         let result = string[0].toUpperCase() +  
    //           string.slice(1).toLowerCase(); 
    //           return result;
    //       } 
    //      async function UserGet(){
    //         try {
    //             const { data } = await api.getUser(auth);
    //             let name = capitalizeString(data.name);
    //             console.log(name);
                
    //             setUser({...data,name});

    //         }
    //         catch (error) { console.log(error);}
    //     }
    //     UserGet()
    // },[auth])

    const navigate =useNavigate();
    function sair(){
        logout();
        navigate('/');
    }
    return(
        <Container>
            <div className="topbar__logo">
                <p>ProduApp</p>
            </div>
            <div className="topbar__menu">
                    <span onClick={()=>navigate('/admin/home')}>Home</span>
                    <span onClick={()=>navigate('/user')}>Perfil</span>
                    <span onClick={sair}>Logout</span>
            </div>
        </Container>
    )
}

const Container = styled.div`
padding:10px 15px ;
position: fixed;
display: flex;
align-items: center;
justify-content: space-between;
top: 0;
width: 100%;
background: #7E7E7E;

p{
    color: #fff;
    font-size: 30px;
}
span{
    cursor: pointer;
    color:#fff;
    margin-left: 10px;
}

`