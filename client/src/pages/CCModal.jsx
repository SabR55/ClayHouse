import { X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CCModal({closeModal, userID}) {

    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();

    const [cardDetails, setCardDetails] = useState({
        userCardNum: '',
        userCardName: '',
        userCardExpDate: ''
    });

    const checkCardNum = /^\d{16}$/;
    const checkExpDate = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCardDetails(prev => ({
            ...prev,
            [name]: value
        }));
    }

    function handleSubmit(e){

        e.preventDefault();

        if (!cardDetails.userCardNum || !checkCardNum.test(cardDetails.userCardNum)) {
            setErrMsg('Credit Card Number invalid');
            return;
        }

        if (!cardDetails.userCardExpDate || !checkExpDate.test(cardDetails.userCardExpDate)) {
            setErrMsg('Exp Date invalid');
            return;
        }

        // Extract month and year
        const [month, year] = cardDetails.userCardExpDate.split('/');

        // Convert to numbers and add 2000 to get full year
        const expMonth = parseInt(month, 10);
        const expYear = parseInt(year, 10) + 2000;

        // Get current date
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 2;
        const currentYear = currentDate.getFullYear();

        // Check if the date is in the future
        if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
            setErrMsg('Card is not valid');
            return;
        }

        try {
            axios.post(`/addCreditCard/${userID}`, cardDetails)
            .then(response => {
                console.log(response.data.data);
                closeModal();
                navigate(0);
            })
            .catch(error => {
                console.error('Error updating user profile:', error);
            });
        } catch (error) {
            console.error('Error in try block:', error);
        }

    }

    return(
        <div className="rounded-md shadow-lg w-full max-w-md mx-4 overflow-hidden" style={{backgroundColor:"#FCF8F0"}}>
            
            {/* Header */}
            <div className="px-6 pt-8 pb-4 relative">
                <div className="text-center">
                    <h3 
                        className="text-xl font-bold"
                        style={{fontFamily: "'Josefin Sans', sans-serif"}}
                        >
                        Add Credit Card</h3>
                </div>
                <button 
                onClick={closeModal} 
                className="absolute right-6 top-4 cursor-pointer"
                >
                <X size={20}/>
                </button>
            </div>

            {/* Body */}
            <div className="px-12 flex justify-center">
                <div className="pt-4 pb-8 w-80">
                    <form className="w-full grid grid-cols-1 gap-6">
                        <div>
                            <label htmlFor="email" className="block font-medium">
                                Card Holder Name
                            </label>
                            <input 
                                type="text"
                                name="userCardName"
                                value={cardDetails.userCardName}
                                onChange={handleChange}
                                className="inputBox w-full pt-2 focus:ring-0 outline-none appearance-none"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block font-medium">
                                Credit Card
                            </label>
                            <input 
                                type="text"
                                name="userCardNum"
                                value={cardDetails.userCardNum}
                                onChange={handleChange}
                                className="inputBox w-full pt-2 focus:ring-0 outline-none appearance-none"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block font-medium">
                                Exp Date (MM/YY)
                            </label>
                            <input 
                                type="text"
                                name="userCardExpDate"
                                value={cardDetails.userCardExpDate}
                                onChange={handleChange}
                                placeholder='MM/YY'
                                className="inputBox w-full pt-2 mb-4 focus:ring-0 outline-none appearance-none"
                                required
                            />
                        </div>
                    </form>

                    {/* Error message */}
                    {(errMsg != '') && (
                            <div>
                                <p className="text-red-700">{errMsg}</p>
                            </div>
                        )}

                    <button
                        type="submit"
                        className="buttonBrown mt-4 mb-2 w-full font-medium py-2 rounded-md shadow cursor-pointer"
                        onClick={handleSubmit}
                        >
                        Confirm
                    </button>

                    
                </div>
            </div>
        </div>
    );
}

export default CCModal;