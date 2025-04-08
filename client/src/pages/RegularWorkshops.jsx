// src/components/Workshops.jsx
import React, { useState, useEffect } from 'react';
import workshopData from '../data/workshopData';
import { useNavigate } from 'react-router-dom';

function Workshops() {
    const [userID, setUserID] = useState(null);
    
    const [activeLoginMessage, setActiveLoginMessage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check localStorage for user data when component mounts
        const getUserFromStorage = () => {
            const userDataString = localStorage.getItem('userInfo');
          
            if (userDataString) {
                try {
                    const userData = JSON.parse(userDataString);
                    if (userData.userName) {
                        setUserID(userData.userID);
                    }
                } catch (error) {
                    console.error('Error parsing user data from localStorage:', error);
                }
            }
        };
        
        getUserFromStorage();
    }, []);

    const handleBooking = (workshopID) => {

        const workshopPrices = {
            "002": 300,
            "003": 280
            // Add more workshop prices as needed
          };

        const bookingDetails = {
            date: '',
            time: '',
            workshopID: workshopID,
            workshopPrice: workshopPrices[workshopID]
        };

        if (userID != null) {
            navigate("/workshop-payment", { state: bookingDetails });

        } else {
            setActiveLoginMessage(workshopID);
        }
    };

    return (
        <div>
            <div className="relative -z-1">
                <img 
                    className="px-[10%] w-full"
                    src="/src/assets/images/regularClass-hero.jpg" 
                />

                <div className="absolute inset-0 flex items-center justify-center">
                    <p 
                        className="text-white text-4xl lg:text-6xl font-medium"
                        style={{fontFamily:"Josefin Sans, sans-serif"}}
                    >
                        Regular Class Workshop
                    </p>
                </div>
            </div>
            
            {workshopData.map((workshop, index) => (
                <div key={workshop.id || `workshop-${index}`}>
                    {/* Workshop Content */}
                    <div className="py-12 px-[10%]">
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="w-full md:w-1/3">
                                <img 
                                    src={workshop.detailImage}
                                    className="w-full h-auto" 
                                    alt={`${workshop.title} details`}
                                />
                                <div className="mt-4">
                                    <button 
                                        className="buttonBrown w-full py-3 rounded cursor-pointer"
                                        onClick={() => handleBooking(workshop.workshopID)}
                                    >
                                        Buy Workshop
                                    </button>

                                    {/* Error message - ONLY shown if this specific workshop ID matches activeLoginMessage */}
                                    {activeLoginMessage === workshop.workshopID && (
                                        <p className='pt-4 text-center text-red-700'>Please login to buy</p>
                                    )}
                                </div>
                            </div>

                            <div className="w-full md:w-2/3 px-8">
                                {/* Workshop Title */}
                                <p 
                                    className="text-3xl font-bold pb-4"
                                    style={{fontFamily:"Josefin Sans, sans-serif"}}
                                >
                                    {workshop.title}
                                </p>

                                {/* Workshop Description */}
                                <p className="mb-6 text-lg">{workshop.WSDesc}</p>
                                
                                {/* Workshop Sessions */}
                                <div className="mb-6">
                                    {typeof workshop.WSSessions === 'string' ? (
                                        <p className='font-medium pb-2'>{workshop.WSSessions}</p>
                                    ) : Array.isArray(workshop.WSSessions) ? (
                                        workshop.WSSessions.map((session, idx) => (
                                            <p key={`session-${workshop.id}-${idx}`}>
                                                {session.name}: <span className="font-medium">{session.value}</span>
                                            </p>
                                        ))
                                    ) : null}
                                    
                                    <ul className="list-disc pl-5 mb-6">
                                        {Array.isArray(workshop.WSDetails) && workshop.WSDetails.map((detail, idx) => (
                                            <li key={`detail-${workshop.id}-${idx}`}>{detail}</li>
                                        ))}
                                    </ul>
                                </div>
                                
                                {/* Workshop Validity */}
                                {Array.isArray(workshop.WSValidity) ? (
                                    workshop.WSValidity.map((term, idx) => (
                                        <p key={`validity-${workshop.id}-${idx}`} className='text-sm italic'>{term}</p>
                                    ))
                                ) : (
                                    <p className='text-sm italic'>{workshop.WSValidity}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Add separator between workshops except after the last one */}
                    {index < workshopData.length - 1 && (
                        <hr className="w-2/3 mx-auto mb-8"/>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Workshops;