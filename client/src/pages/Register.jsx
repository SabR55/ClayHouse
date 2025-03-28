import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

function Register() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
    });

    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [pwdMatchErrMsg, setPwdMatchErrMsg] = useState(false);
    
    const handleChange = (id, value) => {
        setFormData({
            ...formData,
            [id]: value
        });
    };

    function handleRegister (e) {
        e.preventDefault();
        
        // If passwords do not match, an error message will appear
        if (formData.password !== confirmPassword){
            setPwdMatchErrMsg(true);
            return;

        } else {
            alert("Passwords match!");
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
                            required
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
        </div>
    );
}

export default Register;