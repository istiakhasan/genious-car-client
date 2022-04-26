import React from "react";
import { useForm } from "react-hook-form";

const AddService = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
     fetch('https://calm-basin-90467.herokuapp.com/service',{
         method:"POST",
         headers:{'Content-Type':'application/json'},
         body:JSON.stringify(data)
     })
     .then(res=>res.json())
     .then(data=>{
         console.log(data)
     }) 
    
    
    console.log(data)};

  return (
    <div className="w-50 mx-auto">
      <h2 className="text-center">Please add a service</h2>
      <form className="d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
        <input className="mb-2" placeholder="Name" {...register("name", { required: true, maxLength: 20 })} />
        <textarea className="mb-2" placeholder="Description" {...register("description")} />
        <input className="mb-2" placeholder="Price" type="number" {...register("price")} />
        <input className="mb-2" placeholder="Photo Url" type="text" {...register("img")} />
        <input className="mb-2"  type="submit" />
      </form>
    </div>
  );
};

export default AddService;
