import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../services/authService';
import { AuthUserContext } from '../../App';

const SignIn = () => {

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

    //Functions

        //SignIn Logic (So we can extract ERROR message)
    const handleSignIn = async (userData) => {
        try{
            const response = await signIn(userData);
            setUser(response.user);
            setMessage(response.message);
        }catch(error){
            //We are THROWING the error object, which has the field message as a string that we can display in our interface --> Therefore, we can access that string message and set it to the error state variable
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

        handleSignIn({
            user_name: user_name,
            password: password
        });
        setFormData({
            user_name: "",
            password: "",
            confirm_password: "",
        });      
    };

    //Logic to STAY in Form if provided credentials are INVALID or redirect to Dashboard if valid --> Therefore, user state remains null
    if(user){
        setTimeout(()=>{
            navigate("/");
        },2000); 
    }


        //Using setTimeout() function to invoke state setter function and return state to "null" to hide error message
    setTimeout(()=>{
        setError(null);
        setMessage(null);
    }, 8000);

    const isFormInvalid = () => {
        const {user_name, password, confirm_password} = formData;
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

            <button type='submit' disabled={isFormInvalid()}>Login</button>

        </form>
        
        {error && <p>{error}</p>}
        {message && <p>{message}</p>}

    </>
  )
}

export default SignIn;