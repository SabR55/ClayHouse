import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function TrialClassNewUser() {

    const location = useLocation();
    const formData = location.state;

    return(
        <div className="pt-8 pb-16 flex justify-center">
            <div className="border rounded-lg w-96 p-12">
                <h1 className="pb-8 text-2xl font-semibold text-center">Trial Class Booking <br/> Confirmed!</h1>

                <div className="flex w-full">
                    <div className="w-1/3 font-medium mb-2">Name:</div>
                    <div className="w-2/3 text-right">{formData.name}</div>
                </div>

                <div className="flex w-full">
                    <div className="w-1/3 font-medium mb-2">Email:</div>
                    <div className="w-2/3 text-right">{formData.email}</div>
                </div>

                <div className="flex w-full">
                    <div className="w-1/3 font-medium mb-2">Phone:</div>
                    <div className="w-2/3 text-right">{formData.phone}</div>
                </div>

                <div className="flex w-full">
                    <div className="w-1/3 font-medium mb-2">Credit Card:</div>
                    <div className="w-2/3 text-right">**** **** **** *{formData.cardNum.slice(-3)}</div>
                </div>

                <div className="border-t w-full pt-4">
                    <p className="pt-4 pb-2 text-lg font-semibold">Trial Class Workshop</p>
                    <div className="flex w-full">
                        <div className="w-1/3 font-medium mb-2">Date:</div>
                        <div className="w-2/3 text-right">{formData.date}, {formData.time}</div>
                    </div>
                    <div className="flex w-full">
                        <div className="w-1/3 font-medium mb-2">Price:</div>
                        <div className="w-2/3 text-right">$ {formData.price}</div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default TrialClassNewUser;