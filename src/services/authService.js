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
        if(!response.ok){
            throw new Error (`HTTP Error - Status: ${response.status}`);
        }
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
        if(!response.ok){
            throw new Error (`HTTP Error - Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
    }catch(error){
        console.error(`Error: ${error.message}`);
    }
};

//Export
export { signUp, signIn };
