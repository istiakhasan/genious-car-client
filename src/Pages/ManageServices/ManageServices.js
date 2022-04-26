import React from 'react';
import useServices from '../../hooks/useServices';

const ManageServices = () => {
    const [services,setServices]=useServices()
    const handleDelete=(id)=>{
        console.log(id)
        const confirm=window.confirm('Are you sure to delete?')
        if(confirm){
            fetch(`https://calm-basin-90467.herokuapp.com/service/${id}`,{
                method:"DELETE"
            })
            .then(res=>res.json())
            .then(data=>{
                if(data.deletedCount>0){
              const rest=    services.filter(service=>service._id !==id)
              setServices(rest) 
            }
                
                console.log(data)})
        }
    }
    return (
        <div className='w-50 mx-auto'>
            <h2 className='text-center'>Manage your service</h2>
        
                {
                    services.map(service=>(
                        <div key={service._id}>
                            <h5>{service.name} <button onClick={()=>handleDelete(service._id)}>X</button></h5>
                           
                        </div>
                    ))
                }
         
        </div>
    );
};

export default ManageServices;