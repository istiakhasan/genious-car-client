import axios from 'axios';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import auth from '../../../firebase.init';
import useServiceDetails from '../../../hooks/useServiceDetail';

const Checkout = () => {
    const {serviceId}=useParams()
    const [service]=useServiceDetails(serviceId);
    const [user]=useAuthState(auth)
    // const [user,setUser]=useState({
    //     name:"Akbar The Great",
    //     email:'akbar@momo.taj',
    //     adress:'Tajmohol Road Md.Pur',
    //     phone:'01711111111'
    // })
    // console.log(service)

    // const handleAddressChange=e=>{
    // const {address,...rest}=user
    // const newAddress=e.target.value 
    // const newUser={...rest,address:newAddress}
    // setUser(newUser)
    // console.log(newUser)
    // }
    const handlePlaceOrder=e=>{
        e.preventDefault();
        const order={
            email:user.email,
            service:service.name, 
            serviceId:serviceId,
            address:e.target.address.value,
            phone:e.target.phone.value
        }

       axios.post('https://calm-basin-90467.herokuapp.com/order',order)
       .then(response=>{
          const {data}=response;
          if(data.insertedId){
              toast('Your order is booked')
              e.target.reset()
          }
       })
    }


  
    return (
        <div className='w-50 mx-auto'>
            <h2>Please Order:{service.name}</h2>
            <form onSubmit={handlePlaceOrder}>
                <ToastContainer />
                <input readOnly disabled value={user?.displayName} className="mb-2 w-100" type="text" name='name' placeholder='name' required />
                <br />
                <input readOnly  value={user?.email} className="mb-2 w-100" type="email" name='email' placeholder='Email' required />
                <br />
                <input className="mb-2 w-100" value={service.name} type="text" name='service' placeholder='Service' required />
                <br />
                <input autoComplete='off'  className="mb-2 w-100" type="text" name='address' placeholder='Address' required />
                <br />
                <input autoComplete='off' className="mb-2 w-100" type="text" name='phone' placeholder='Phone' required />
                <br />
                <input className='btn btn-primary' type="submit" value="Place Order" />
            </form>
        </div> 
    );
};

export default Checkout;