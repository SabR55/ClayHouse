import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CCModal from './CCModal'
import axios from "axios";

const WorkshopPayment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const bookingDetails = location.state;
    const [userID, setUserID] = useState(null);
    const [workshop, setWorkshop] = useState(null);
    const [isCCModalOpen, setIsCCModalOpen] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const openModal = () => setIsCCModalOpen(true);
    const closeModal = () => {setIsCCModalOpen(false)};

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        creditCard: ''
    });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        cardName: '',
        cardNum:'',
        cardExpDate:'',
        date: bookingDetails.date,
        time: bookingDetails.time,
        price: bookingDetails.workshopPrice
    });

    useEffect(() => {
       
        // Set Workshop Name
        if (bookingDetails && bookingDetails.workshopID) {
            switch(bookingDetails.workshopID) {
                case "001":
                    setWorkshop("Trail Class Workshop");
                    break;
                case "002":
                    setWorkshop("Wheel Throwing Workshop,\n5 sessions");
                    break;
                case "003":
                    setWorkshop("HandBuilding Workshop, 5 sessions");
                    break;
                default:
                    setWorkshop(null);
            }
        }
    }, [bookingDetails]);

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

        if (userID) {
            axios.get(`/userProfile/${userID}`)
                .then(response => {
                    // Check if data exists
                    if (response.data.data) {
                        const fetchedData = {
                            name: response.data.data.userName || '',
                            email: response.data.data.userEmail || '',
                            phone: response.data.data.userPhone || ''
                        };
                        
                        // Set user data
                        setUserData(fetchedData);
                    }
                })
                .catch(error => {
                    console.error('Error fetching user profile:', error);
                });

            axios.get(`/creditCardNumber/${userID}`)
            .then (response => {
                // Update just the credit card property in userData
                setUserData(prevData => ({
                    ...prevData,
                    creditCard: response.data.lastThreeDigits
                }));
            })
            .catch(error => {
                console.error('Error fetching credit card number', error);
            });
        }
        
        getUserFromStorage();

    }, [userID]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      };

    function handlePayment() {

        const userEmail = formData.email;

        // Check if user exists
        axios.get(`/checkUserProfile/${userEmail}`)
        .then(response => {
            console.log(response.data)
            setErrMsg('Email already exists. Please Login to book.');
        })
        .catch(err => {
            console.log(err.data.message)
        })

        // Check if user has booked a trial class before
        axios.get(`/checkTrialUserEmail/${userEmail}`)
        .then (response => {
            console.log(response.data)
            setErrMsg('You have already made a trail class booking with this email.');
        })
        .catch (err =>{
            console.log(err.data.message)
        })
        
        const checkCardNum = /^\d{16}$/;
        const checkExpDate = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;

        if (userID == null) {
            if (!formData.cardNum || !checkCardNum.test(formData.cardNum)) {
                setErrMsg('Credit Card Number invalid');    
                return;
            }
    
            if (!formData.cardExpDate || !checkExpDate.test(formData.cardExpDate)) {
                setErrMsg('Exp Date invalid');
                return;
            }

            axios.post('/trialClassNewUser', formData)
                .then(response => {
                    console.log(response.data);
                    navigate('/trial-class-new-user', { state: formData })

                })
                .catch(error => {
                    console.error('Error submitting form:', error);
                });
        }

    }

    function handlePaymentLoggedIn() {

        const currentDate = new Date();

        const bookingData  = ({
            workshopID: bookingDetails.workshopID,
            currDate: currentDate,
            cost: bookingDetails.workshopPrice

        }) 

        if (bookingDetails.workshopID == "001") {

            const dateObj = new Date(bookingDetails.date);
            const isoDate = dateObj.toISOString().split('T')[0]; // "YYYY-MM-DD"

            bookingData.date = isoDate;
            bookingData.time = bookingDetails.time;

            axios.post(`/trial-class/${userID}`, bookingData)
            .then(response => {
                console.log(response.data.message)
            })
            .catch(err => {
                console.log("Error: " + err)
            })
            
            navigate('/profile/upcoming-classses');

        } else {
            axios.post(`/book-class/${userID}`, bookingData)
            .then(response => {
                console.log(response.data.message)
            })
            .catch(err => {
                console.log("Error: " + err)
            })
            
            navigate('/profile/book-classes');
        }

        
    }

    return (
        <div className="flex flex-col items-center justify-center mt-12 mb-16">
            <div className="w-86">
                <div className="w-full mb-8 -z-1">
                    <h1 className="text-xl font-bold text-center pl-4">Workshop Payment</h1>
                </div>
                
                <div className="w-full mb-4" style={{display: (userID ==null) ? "none" : "block"}}>
                    <div className="flex w-full">
                        <div className="w-1/3 font-medium mb-2">Name:</div>
                        <div className="w-2/3 text-right">{userData.name}</div>
                    </div>
                    <div className="flex w-full mb-2">
                        <div className="w-1/3 font-medium">Email:</div>
                        <div className="w-2/3 text-right">{userData.email}</div>
                    </div>
                    <div className="flex w-full mb-2">
                        <div className="w-1/3 font-medium">Phone:</div>
                        <div className="w-2/3 text-right">{userData.phone}</div>
                    </div>
                    <div className="flex w-full mb-2">
                        <div className="w-1/3 font-medium">Credit Card:</div>
                            <div className="w-2/3 text-right">
                                {userData.creditCard ? (
                                    <p>{'**** **** **** *' + userData.creditCard}</p>
                                ) : (
                                    <p className="opacity-60">No credit card</p>
                                )}
                            </div>
                    </div>
                </div>
                
                <div className="mb-6" style={{display: (userID !=null) ? "none" : "block"}} >
                    <form className="grid gric-cols-1 gap-6 w-full">
                        <div>
                            <label className="font-medium">Name</label>
                            <input 
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="inputBox w-full pt-2 focus:ring-0 outline-none appearance-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="font-medium">Email</label>
                            <input 
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="inputBox w-full pt-2 focus:ring-0 outline-none appearance-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="font-medium">Phone</label>
                            <input 
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="inputBox w-full pt-2 focus:ring-0 outline-none appearance-none"
                                required
                            />
                        </div>

                        <div>
                            <h1 className="pt-4 pb-2 text-xl font-semibold">Credit Card Info</h1>

                            <label className="font-medium">Card Name</label>
                            <input 
                                type="text"
                                name="cardName"
                                value={formData.cardName}
                                onChange={handleChange}
                                className="inputBox w-full pt-2 focus:ring-0 outline-none appearance-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="font-medium">Credit Card Number</label>
                            <input 
                                type="text"
                                name="cardNum"
                                value={formData.cardNum}
                                onChange={handleChange}
                                className="inputBox w-full pt-2 focus:ring-0 outline-none appearance-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="font-medium">Exp Date (MM/YY)</label>
                            <input 
                                type="text"
                                name="cardExpDate"
                                value={formData.cardExpDate}
                                onChange={handleChange}
                                placeholder='MM/YY'
                                className="inputBox w-full pt-2 focus:ring-0 outline-none appearance-none"
                                required
                            />
                        </div>
                    </form>
                </div>

                <div className="border-t w-full pt-4">
                    <p 
                        className="pt-4 pb-2 text-lg font-semibold" 
                        style={{ whiteSpace: 'pre-line' }}
                        >
                        {workshop}
                    </p>

                    {(bookingDetails.date!='') && 
                        <div className="flex w-full">
                            <div className="w-1/3 font-medium mb-2">Date:</div>
                            <div className="w-2/3 text-right">{bookingDetails.date}, {bookingDetails.time}</div>
                        </div>
                    }
                    
                    <div className="flex w-full">
                        <div className="w-1/3 font-medium mb-2">Price:</div>
                        <div className="w-2/3 text-right">$ {bookingDetails.workshopPrice}</div>
                    </div>
                    
                </div>

                {!userData.creditCard && userID && (
                    <div className="pt-4">
                        <p className="text-red-700">Please enter your credit card to continue</p>
                        <p 
                        className="hover:underline cursor-pointer" 
                        onClick={openModal}
                        >
                        Click here to add credit card
                        </p>
                    </div>
                )}

                {/* Error message */}
                {(errMsg != '') && (
                    <div>
                        <p className="text-red-700">{errMsg}</p>
                    </div>
                )}

                <button 
                    className={`buttonBrown mt-6 w-full font-medium py-2 rounded-md shadow ${(userData.creditCard || userID==null) ? 'cursor-pointer' : 'opacity-50'}`}
                    onClick={( userID == null ) ? handlePayment : handlePaymentLoggedIn}
                    disabled={userData.creditCard === '' && userID !=null}
                    >
                    Confirm Payment
                </button>
            </div>

            {/* Modal Backdrop */}
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
        </div>
    );
};

export default WorkshopPayment;
