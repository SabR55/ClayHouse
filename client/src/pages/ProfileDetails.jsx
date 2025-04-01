import { useState, useEffect } from "react";
import axios from "axios";

function ProfileDetails({userID}){

    const [isEditing, setIsEditing] = useState(false);  // Toggle editing

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        creditCard: ''
    });

    const [updatedUserData, setUpdatedUserData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        creditCard: ''
    });

    useEffect(() => {
        // Retrieve the user data
        if(userID) {
            axios.get(`/userProfile/${userID}`)
                .then(response => {

                    // Check if data exists
                    if(response.data.data) {
                        
                        const fetchedData = {
                            name: response.data.data.userName || '',
                            email: response.data.data.userEmail || '',
                            phone: response.data.data.userPhone || '',
                            creditCard: response.data.data.userCreditCard || ''
                        };
                        
                        // Set both original and current data
                        setUserData(fetchedData);
                        setUpdatedUserData(fetchedData);
                    }
                })
                .catch(error => {
                    console.error('Error fetching user profile:', error);
                });
        }
    }, [userID]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    function handleCancel(){

        setUpdatedUserData(userData);
        setIsEditing(false);
    }

    // Handle save button - update data
    const handleSave = () => {

        if (userData.name === updatedUserData.name && 
            userData.email === updatedUserData.email &&
            userData.phone === updatedUserData.phone &&
            userData.password === updatedUserData.password &&
            userData.creditCard === updatedUserData.creditCard) {
            return;
        }

        // Save the updated data to the server
        axios.put(`/userProfile/${userID}`, {
            userName: updatedUserData.name,
            userEmail: updatedUserData.email,
            userPhone: updatedUserData.phone,
            userCreditCard: updatedUserData.creditCard
        })
        .then(response => {
            // Update the original data with the new values
            setUpdatedUserData(response.data);
            setUserData(response.data);
            setIsEditing(false);
        })
        .catch(error => {
            console.error('Error updating user profile:', error);
        });
    };
    

    return(
        <div className="md:pl-16 py-16 md:justify-start">
            <form className="w-80 grid grid-cols-1 gap-6">
                <div>
                    <label className="block font-medium">
                        Name
                    </label>
                    <input 
                        type="text"
                        name="name"
                        value={updatedUserData.name}
                        onChange={handleChange}
                        className="inputBox w-full pt-2 focus:ring-0 outline-none appearance-none"
                        disabled={!isEditing}
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium">
                        Email
                    </label>
                    <input 
                        type="email"
                        name="email"
                        value={updatedUserData.email}
                        onChange={handleChange}
                        className="inputBox w-full pt-2 focus:ring-0 outline-none appearance-none"
                        disabled={!isEditing}
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium">
                        Phone
                    </label>
                    <input 
                        type="tel"
                        name="phone"
                        value={updatedUserData.phone}
                        onChange={handleChange}
                        className="inputBox w-full pt-2 focus:ring-0 outline-none appearance-none"
                        disabled={!isEditing}
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium">
                        Credit Card
                    </label>
                    {userData.creditCard === '' ? (
                        <a className="opacity-60 hover:underline">
                            add credit card
                        </a>
                    ) : (
                        <input 
                            type="password"
                            name="creditCard"
                            value={updatedUserData.creditCard}
                            onChange={handleChange}
                            className="inputBox w-full pt-2 focus:ring-0 outline-none appearance-none"
                            disabled={!isEditing}
                        />
                    )}
                </div>

                <div>   {/* open modal */}
                    <label className="block font-medium">
                        Password
                    </label>
                    <a className="opacity-60 hover:underline"> change password </a>
                </div>
            </form>

            <div className="pt-8 w-80 flex justify-end">
                {!isEditing ? (
                    <button
                        className="buttonBrown w-30 font-medium py-2 px-4 rounded-md shadow cursor-pointer"
                        onClick={() => {setIsEditing(true)}}
                        >
                        edit
                    </button>
                ) : (
                    <div>
                        <button 
                            className="buttonBrown w-30 font-medium py-2 px-4 mr-4 rounded-md shadow cursor-pointer"
                            style={{backgroundColor:"#B6A593"}}
                            onClick={handleCancel}
                            >
                            cancel
                        </button>

                        <button 
                            className="buttonBrown w-30 font-medium py-2 px-4 rounded-md shadow cursor-pointer"
                            onClick={handleSave}
                            >
                            save
                        </button>
                    </div>
                )}
            </div>
            
        </div>
    );
}

export default ProfileDetails;