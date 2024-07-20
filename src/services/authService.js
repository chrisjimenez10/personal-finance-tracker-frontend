const AUTH_URL = `${import.meta.env.VITE_BACKEND_URL}/users`;

//HTTP Functions
const signUp = async (userData) => {
    try{
        const response = await fetch(`${AUTH_URL}/signup`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData)
            }
        );
        const data = await response.json();
        console.log(data);
        return data;
    }catch(error){
        console.error(`Error: ${error.message}`);
    }
};

const signIn = async (userData) => {
    try{
        const response = await fetch(`${AUTH_URL}/signin`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            }
        );

        //NOTE: If we want to display the error message in the UI, we MUST throw the ERROR Object from the HTTP Response --> We can do this by checking the "ok" property of the response and if there is any error this property will return "false" --> From there, we can store the ERROR data in a variable and throw the ERROR Object to handle in our React Component
        if(!response.ok){
            const errorData = await response.json();
            throw new Error (errorData.error || "An unkown error occured");
        }

        const data = await response.json();
        console.log(data);
        return data;
    }catch(error){
        throw error;
    }
};

//Export
export { signUp, signIn };
