import React, { useState } from 'react';
import { signIn } from '../../services/authService';

const SignIn = () => {

    //State
    const [formData, setFormData] = useState({
        user_name: "",
        password: "",
        confirm_password: "",
    });

    //Functions
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = (e) => {
        const {user_name, password} = formData;
        e.preventDefault();
        signIn({
            user_name: user_name,
            password: password
        });
        setFormData({
            user_name: "",
            password: "",
            confirm_password: "",
        });
    };

    const isFormInvalid = () => {
        const {user_name, password, confirm_password} = formData;
        return !(user_name && password && password === confirm_password);
    };

  return (

    <form onSubmit={handleSubmit} style={{width: "200px"}}>

        <label htmlFor='user_name'>Username: </label>
        <input  type='text' id='user_name' name='user_name' value={formData.user_name} onChange={handleInputChange} required/>

        <label htmlFor='password'>Password: </label>
        <input  type='text' id='password' name='password' value={formData.password} onChange={handleInputChange} required/>

        <label htmlFor='confirm_password'>Confirm Password: </label>
        <input  type='text' id='confirm_password' name='confirm_password' value={formData.confirm_password} onChange={handleInputChange} required/>

        <button type='submit' disabled={isFormInvalid()}>submit</button>

    </form>

  )
}

export default SignIn;