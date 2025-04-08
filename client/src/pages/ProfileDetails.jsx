import { useState, useEffect } from "react";
import { Trash } from 'lucide-react'
import { useNavigate } from "react-router-dom";
import CCModal from './CCModal'
import axios from "axios";

function ProfileDetails({userID}){

    const [isEditing, setIsEditing] = useState(false);  // Toggle editing
    const [isCCModalOpen, setIsCCModalOpen] = useState(false);
    const [isDeleteCardOpen, setIsDeleteCardOpen] = useState(false)
    const navigate = useNavigate();

    const openModal = () => setIsCCModalOpen(true);
    const closeModal = () => {setIsCCModalOpen(false)};

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    });

    const [updatedUserData, setUpdatedUserData] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    });

    const [userCardDetails, setUserCardDetails] = useState({
        cardName: '',
        cardLastThreeDigits: '',
        cardExpDate: ''
    }) 

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
                        };
                        
                        // Set both original and current data
                        setUserData(fetchedData);
                        setUpdatedUserData(fetchedData);
                    }
                })
                .catch(error => {
                    console.error('Error fetching user profile:', error);
                });
            
            // Get credit card details
            axios.get(`/creditCardDetails/${userID}`)
                .then (response => {
                    setUserCardDetails({
                        cardName: response.data.data.cardName || '',
                        cardLastThreeDigits: response.data.data.cardLastThreeDigits || '',
                        cardExpDate: response.data.data.cardExpDate || ''
                    })
                })
                .catch(error => {
                    console.log('Error fetching credit card number', error);
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

    function handleDelete() {

        try{
            axios.delete(`/deleteUserCard/${userID}`)
            .then(response => {
                console.log('Resource deleted successfully', response.data);
            })
        } catch(error) {
            console.error('Error deleting card', error);
        };

        setIsDeleteCardOpen(false);
        navigate(0);
    }
    

    return(
        <div className="md:px-8 py-4 md:justify-start">
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

                <div>   {/* open modal */}
                    <label className="block font-medium">
                        Password
                    </label>
                    <a className="opacity-60 hover:underline"> change password </a>
                </div>
            </form>

            <div className="pt-8 pb-8 w-80 flex justify-end border-b">
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

            <div className="py-8 w-80">
                <h1 className="text-xl font-semibold pb-4">Credit Card</h1>

                <div>
                    {(userCardDetails.cardLastThreeDigits) ? (
                        <div className="p-4 rounded-lg" style={{background:"#E2D9CD"}}>
                            <p className="font-semibold">{userCardDetails.cardName}</p>
                            <div className="w-full flex justify-between">
                                <p>{'**** **** **** *' + userCardDetails.cardLastThreeDigits}</p>
                                <p>Exp: {userCardDetails.cardExpDate}</p>
                            </div>

                            <div 
                                className="w-full flex justify-end p-2 cursor-pointer"
                                onClick={() => {setIsDeleteCardOpen(true)}}>
                                <Trash size={18} />
                            </div>
                           
                        </div>
                        
                    ) : (
                        <p 
                        className="opacity-60 hover:underline"
                        onClick={openModal}
                        >
                        add credit card</p>
                    )}
                </div>


            </div>

            {/* Add Credit Card */}
            {isCCModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">

                    {/* Separate backdrop div with the background */}
                    <div className="absolute inset-0 bg-black opacity-50"></div>

                    {/* Modal content positioned above the backdrop */}
                    <div className="z-10 relative">
                        <CCModal closeModal={closeModal} userID={userID}/>
                    </div>
                </div>
            )}

            {/* Delete Credit Card */}
            {isDeleteCardOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">

                    {/* Separate backdrop div with the background */}
                    <div className="absolute inset-0 bg-black opacity-50"></div>

                    {/* Modal content positioned above the backdrop */}
                    <div className="z-10 relative rounded-lg p-8" style={{backgroundColor:"#FCF8F0"}}>
                        <p className="mb-4 text-lg">Delete this Card from your profile?</p>

                        <div className="p-4 rounded-lg" style={{background:"#E2D9CD"}}>
                            <p className="font-semibold">{userCardDetails.cardName}</p>
                            <div className="w-full flex justify-between">
                                <p>{'**** **** **** *' + userCardDetails.cardLastThreeDigits}</p>
                                <p>Exp: {userCardDetails.cardExpDate}</p>
                            </div>
                        </div>

                        <div className="w-full mt-8">
                            <div className="flex gap-4">
                                <button 
                                className="flex-1 font-medium py-2 px-4 rounded-md shadow cursor-pointer"
                                style={{backgroundColor:"#B6A593"}}
                                onClick={() => {setIsDeleteCardOpen(false)}}
                                >
                                cancel
                                </button>

                                <button 
                                className="buttonBrown flex-1 font-medium py-2 px-4 rounded-md shadow cursor-pointer"
                                onClick={handleDelete}
                                >
                                delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
        </div>
    );
}

export default ProfileDetails;