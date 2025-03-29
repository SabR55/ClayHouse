import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";
import axios from 'axios';


function Register() {

    
    const [showPassword, setShowPassword] = useState(false);                // Toggle password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);  // Toggle password visibility
    const [pwdMatchErrMsg, setPwdMatchErrMsg] = useState(false);            // Password error message
    const [confirmationModal, setConfirmationModal] = useState(false);      // Registration Confirmation Modal

    const navigate = useNavigate();


    // Form Data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
    });

    // Confirm Password Input
    const [confirmPassword, setConfirmPassword] = useState('');
    
    // Form Handle Change
    const handleChange = (id, value) => {
        setFormData({
            ...formData,
            [id]: value
        });
    };

    // Submit Form
    function handleRegister(e) {
        e.preventDefault();

        // If passwords do not match, error message appears
        if (formData.password !== confirmPassword){
            setPwdMatchErrMsg(true);
            return;

        }
        
        setConfirmationModal(true);

        try {
            axios.post('/register', formData);

            console.log(formData);

            // Return user to homepage
            navigate('./');
        } catch (error) {
            // Close confirmation modal
            setConfirmationModal(false);
            
            // Log the error for debugging
            console.error('Registration error:', error);
        }

    
    };

    return(
        <div>
            <div className="py-8 text-center" style={{backgroundColor:"#6B5B4D", color:"#FCF8F0", margin:"0 10%"}}>
                <a className="text-2xl"> Register</a>
            </div>

            <div className="flex justify-center border-1 py-8">
                <form className="p-8 grid gric-cols-1 gap-6 w-80" onSubmit={handleRegister}>
                    <div>
                        <label className="font-medium">
                            Name
                        </label>
                        <input 
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            placeholder="name"
                            className="inputBox w-full pt-2 focus:ring-0 outline-none appearance-none"
                            />
                    </div>

                    <div>
                        <label className="font-medium">
                            Email
                        </label>
                        <input 
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            className="inputBox w-full pt-2 focus:ring-0 outline-none appearance-none"
                            placeholder="email"
                            requried
                            />
                    </div>

                    <div>
                        <label className="font-medium">
                            Phone
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            className="inputBox w-full pt-2 focus:ring-0 outline-none appearance-none" 
                            placeholder="phone"
                            requried
                            />
                    </div>

                    <div>
                        <label className="font-medium">
                            Password
                        </label>
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={(e) => handleChange('password', e.target.value)}
                                className="inputBox w-full pt-2 focus:ring-0 outline-none appearance-none" 
                                placeholder="password"
                                required
                                />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                            >
                                {showPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
                            </button>
                        </div>

                    </div>
                    
                    <div>
                        <label className="font-medium">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input 
                                type={showConfirmPassword ? "text" : "password"}
                                name="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="inputBox w-full pt-2 focus:ring-0 outline-none appearance-none" 
                                placeholder="password"
                                required
                                />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                            >
                                {showConfirmPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
                            </button>
                        </div>
                        
                        {/* Error message visible when passwords do not match */}
                        {pwdMatchErrMsg && (
                            <div className="pt-2">
                                <a className="text-red-700">Passwords do not match.</a>
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="buttonBrown w-full font-medium py-2 rounded-md shadow cursor-pointer">
                        submit
                    </button>

                </form>
            </div>

            {/* Registration Confirmation Modal */}
            {confirmationModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">

                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black opacity-50"
                        // onClick={navigate('/')}
                        onClick={() => navigate('/')}
                    ></div>

                    {/* Modal content positioned above the backdrop */}
                    <div className="bg-white rounded-lg shadow-xl z-10 w-80 max-w-md overflow-hidden">
                        <div className="px-6 pt-8 pb-4">
                            <div className="text-center mb-6">
                                <h3 
                                    className="text-xl font-bold"
                                    style={{fontFamily: "'Josefin Sans', sans-serif"}}
                                > 
                                    Registration Successful!
                                </h3>
                            </div>
                            
                            <button 
                                className="buttonBrown w-full font-medium py-2 rounded-md shadow cursor-pointer"
                                onClick={() => navigate('/')}
                            >
                                Ok
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Register;