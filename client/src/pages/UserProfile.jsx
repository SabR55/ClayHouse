import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UpcomingClasses from "./UpcomingClasses";
import PrevClasses from "./PrevClasses";
import ProfileDetails from "./ProfileDetails";

function UserProfile() {
    const { section } = useParams(); // Get section from URL
    const navigate = useNavigate();
    const [userID, setUserID] = useState(null);
    const [content, setContent] = useState(section || "upcoming-classes");

    useEffect(() => {

        try {
            const storedUserData = localStorage.getItem("userInfo");
    
            if (!storedUserData) {
                navigate("/errorPage");
                return;
            }
    
            const userObject = JSON.parse(storedUserData);
            setUserID(userObject.userID);
            
        } catch (error) {
            console.error("Error retrieving user data:", error);
            navigate("/errorPage");
        }

    }, [navigate]);

    useEffect(() => {
        if (section) {
            setContent(section);
        }

        if (userID) {
            console.log("UserID from local storage: " + userID)
        }
    }, [section, userID]);

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
                return <ProfileDetails userID={userID}/>;
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