import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";

function UserProfile() {
    const navigate = useNavigate();
    const location = useLocation();
    const [userID, setUserID] = useState(null);

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

    return (
        <div className="flex flex-row w-full p-4" style={{ padding: "16px 10%" }}>
            {/* Sidebar Menu */}
            <div className="mr-6">
                <div 
                    className="w-48 p-4 flex flex-col space-y-4 rounded-md"
                    style={{backgroundColor:"#E2D9CD"}}>
                    {[
                        { label: "Book Classes", value: "book-classes" },
                        { label: "Upcoming Classes", value: "upcoming-classes" },
                        { label: "Previous Classes", value: "previous-classes" },
                        { label: "Purchases", value: "purchases" },
                        { label: "Profile Details", value: "profile-details" },
                    ].map((item) => (
                        <Link
                        key={item.value}
                        to={`/profile/${item.value}`}
                        className={`cursor-pointer hover:underline ${
                            location.pathname.includes(item.value) ? "font-semibold" : ""
                        }`}
                        >
                        {item.label}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 mb-4">
                <Outlet context={{ userID }} />
            </div>
        </div>
    );
}

export default UserProfile;