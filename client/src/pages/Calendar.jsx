import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Calendar({ workshopID, workshopPrice }) {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const [userID, setUserID] = useState(null); 
    const [errMsg, setErrMsg] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const today = new Date();

    useEffect(() => {
        
        // Check localStorage for user data when component mounts
        const getUserFromStorage = () => {
          
            const userDataString = localStorage.getItem('userInfo');
          
            if (userDataString) {
                try {
                const userData = JSON.parse(userDataString);
                if (userData.userName) {
                    setUserID(userData.userID);
                }
                } catch (error) {
                console.error('Error parsing user data from localStorage:', error);
                }
            }
        };
        
        getUserFromStorage();
    }, []);
    
    // Calculate tomorrow and one month ahead dates
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const oneMonthAhead = new Date();
    oneMonthAhead.setMonth(today.getMonth() + 1);
    oneMonthAhead.setHours(23, 59, 59, 999);

    const prevMonth = () => {
        // Only allow navigating to previous month if it contains selectable dates
        const prevMonthDate = new Date(currentDate);
        prevMonthDate.setMonth(currentDate.getMonth() - 1);
        
        // Check if the last day of previous month is after tomorrow
        const lastDayOfPrevMonth = new Date(prevMonthDate.getFullYear(), prevMonthDate.getMonth() + 1, 0);
        
        if (lastDayOfPrevMonth >= tomorrow) {
            setCurrentDate(prevMonthDate);
        }
    };

    const nextMonth = () => {
        // Only allow navigating to next month if it contains selectable dates
        const nextMonthDate = new Date(currentDate);
        nextMonthDate.setMonth(currentDate.getMonth() + 1);
        
        // Check if the first day of next month is before one month ahead
        const firstDayOfNextMonth = new Date(nextMonthDate.getFullYear(), nextMonthDate.getMonth(), 1);
        
        if (firstDayOfNextMonth <= oneMonthAhead) {
            setCurrentDate(nextMonthDate);
        }
    };

    const handleDateClick = (day) => {
        const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        
        // Only allow selecting dates between tomorrow and one month ahead
        if (clickedDate >= tomorrow && clickedDate <= oneMonthAhead) {
            setSelectedDate(clickedDate);
            setSelectedTime(null); // Reset selected time when a new date is chosen
        }
    };

    const handleTimeClick = (time) => {
        setSelectedTime(time);
    };

    const navigate = useNavigate();

    const handleBooking = () => {

        const bookingDetails = {
            date: formatDate(selectedDate),
            time: selectedTime,
            workshopID: workshopID,
            workshopPrice: workshopPrice
        };
    
        if (userID != null && workshopID == "001") {
            return axios.get(`/trial-class-userID/${userID}`)
                .then(response => {
                    if(response.data.num == 2) {
                        navigate("/workshop-payment", { state: bookingDetails });

                    } else if (response.data.num == 1) {
                        setErrMsg(true)
                        return;
                    }
                    
                })
                .catch(err => {
                    console.log("Error: " + err);
                });
        } else if ( userID!=null ) {
            return axios.post(`/book-workshop/${userID}`, bookingDetails)
                .then(response => {
                    console.log(response.data)
                    navigate('/profile/upcoming-classes')

                })
                .catch(err => {
                    console.log("Error: " + err);
                });
        }

        navigate("/workshop-payment", { state: bookingDetails });
    };

    const getWorkshopName = (workshopID) => {
        const workshopMap = {
          '001': 'Trial Class Workshop',
          '002': 'Regular Hand Throwing Workshop',
          '003': 'None'
        };
        
        return workshopMap[workshopID] || workshopID;
      };

    const renderDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();
        
        const days = [];
        
        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="empty p-1 md:p-2"></div>);
        }
        
        // Add cells for each day of the month
        for (let i = 1; i <= lastDate; i++) {
            const currentDay = new Date(year, month, i);
            const isToday = 
                i === today.getDate() && 
                month === today.getMonth() && 
                year === today.getFullYear();
            
            const isSelected = selectedDate && 
                i === selectedDate.getDate() && 
                month === selectedDate.getMonth() && 
                year === selectedDate.getFullYear();
            
            const isSelectable = currentDay >= tomorrow && currentDay <= oneMonthAhead;
            
            days.push(
                <div 
                    key={`day-${i}`}
                    onClick={() => isSelectable && handleDateClick(i)}
                    className={`day w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-sm md:text-base
                        ${isToday ? 'isToday font-semibold rounded-full' : ''} 
                        ${isSelected ? 'calendarIsSelected text-white font-semibold' : ''}
                        ${isSelectable ? 'cursor-pointer calendarIsSelectable rounded-full' : 'text-gray-300 cursor-not-allowed'}
                    `}
                >
                    {i}
                </div>
            );
        }
        
        return days;
    };
    
    const formatDate = (date) => {
        if (!date) return "Select a date";
        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    };

    const renderTimeSlots = () => {
        if (!selectedDate) return null;

        // Determine which time slots to show based on workshop value
        let timeSlots = [];
        
        if (workshopID === "001") {
            // 001 is Trial Class Workshop
            timeSlots = [
                { time: "12pm", slots: 10 }
            ];
        } else if (workshopID === "002" || workshopID ===  "003") {
            timeSlots = [
                { time: "3pm", slots: 10 },
                { time: "6pm", slots: 10 }
            ];
        } else {
            // Default case (if workshop is not specified or has a different value)
            timeSlots = [
                { time: "12pm", slots: 10 },
                { time: "3pm", slots: 10 }
            ];
        }

        return (
            <div className="mt-4 w-full">
                <div className="flex flex-col space-y-4">
                    {timeSlots.map((slot, index) => (
                        <div 
                            key={index}
                            onClick={() => handleTimeClick(slot.time)}
                            className={`p-3 md:p-4 border calendarTime rounded-lg cursor-pointer flex items-center justify-between
                                ${selectedTime === slot.time ? 'border-2 calendarSelectedTime' : ''}
                            `}
                        >
                            <div className="flex items-center">
                                <span className="font-medium">{slot.time}</span>
                            </div>
                            <span className="text-xs md:text-sm text-gray-500">{slot.slots} slots</span>
                        </div>
                    ))}
                </div>

                {selectedTime && (
                    <div>
                        <button 
                            onClick={handleBooking}
                            className="mt-6 buttonBrown w-full font-medium py-2 rounded-md shadow cursor-pointer"
                        >
                            Book
                        </button>
                        <p className='pt-4 text-red-700 text-center' style={{ display: errMsg ? "block" : "none" }}>You have booked a trial class before</p>
                    </div>
                )}
            </div>
        );
    };
    
    return(
        <div className="flex flex-col justify-center items-center w-full px-4 md:px-6">
            <div className="flex justify-center w-full">
                <div className="flex flex-col lg:flex-row gap-4 max-w-4xl">
                    <div className="w-full lg:w-1/2">
                        <div className="py-4 md:py-8 mb-4 calendar rounded-lg">
                            <div className="calendarHeader flex justify-between items-center mb-4 px-2">
                                <div 
                                    id="calendarPrev"
                                    className="calendarArrow p-1 md:p-2 rounded-full cursor-pointer hover:bg-gray-100"
                                    onClick={prevMonth}
                                >
                                    <ChevronLeft size={20} />
                                </div>

                                <div 
                                    id="calendarMthYr"
                                    className="text-base md:text-lg font-semibold"
                                >
                                    {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                                </div>

                                <div
                                    id="calendarNext" 
                                    className="calendarArrow p-1 md:p-2 rounded-full cursor-pointer hover:bg-gray-100"
                                    onClick={nextMonth}
                                >
                                    <ChevronRight size={20} />
                                </div>
                            </div>

                            <div className="calendarWeekdays grid grid-cols-7 text-center text-xs md:text-sm font-medium border-b pb-2 mb-2">
                                <div>Sun</div>
                                <div>Mon</div>
                                <div>Tue</div>
                                <div>Wed</div>
                                <div>Thu</div>
                                <div>Fri</div>
                                <div>Sat</div>
                            </div>

                            <div className="grid grid-cols-7 gap-1 text-center pt-2">
                                {renderDays()}
                            </div>
                        </div>

                        <div className="text-md mt-2">
                            <p>* Bookings are only available 1 month in advance</p>
                        </div>
                    </div>

                    <div className="border selectedDate p-4 md:p-8 flex flex-col rounded-lg w-full lg:w-1/2">
                        <div className="text-center mb-4">
                            <p className="text-base md:text-lg font-medium mb-2">Selected Date:</p>
                            <p className="text-lg md:text-xl">{formatDate(selectedDate)}</p>
                            <p className="opacity-80">{getWorkshopName(workshopID)}</p>
                        </div>
                        
                        {/* Render time slots if a date is selected */}
                        {renderTimeSlots()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Calendar;