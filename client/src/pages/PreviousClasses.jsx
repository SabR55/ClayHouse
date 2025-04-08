import { useEffect, useState } from "react";

function PreviousClasses() {

    const [userID, setUserID] = useState(null);

    useEffect(() => {
        // Check localStorage for user data when component mounts
        const getUserFromStorage = () => {
            const userDataString = localStorage.getItem('userInfo');
          
            if (userDataString) {
                try {
                    const userData = JSON.parse(userDataString);
                    if (userData.userID) {
                        setUserID(userData.userID);
                    }
                } catch (error) {
                    console.error('Error parsing user data from localStorage:', error);
                }
            }
        };

        getUserFromStorage();
    }, []);



    return(
        <div>
            <p>You have no previous classes at the moment</p>  
        </div>
    );
}

export default PreviousClasses;