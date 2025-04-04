import { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, Info } from 'lucide-react';

function Calendar({workshop}) {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const today = new Date();
    
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

    const handleBooking = () => {
        // Navigate to a new page with the booking details
        // This is a placeholder - you would implement actual navigation here
        const bookingDetails = {
            date: formatDate(selectedDate),
            time: selectedTime,
            workshop: workshop
        };
        
        // Example of how you might navigate in a real app
        // window.location.href = `/booking-confirmation?date=${encodeURIComponent(bookingDetails.date)}&time=${encodeURIComponent(bookingDetails.time)}&workshop=${encodeURIComponent(bookingDetails.workshop)}`;
        
        alert(`Booking confirmed for ${bookingDetails.date} at ${bookingDetails.time} for workshop ${bookingDetails.workshop}`);
    };

    const renderDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();
        
        const days = [];
        
        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="empty p-2"></div>);
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
                    className={`day w-10 h-10 flex items-center justify-center
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
        
        if (workshop === "001") {
            // For workshop 001, only show 12pm
            timeSlots = [
                { time: "12pm", slots: 10 }
            ];
        } else if (workshop === "002") {
            // For workshop 002, show 3pm and 6pm
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
            <div className="mt-4">
                <div className="flex flex-col space-y-4">
                    {timeSlots.map((slot, index) => (
                        <div 
                            key={index}
                            onClick={() => handleTimeClick(slot.time)}
                            className={`p-4 border calendarTime rounded-lg cursor-pointer flex items-center justify-between
                                ${selectedTime === slot.time ? 'border-2 calendarSelectedTime' : ''}
                            `}
                        >
                            <div className="flex items-center">
                                <span className="font-medium">{slot.time}</span>
                            </div>
                            <span className="text-sm text-gray-500">{slot.slots} slots</span>
                        </div>
                    ))}
                </div>

                {selectedTime && (
                    <button 
                        onClick={handleBooking}
                        className="mt-6 buttonBrown w-full font-medium py-2 rounded-md shadow cursor-pointer"
                    >
                        Book
                    </button>
                )}
            </div>
        );
    };
    
    return(
        <div
            className="flex flex-col justify-center items-center"
            >
            <div className="flex justify-center w-full">
                <div className='flex gap-8'>
                    <div>
                        <div className="py-8 mb-4 calendar rounded-lg">
                            <div className="calendarHeader flex justify-between items-center mb-4">
                                <div 
                                    id="calendarPrev"
                                    className="calendarArrow p-2 rounded-full cursor-pointer hover:bg-gray-100"
                                    onClick={prevMonth}
                                >
                                    <ChevronLeft size={22} />
                                </div>

                                <div 
                                    id="calendarMthYr"
                                    className="text-lg font-semibold"
                                >
                                    {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                                </div>

                                <div
                                    id="calendarNext" 
                                    className="calendarArrow p-2 rounded-full cursor-pointer hover:bg-gray-100"
                                    onClick={nextMonth}
                                >
                                    <ChevronRight size={22} />
                                </div>
                            </div>

                            <div className="calendarWeekdays grid grid-cols-7 text-center font-medium border-b pb-2 mb-2">
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

                        <div>
                            <p>* Bookings are only available 1 month in advance</p>
                        </div>
                    </div>

                    <div className="border p-8 flex flex-col rounded-lg" style={{width:"400px", height:"383px"}}>
                        <div className="text-center mb-4">
                            <p className="text-lg font-medium mb-2">Selected Date:</p>
                            <p className="text-xl">{formatDate(selectedDate)}</p>
                            {workshop && <p className="text-sm text-gray-500 mt-1">Workshop: {workshop}</p>}
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