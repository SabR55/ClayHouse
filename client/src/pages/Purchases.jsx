import { useEffect, useState } from "react";
import axios from "axios";

function Purchases() {

    const [userID, setUserID] = useState(null);
    const [purchases, setPurchases] = useState([]);

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

    useEffect(() => {
        if (userID) {
            axios.get(`/purchases/${userID}`)
                .then(response => {
                    console.log("Pruchases Data: ", response.data.data)
                    setPurchases(response.data.data);
                })
                .catch(err => {
                    console.error('Error fetching purchases:', err);
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

    return(
        <div className="w-full max-w-4xl mx-auto">
        {purchases.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-white" style={{backgroundColor:"#B6A593"}}>
                  <th className="p-3 text-left font-medium">Workshop</th>
                  <th className="p-3 text-left font-medium">Cost</th>
                  <th className="p-3 text-left font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((purchase, index) => (
                  <tr 
                    key={index}
                    style={{
                      borderTopColor: "#B6A593",
                      backgroundColor: index % 2 === 0 ? undefined : "#E2D9CD"
                    }}
                  >
                    <td className="p-3 border-t" style={{borderTopColor:"#B6A593"}}>{getWorkshopName(purchase.workshopID)}</td>
                    <td className="p-3 border-t" style={{borderTopColor:"#B6A593"}}>${purchase.cost}</td>
                    <td className="p-3 border-t" style={{borderTopColor:"#B6A593"}}>{new Date(purchase.purchaseDate).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                    })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No purchases found.</p>
        )}
      </div>
    )
}

export default Purchases;