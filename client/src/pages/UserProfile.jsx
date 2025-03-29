import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UpcomingClasses from "./UpcomingClasses";
import PrevClasses from "./PrevClasses";
import ProfileDetails from "./ProfileDetails";
import axios from "axios";

function UserProfile() {
    const { section } = useParams(); // Get section from URL
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [content, setContent] = useState(section || "upcoming-classes");

    useEffect(() => {
        let isMounted = true;

        try {
            const storedUserData = localStorage.getItem("userInfo");

            if (!storedUserData) {
                navigate("/errorPage");
                return;
            }

            const userObject = JSON.parse(storedUserData);
            if (isMounted) {
                setUserData(userObject);
            }

            alert(userObject.userID);
            try {
                axios.get(`/userProfile/${userObject.userID}`)
                    .then(response => {
                    console.log('User profile data:', response.data);
                    // Process data...
                  })
                  .catch(error => {
                    console.error('Error fetching user profile:', error);
                    alert('Failed to fetch user profile: ' + error.message);
                  });
            } catch (error) {
            console.error('Error in try block:', error);
            alert('An error occurred: ' + error.message);
            }
            

        } catch (error) {
            console.error("Error retrieving user data:", error);
            if (isMounted) {
                navigate("/errorPage");
            }
        }

        return () => {
            isMounted = false;
        };
    }, [navigate]);

    useEffect(() => {
        if (section) {
            setContent(section);
        }
    }, [section]);

    const handleContentChange = (newContent) => {
        setContent(newContent);
    };

    const renderContent = () => {
        switch (content) {
            case "upcoming-classes":
                return <UpcomingClasses />;
            case "previous-classes":
                return <PrevClasses />;
            case "profile-details":
                return <ProfileDetails />;
            default:
                return <div>Page not found</div>;
        }
    };

    const getTitle = (contentType) => {
        switch (contentType) {
            case "upcoming-classes":
                return "Upcoming Classes";
            case "previous-classes":
                return "Previous Classes";
            case "profile-details":
                return "Profile Details";
            default:
                return "Unknown Page";
        }
    };

    return (
        <div className="flex flex-row w-full p-4" style={{ padding: "16px 10%" }}>
            {/* Sidebar Menu */}
            <div className="mr-6">
                <div 
                    className="w-48 p-4 flex flex-col space-y-4 rounded-md"
                    style={{backgroundColor:"#E2D9CD"}}>
                    {["upcoming-classes", "previous-classes", "profile-details"].map((item) => (
                        <a
                            key={item}
                            className={`cursor-pointer hover:underline ${
                                content === item ? "font-semibold" : ""
                            }`}
                            onClick={() => handleContentChange(item)}
                        >
                            {getTitle(item)}
                        </a>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 mb-4">
                <h1 className="text-2xl">{getTitle(content)}</h1>
                <div className="border rounded-md mt-4">{renderContent()}</div>
            </div>
        </div>
    );
}

export default UserProfile;