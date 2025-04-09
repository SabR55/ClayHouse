import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LoginModal from './pages/LoginModal';

function Navbar() {
    
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);    // Toggle mobile menu open/close

    const [workshopOpen, setWorkshopOpen] = useState(false);        // Toggle Workshops dropdown menu
    const [userOpen, setUserOpen] = useState(false);

    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);// Login modal open/close

    const navigate = useNavigate();
    
    const openModal = () => setIsLoginModalOpen(true);
    const closeModal = () => {setIsLoginModalOpen(false); setMobileMenuOpen(false);}

    const [userName, setUserName] = useState(null);

    useEffect(() => {
        
        // Check localStorage for user data when component mounts
        const getUserFromStorage = () => {
          
            const userDataString = localStorage.getItem('userInfo');
          
            if (userDataString) {
                try {
                const userData = JSON.parse(userDataString);
                if (userData.userName) {
                    setUserName(userData.userName);
                }
                } catch (error) {
                console.error('Error parsing user data from localStorage:', error);
                }
            }
        };
        
        getUserFromStorage();
    }, []);
    
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    // Add missing toggleWorkshop function
    const toggleWorkshop = () => {
        setWorkshopOpen(!workshopOpen);
    };

    function toProfile() {
        navigate('/profile/book-classes');
    }

    function handleLogout() {
        
        // Clear all items from localStorage
        localStorage.clear();

        // Redirect to homepage
        window.location.href = '/';
    }


    return(
        <div>
            {/* Desktop Navigation. Hidden in Mobile view */}
            <div className='navbar navbarTopRow text-lg hidden md:flex justify-between'>
                <a 
                    className='font-bold text-xl cursor-pointer'
                    onClick={() => navigate('/')}
                    >Clay House</a>

                {(userName == null) ? (
                    <a className="cursor-pointer" onClick={openModal}>Login/Register</a>) 
                    : (
                        <div 
                            className="relative group"
                            onMouseEnter={() => setUserOpen(true)}
                            onMouseLeave={() => setUserOpen(false)}
                            >
                            {/* Trigger element */}
                            <a className="pr-1 cursor-pointer">Hi {userName}!</a>
                            
                            
                            {/* Dropdown menu */}
                            <div 
                                className={`absolute right-0 bg-white shadow-lg ${userOpen ? 'block' : 'hidden'}`}
                                onMouseEnter={() => setUserOpen(true)}
                                onMouseLeave={() => setUserOpen(false)}
                            >
                                <a className="navDropdownItem userDropdown block">
                                    <div 
                                        className="flex items-center justify-end px-4 cursor-pointer"
                                        onClick={toProfile}>
                                        Profile
                                    </div>
                                </a>
                                <a className="navDropdownItem userDropdown block">
                                    <div 
                                        className="flex items-center justify-end px-4 cursor-pointer"
                                        onClick={handleLogout}>
                                        Logout
                                    </div>
                                </a>
                            </div>
                            </div>
                    )}
            </div>

            {/* Desktop Navigation */}
            <div className='hidden md:flex justify-center items-center'>
                <div 
                    className="navberItem relative group"
                    onMouseEnter={() => setWorkshopOpen(true)}
                    onMouseLeave={() => setWorkshopOpen(false)}>

                    <div className='flex items-center'>
                        <a className='pr-1'>Workshops</a>
                        <ChevronDown size={18} />
                    </div>
                    

                    <div 
                        className={`absolute left-0 w-50 bg-white shadow-lg ${workshopOpen ? 'block' : 'hidden'}`}
                        onMouseEnter={() => setWorkshopOpen(true)}
                        onMouseLeave={() => setWorkshopOpen(false)}
                        >
                        <a 
                            className="navDropdownItem block py-2"
                            onClick={() => navigate('/trial-class')}
                            >
                            Trial Class</a>
                        <a 
                            className="navDropdownItem block py-2"
                            onClick={() => navigate('/regular-workshops')}
                            >Regular Workshops</a>
                    </div>

                    
                </div>

               
                <a className='navberItem' onClick={() => {navigate('/about')}}>About</a>
                <a className='navberItem' onClick={() => {navigate('/contact-us')}} >Contact</a>
            </div>

            {/* Mobile Navigation */}
            <div className="navbarTopRow md:hidden flex items-center justify-between pr-4">
                <button
                onClick={toggleMobileMenu}
                className="p-4 cursor-pointer"
                >
                { !mobileMenuOpen ? <Menu /> : <X />}
                </button>
                
                <div 
                    className="navbar font-bold text-xl cursor-pointer" 
                    onClick={() => {navigate('/'); setMobileMenuOpen(false)}}
                    >
                    Clay House
                    </div>
                
                {/* Empty div for alignment */}
                <div className="w-10"></div>
            </div>

            {mobileMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <div className='navberItem cursor-pointer' onClick={(userName == null) ? openModal : toProfile }>
                            {(userName == null) ? (
                            <a>Login/Register</a>) 
                            : (
                            <a>Hi {userName}!</a>
                            )}
                        </div>

                        <div>
                            <button
                            onClick={toggleWorkshop}
                            className="navberItem w-full text-left flex justify-between items-center"
                            >
                            Workshops
                            {workshopOpen ? <ChevronUp size={18} /> : <ChevronDown size={18}/>}
                            </button>
                            {workshopOpen && (
                            <div className="pl-4">
                                <a
                                    className="block navDropdownItem"
                                    onClick={() => {navigate('/trial-class'); setMobileMenuOpen(false);}}
                                    >
                                    Trial Class
                                </a>
                                <a
                                    className="block navDropdownItem"
                                    onClick={() => {navigate('/regular-workshops'); setMobileMenuOpen(false);}}
                                    >
                                    Regular Workshops
                                </a>
                            </div>
                            )}
                        </div>

                        
                        <a className='navberItem block' onClick={() => {navigate('/about'); setMobileMenuOpen(false);}}>About</a>
                        <a className='navberItem block' onClick={() => {navigate('/contact-us'); setMobileMenuOpen(false);}}>Contact</a>
                        {(userName != null) && 
                            <a 
                                className='navberItem block'
                                onClick={handleLogout}
                                >
                                Logout</a>}
                        </div>
                </div>
            )}

            {/* Modal Backdrop */}
            {isLoginModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">

                    {/* Separate backdrop div with the background */}
                    <div className="absolute inset-0 bg-black opacity-50"></div>

                    {/* Modal content positioned above the backdrop */}
                    <div className="z-10 relative">
                        <LoginModal
                            closeModal={closeModal}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Navbar;