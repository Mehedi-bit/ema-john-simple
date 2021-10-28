import React from 'react';
import { useForm } from 'react-hook-form';
import { useContext } from 'react/cjs/react.development';
import { UserContext } from '../../App';
import './Shipment.css';

const Shipment = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const onSubmit = data => {
      console.log("form submitted", data);
    };

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="ship-form">

      <input defaultValue={loggedInUser.name} {...register("name", { required: true })} placeholder="Your name" />
      {errors.name && <span className="error">Name is required</span>}

      <input defaultValue={loggedInUser.email} {...register("email", { required: true })} placeholder="Your Email" />
      {errors.email && <span className="error">Email is required</span>}

      <input {...register("address", { required: true })} placeholder="Your Address" />
      {errors.address && <span className="error">Address is required</span>}

      <input {...register("phone", { required: true })} placeholder="Your Phone number" />
      {errors.phone && <span className="error">Phone number is required</span>}

      <input type="submit" />
    </form>
  );
};

export default Shipment;