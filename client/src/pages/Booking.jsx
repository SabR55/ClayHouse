import { useEffect, useState } from "react";
import Calendar from './Calendar';
import axios from "axios";

function WorkshopSessions() {
    const [userID, setUserID] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [workshopID, setWorkshopID] = useState('');
    const [workshopPrice, setWorkshopPrice] = useState('');
    const [showCalendar, setShowCaledar] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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

    useEffect(() => {
        if (userID) {
            setLoading(true);
            axios.get(`/bookings/${userID}`)
                .then(response => {
                    console.log("Booking Data: ", response.data.data);
                    setBookings(response.data.data || []);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Error fetching bookings:', err);
                    setError('Failed to load workshop data');
                    setLoading(false);
                });
        }
    }, [userID]);

    const getWorkshopName = (workshopID) => {
        const workshopMap = {
          '001': 'Trial Class Workshop',
          '002': 'Regular Hand Throwing Workshop',
          '003': 'HandBuilding Workshop, 5 sessions'
        };
        
        return workshopMap[workshopID] || workshopID;
    };
    
    const handleBookSession = (workshopID) => {
        setWorkshopID(workshopID);
        setShowCaledar(true);
        console.log(`Booking session for workshop: ${workshopID}`);
    };

    if (loading) return <p className="text-center py-4">Loading workshops...</p>;
    if (error) return <p className="text-center py-4 text-red-500">{error}</p>;

    return(
        <div className="w-full max-w-4xl mx-auto">
        {bookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-white" style={{backgroundColor:"#B6A593"}}>
                  <th className="p-3 text-left font-medium">Workshop Title</th>
                  <th className="p-3 text-left text-center font-medium">Sessions</th>
                  <th className="p-3 text-left font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr 
                    key={index}
                    style={{
                      borderTopColor: "#B6A593",
                      backgroundColor: index % 2 === 0 ? undefined : "#E2D9CD"
                    }}
                  >
                    <td className="p-3 border-t" style={{borderTopColor:"#B6A593"}}>{getWorkshopName(booking.workshopID)}</td>
                    <td className="p-3 border-t text-center" style={{borderTopColor:"#B6A593"}}>{booking.numOfSessions}</td>
                    <td className="p-3 border-t text-right" style={{borderTopColor:"#B6A593"}}>
                      <button
                        onClick={() => handleBookSession(booking.workshopID)}
                        disabled={parseInt(booking.numOfSessions) <= 0}
                        className={'buttonBrown px-4 py-2 rounded text-white'}
                      >
                        Book
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {showCalendar && (
                <div className="w-full flex flex-col items-center pb-4">
                    <hr className="w-full mb-4 mt-4" />
                    <Calendar workshopID={workshopID} workshopPrice={workshopPrice} />
                </div>
            )}
          </div>
        ) : (
          <p className="text-center py-4">You have no workshops for booking</p>
        )}
      </div>
    );
}

export default WorkshopSessions;