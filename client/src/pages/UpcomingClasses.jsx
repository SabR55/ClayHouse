import { useState, useEffect } from "react";
import { Trash } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UpcomingClasses() {
    const navigate = useNavigate();
    const [userID, setUserID] = useState(null);
    const [upcomingClasses, setUpcomingClasses] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteError, setDeleteError] = useState(null);

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
    
    const fetchUpcomingClasses = () => {
        // Set loading to true when starting to fetch
        setLoading(true);
        
        axios.get(`/user-upcoming-classes/${userID}`)
            .then(response => {
                // Store the data from the response
                if (response.data.success) {
                    setUpcomingClasses(response.data.data);
                } else {
                    setError("Failed to fetch classes");
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching upcoming classes:", err);
                setError("Error loading your upcoming classes");
                setLoading(false);
            });
    };
    
    useEffect(() => {
        if (userID) {
            fetchUpcomingClasses();
        }
    }, [userID]); 

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        
        // Check if date is valid
        if (isNaN(date.getTime())) {
            return dateString; 
        }
        
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        
        return `${day} ${month} ${year}`;
    };

    // Function to display workshop name based on ID
    const getWorkshopName = (workshopID) => {
        const workshopMap = {
          '001': 'Trial Class Workshop',
          '002': 'Regular Hand Throwing Workshop',
          '003': 'HandBuilding Workshop, 5 sessions'
        };
        
        return workshopMap[workshopID] || workshopID;
    };

    function handleDeleteClick(booking) {
        setSelectedBooking(booking);
        setDeleteError(null);
        
        setDeleteModal(true);
    }
    
    function handleConfirmDelete() {

        const bookingID = selectedBooking._id;
        
        axios.delete(`/cancel-booking/${bookingID}`, {data: { userID }})
        .then(response => {
            if (response.data.success) {
                // Refresh the list of upcoming classes
                fetchUpcomingClasses();
                // Close the modal
                setDeleteModal(false);
                setSelectedBooking(null);
            } else {
                setDeleteError("Failed to cancel the class");
            }
        })
        .catch(err => {
            console.error("Error cancelling class:", err);
            setDeleteError("Error cancelling the class. Please try again later.");
        });
    }
    
    const handleWorkshopClick = (workshopID) => {
        if (workshopID === "001") {
            navigate('/trial-class');
        } else if (workshopID === "002" || workshopID === "003" ) {
            navigate('/tregular-workshops');
        }
    };

    // Render loading state
    if (loading) {
        return <div>Loading your upcoming classes...</div>;
    }

    // Render error state
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="upcoming-classes-container">
            {upcomingClasses.length === 0 ? (
                <p>You don't have any upcoming classes scheduled.</p>
            ) : (
                <div className="classes-list">
                    {upcomingClasses.map((booking, index) => (
                        <div 
                            key={index} 
                            className="class-card p-4 mb-3 border rounded shadow-sm"
                        >
                            <h3 
                                className="font-semibold hover:underline cursor-pointer"
                                onClick={() => handleWorkshopClick(booking.workshopID)}
                                >
                                {getWorkshopName(booking.workshopID)}</h3>
                            <div className="w-full flex justify-between items-center">
                                <p>Date: {formatDate(booking.workshopDate)}, {booking.workshopTime}</p>
                                <Trash 
                                    size={22} 
                                    className="cursor-pointer" 
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent triggering the parent onClick
                                        handleDeleteClick(booking);
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {deleteModal && selectedBooking && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    {/* Separate backdrop div with the background */}
                    <div className="absolute inset-0 bg-black opacity-50"></div>

                    {/* Modal content positioned above the backdrop */}
                    <div className="z-10 relative rounded-lg p-8 w-1/3" style={{backgroundColor:"#FCF8F0"}}>
                        <p className="text-xl font-semibold text-center">Cancel class?</p>

                        <div className="border p-4 my-6 rounded-lg">
                            <h4 className="font-semibold mb-2">{getWorkshopName(selectedBooking.workshopID)}</h4>
                            <p>Date: {formatDate(selectedBooking.workshopDate)}, {selectedBooking.workshopTime}</p>
                        </div>
                        
                        {deleteError && (
                            <div className="text-red-600 mb-4 text-center">
                                {deleteError}
                            </div>
                        )}

                        <div className="w-full">
                            <div className="flex gap-4">
                                <button 
                                className="flex-1 font-medium py-2 px-4 rounded-md shadow cursor-pointer"
                                style={{backgroundColor:"#B6A593"}}
                                onClick={() => {
                                    setDeleteModal(false);
                                    setSelectedBooking(null);
                                    setDeleteError(null);
                                }}
                                >
                                Cancel
                                </button>

                                <button 
                                className={`buttonBrown flex-1 font-medium py-2 px-4 rounded-md shadow cursor-pointer`}
                                onClick={handleConfirmDelete}
                                >
                                Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UpcomingClasses;