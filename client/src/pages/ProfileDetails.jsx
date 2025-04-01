import { useState, useEffect } from "react";
import axios from "axios";

function ProfileDetails({userID}){

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        creditCard: ''
    });

    // const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // Retrieve the user data
        if(userID) {
            axios.get(`/userProfile/${userID}`)
                .then(response => {

                    // Check if data exists
                    if(response.data.data) {
                        
                        setUserData({
                            name: response.data.data.userName || '',
                            email: response.data.data.userEmail || '',
                            phone: response.data.data.userPhone || '',
                            creditCard: response.data.data.userCreditCard || ''
                        });
                    }
                })
                .catch(error => {
                    console.error('Error fetching user profile:', error);
                });
        }
    }, [userID]);


    function handleClick(){
        console.log("User ID:", userID);
        console.log("User Data:", userData);
    }

    

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
                        placeholder={userData.name}
                        className="inputBox w-full pt-2 focus:ring-0 outline-none appearance-none"
                        disabled
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
                        placeholder={userData.email}
                        className="inputBox w-full pt-2 focus:ring-0 outline-none appearance-none"
                        disabled
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
                        placeholder={userData.phone}
                        className="inputBox w-full pt-2 focus:ring-0 outline-none appearance-none"
                        disabled
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium">
                        Credit Card
                    </label>
                    <input 
                        type="password"
                        name="email"
                        className="inputBox w-full pt-2 focus:ring-0 outline-none appearance-none"
                        disabled
                    />
                </div>

                <div>   {/* open modal */}
                    <label className="block font-medium">
                        Password
                    </label>
                    <a className="opacity-60 hover:underline"> change password </a>
                </div>
            </form>

            <div className="pt-8 w-80 flex justify-end">
                <button className="buttonBrown w-30 font-medium py-2 px-4 rounded-md shadow cursor-pointer">
                    edit
                </button>
            </div>
            
        </div>
    );
}

export default ProfileDetails;