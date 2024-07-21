//Token

    //Retrive Token from localStorage
const getUser = () => {
    const token = localStorage.getItem("token");
    if(!token){
        return null;
    }
    const user = JSON.parse(atob(token.split(".")[1]));
    // console.log(user.user); --> From the decoded token, we want to access the actual user data we are returning from the backend "signin" route with "user.user" which contains id, user_name
    return user.user;
};

const signOut = () => {
    //Token-Authentication is STATELESS, so we don't need to send an HTTP Request to our Backend (Express DOES NOT keep track of the Tokens it issues) --> Therefore, we simply need to interact with the localStorage in the client --> Here, we use the removeItem("token") to delete the token from localStorage
    localStorage.removeItem("token");
};

//Export
export { getUser, signOut };