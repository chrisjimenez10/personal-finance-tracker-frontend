import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../services/authService';
import { AuthUserContext } from '../../App';

const SignUp = () => {

    const { setUser, user } = useContext(AuthUserContext);
    const navigate = useNavigate();

    //State
    const [formData, setFormData] = useState({
        user_name: "",
        password: "",
        confirm_password: "",
    });
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false); //Using this state to PREVENT multiple form submissions

    //Functions
    const handleSignUp = async (userData) => {
        //Here, we are using the loading state when we invoke this handleSignUp function that is triggered when form is submitted --> The "loading" state variable is inside the "disabled" attribute in the submit button, so it DISABLES the button again to prevent multiple clicks that may lead to multiple form submissions
        setLoading(true);
        try{
            const response = await signUp(userData);
            setUser(response.user);
            setMessage(response.message);
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
            user_name,
            password
        });
        setFormData({
            user_name: "",
            password: "",
            confirm_password: "",
        });
    };

    useEffect(()=>{
        if(user){
            const timer = setTimeout(()=>{
                navigate("/");
            },2000); 
            return ()=> clearTimeout(timer);
        }
    },[user, navigate]);

    useEffect(()=>{
        if(error || message){
            const timer = setTimeout(()=>{
                setError(null);
                setMessage(null);
            }, 8000);
            return ()=> clearTimeout(timer);
        }
    },[error, message]);

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

            <button type='submit' disabled={isFormInvalid() || loading}>Register</button>

        </form>

        {error && <p>{error}</p>}
        {message && <p>{message}</p>}

    </>
  )
}

export default SignUp;