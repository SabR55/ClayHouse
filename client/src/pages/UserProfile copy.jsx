import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UpcomingClasses from "./UpcomingClasses";

function UserProfile() {
    const [userData, setUserData] = useState(null);
    // const [content, setContent] = useState(section || "upcoming-classes");

    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        
        try {
            // Get data from localStorage
            const storedUserData = localStorage.getItem('userInfo');
            
            // Check if data exists before parsing
            if (!storedUserData) {
                // Redirect to error page if no user data exists
                navigate('/errorPage');
                return;
            }
            
            // Parse the JSON string into an object
            const userObject = JSON.parse(storedUserData);
            
            if (isMounted) {
                setUserData(userObject);
            }
            
        } catch (error) {
            // Handle any errors (like invalid JSON)
            console.error('Error retrieving user data:', error);
            if (isMounted) {
                navigate('/errorPage');
            }
        }
        
        // Cleanup function to prevent state updates after unmount
        return () => {
            isMounted = false;
        };
    }, [navigate]); // Add navigate to dependencies

    // function handleContent(e) {
    //     alert(e);
    // }
    
    return(
        <div className="flex flex-row w-full" style={{padding:"16px 10%"}}>
            
            {/* Menu */}
            <div className="p-4 mr-4 flex flex-col space-y-4">
                <a  
                    className="cursor-pointer hover:underline"
                    // onClick={handleContent('upcoming-classes')}
                    >Upcoming Classes
                </a>

                <a  
                    className="cursor-pointer hover:underline"
                    // onClick={handleContent('previous-classes')}
                    >
                    Previous Classes
                </a>

                <a 
                    className="cursor-pointer hover:underline"
                    // onClick={handleContent('profile-details')}
                    >
                    Profile Details
                </a>
            </div>

            <div className="flex-1 p-4">
                <h1 className="text-2xl">Title</h1>
                
                <div className="border mt-4" >
                    <UpcomingClasses />
                </div>
                
                
            </div>
        </div>
    );
}

export default UserProfile;