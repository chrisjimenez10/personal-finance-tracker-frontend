import React, { useState} from 'react';
import { signUp } from '../../services/authService';

const SignUp = () => {

    //State
    const [formData, setFormData] = useState({
        user_name: "",
        password: "",
        confirm_password: "",
    });
    const [error, setError] = useState(null);

    //Functions
    const handleSignUp = async (userData) => {
        try{
            await signUp(userData);
        }catch(error){
            setError(error.message);
        }
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = (e) => {
        const {user_name, password} = formData;
        e.preventDefault();
        handleSignUp({
            user_name: user_name,
            password: password
        });
        setFormData({
            user_name: "",
            password: "",
            confirm_password: "",
        });
    };

    setTimeout(()=>{
        setError(null);
    }, 10000);

    const isFormInvalid = () => {
        const {user_name, password, confirm_password} = formData;
        //Logic using the ampersand that checks for truthiness of values --> We are checking that both user_name and password EXIST (not empty) and that password value is equal to confirm_password, in order for submit button to ENABLE --> Since we use the "disabled" attribute of the submit button, we use the bang (!) operator outside of this logic, so if ANY of the insdie conditions are FALSE it converts to TRUE, which sets the "disabled" attribute to TRUE as well (since we return the boolean value)
        return !(user_name && password && password === confirm_password);
    };

  return (
    <>

        <form onSubmit={handleSubmit} style={{width: "200px"}}>

            <label htmlFor='user_name'>Username: </label>
            <input  type='text' id='user_name' name='user_name' value={formData.user_name} onChange={handleInputChange} required/>

            <label htmlFor='password'>Password: </label>
            <input  type='text' id='password' name='password' value={formData.password} onChange={handleInputChange} required/>

            <label htmlFor='confirm_password'>Confirm Password: </label>
            <input  type='text' id='confirm_password' name='confirm_password' value={formData.confirm_password} onChange={handleInputChange} required/>

            <button type='submit' disabled={isFormInvalid()}>submit</button>

        </form>

        {error && <p>{error}</p>}

    </>
  )
}

export default SignUp;