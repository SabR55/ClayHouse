import { useState } from "react";
import { Link } from "react-router-dom";
import { X } from 'lucide-react';

function LoginModal({ closeModal }) {
    
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    
    const handleLogin = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Login attempt with:', formData);
        closeModal();
        // Reset form
        setFormData({ email: '', password: '' });
      };
    
    const handleChange = (field, value) => {
        setFormData({
          ...formData,
          [field]: value
        });
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
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="buttonBrown w-full pt- font-medium py-2 rounded-md shadow cursor-pointer"
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