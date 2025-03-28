import { useState } from 'react';
import { ChevronDown, ChevronUp, Menu, Parentheses, X } from 'lucide-react';
import LoginModal from './pages/LoginModal';

function Navbar() {
    
    const [isLoggedin, setLoggedIn] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const [workshopOpen, setWorkshopOpen] = useState(false);
    const [rentalsOpen, setRentalsOpen] = useState(false);

    const [isOpen, setIsOpen] = useState(false);
    

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
    
    const toggleWorkshop = () => {
        setWorkshopOpen(!workshopOpen);
        if (rentalsOpen) setRentalsOpen(false);
    };

    const toggleRentals = () => {
        setRentalsOpen(!rentalsOpen);
        if (workshopOpen) setWorkshopOpen(false);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };


    return(
        <div>
            {/* Desktop Navigation. Hidden in Mobile view */}
            <div className='navbar navbarTopRow text-lg hidden md:flex justify-between'>
                <a className='font-bold text-xl'>Clay House</a>

                {!isLoggedin ? (
                    <a onClick={openModal}>Login/Register</a>) 
                    : (
                    <a>User Name</a>
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
                        <ChevronDown size={18} className='p'/>
                    </div>
                    

                    <div 
                        className={`absolute left-0 w-50 bg-white shadow-lg ${workshopOpen ? 'block' : 'hidden'}`}
                        onMouseEnter={() => setWorkshopOpen(true)}
                        onMouseLeave={() => setWorkshopOpen(false)}
                        >
                    <a href="#" className="navDropdownItem block py-2">Trial Class</a>
                    <a href="#" className="navDropdownItem block py-2">Regular Workshops</a>
                    </div>

                    
                </div>

                <div 
                    className="navberItem relative group"
                    onMouseEnter={() => setRentalsOpen(true)}
                    onMouseLeave={() => setRentalsOpen(false)}>

                    <div className='flex items-center'>
                        <a className='pr-1'>Rentals</a>
                        <ChevronDown size={18} />
                    </div>

                    <div 
                        className={`absolute left-0 w-50 bg-white shadow-lg ${rentalsOpen ? 'block' : 'hidden'}`}
                        onMouseEnter={() => setRentalsOpen(true)}
                        onMouseLeave={() => setRentalsOpen(false)}
                        >
                    <a href="#" className="navDropdownItem block py-2" style={{paddingLeft:"25px"}}>Kiln Rental</a>
                    <a href="#" className="navDropdownItem block py-2" style={{paddingLeft:"25px"}}>Studio Rental</a>
                    </div>
                </div>

                <a className='navberItem'>FAQ</a>
                <a className='navberItem'>Contact</a>
            </div>

            {/* Mobile Navigation */}
            <div className="navbarTopRow md:hidden flex items-center justify-between pr-4">
                <button
                onClick={toggleMobileMenu}
                className="p-4"
                >
                { !mobileMenuOpen ? <Menu /> : <X />}
                </button>
                
                <div className="navbar font-bold text-xl">Clay House</div>
                
                {/* Empty div for alignment */}
                <div className="w-10"></div>
            </div>

            {mobileMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <div className='navberItem'>
                            {!isLoggedin ? (
                            <a>Login/Register</a>) 
                            : (
                            <a>User Name</a>
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
                                href="#"
                                className="block navDropdownItem"
                                >
                                Trial Class
                                </a>
                                <a
                                href="#"
                                className="block navDropdownItem"
                                >
                                Regular Workshops
                                </a>
                            </div>
                            )}
                        </div>

                        <div>
                            <button
                            onClick={toggleRentals}
                            className="navberItem w-full text-left flex justify-between items-center"
                            >
                            Rentals
                            {rentalsOpen ? <ChevronUp size={18} /> : <ChevronDown size={18}/>}
                            </button>
                            {rentalsOpen && (
                            <div className="pl-4">
                                <a
                                href="#"
                                className="block navDropdownItem"
                                >
                                Kiln Rental
                                </a>
                                <a
                                href="#"
                                className="block navDropdownItem"
                                >
                                Studio Rental
                                </a>
                            </div>
                            )}
                        </div>

                        <a className='navberItem block'>FAQ</a>
                        <a className='navberItem block'>Contact</a>
                        </div>
                </div>
            )}

            {/* Modal Backdrop */}
            {isOpen && (
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