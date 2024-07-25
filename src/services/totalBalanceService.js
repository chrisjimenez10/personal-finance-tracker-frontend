const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/totalbalance`;

//HTTP Functions
const fetchUserTransactions = async(id) => {
    try{
        const response = await fetch(`${BASE_URL}/${id}`);
        const data = await response.json();
        console.log(data);
        return data;
    }catch(error){
        console.error(`Error: ${error.message}`);
    }
};

//Export
export { fetchUserTransactions, };