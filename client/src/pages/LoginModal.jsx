import { useState } from "react";
import { Link } from "react-router-dom";
import { X } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginModal({ closeModal }) {

    const [loginErr, setLoginErr] = useState(null);
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        email: 'sabr@email.com',
        password: 'was'
    });
    
    const handleChange = (id, value) => {
        setFormData({
          ...formData,
          [id]: value
        });
    };

    async function handleLogin(e) {
        e.preventDefault();

        console.log('Login attempt with:', formData);

        try {
            
            // Check if user exists
            const response = await axios.post('/login', formData);

            // Log the entire response to see what you're getting
            console.log("Response data:", response.data); // works

            // Save userID and userName to state and localStorage
            const setUser = response.data;
            
            const userStorageData = {
                userID: setUser.userID,
                userName: setUser.userName
            };
            
            // Convert the object to a string
            const userStorageString = JSON.stringify(userStorageData);
            
            // Save to localStorage with a key of your choice
            localStorage.setItem('userInfo', userStorageString);

            closeModal();

            // Return to homepage
            // navigate('/')
            window.location.href = '/';

        } catch (error) {
            console.error("Login Error:", error); // Debugging
            console.log(error.response.data?.msg)

            // Ensure we handle cases where no response is received
            if (error.response) {
                setLoginErr(error.response.data?.msg || "Login failed. Please try again.");
            } else {
                setLoginErr("Something went wrong. Please try again.");
            }
        }
    };
  

    return(
        <div className="rounded-md shadow-lg w-full max-w-md mx-4 overflow-hidden" style={{backgroundColor:"#FCF8F0"}}>
            {/* Modal Header */}
            <div className="px-6 pt-8 pb-4 relative">
                <div className="text-center">
                    <h3 
                        className="text-xl font-bold"
                        style={{fontFamily: "'Josefin Sans', sans-serif"}}
                        >
                        Login</h3>
                </div>
                <button 
                onClick={closeModal} 
                className="absolute right-6 top-4 cursor-pointer"
                >
                <X size={20}/>
                </button>
            </div>

            {/* Modal Body */}
            <div className="px-12 flex justify-center">
                <div className="pt-4 pb-8 w-60">
                    <form onSubmit={handleLogin}>
                    {/* Email Input */}
                    <div className="mb-6">
                        <label htmlFor="email" className="block font-medium">
                        Email
                        </label>
                        <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="inputBox w-full pt-2 focus:ring-0 outline-none appearance-none"
                        placeholder="email"
                        required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="mb-6">
                        <label htmlFor="password" className="block font-medium">
                        Password
                        </label>
                        <input
                        type="password"
                        id="password"
                        value={formData.password}
                        onChange={(e) => handleChange('password', e.target.value)}
                        className="inputBox w-full pt-2 focus:ring-0 outline-none appearance-none"
                        placeholder="password"
                        required
                        />

                        {/* Error message visible when passwords do not match */}
                        {loginErr && (
                            <div className="pt-2">
                                <a className="text-red-700">{loginErr}</a>
                            </div>
                        )}
                    </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="buttonBrown w-full font-medium py-2 rounded-md shadow cursor-pointer"
                        >
                            Login
                        </button>
                    </form>

                    {/* Register Link */}
                    <div className="mt-2 text-center flex justify-center block">
                        <p className="text-gray-600">
                            <Link to={"/register"} className="text-sm opacity-80" onClick={closeModal} >
                                Register here!
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginModal;