import axios from 'axios';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';

const Order = () => {
    const [user]=useAuthState(auth)
    const [orders,setOrders]=useState([]);
    const navigate=useNavigate()
    useEffect(()=>{
        const getOrders= async()=>{
            const email=user.email;
            const url=`https://calm-basin-90467.herokuapp.com/order?email=${email}`
            try{
                const {data}=    await axios.get(url,{
                    headers:{
                        authorization:`Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                setOrders(data)
            }
            catch(error){
              console.log(error.message)
              if(error.response.status===401 || error.response.status===403){
              navigate('/login')
              signOut(auth)
              }
            }
          
        }
        getOrders();
    },[user])
    return (
        <div>
            <h2>Your Orders:{orders.length}</h2>
        </div>
    );
};

export default Order;