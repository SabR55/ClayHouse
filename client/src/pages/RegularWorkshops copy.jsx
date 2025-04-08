

function RegularWorkshops() {
    return(
        <div>
            <div className="relative -z-1">
                <img 
                    className="px-[10%] w-full"
                    src="/src/assets/images/trialClass-hero.jpg" 
                />

                <div className="absolute inset-0 flex items-center justify-center">
                    <p 
                        className="text-white text-5xl font-medium"
                        style={{fontFamily:"Josefin Sans, sans-serif"}}
                        >
                        Trial Class Workshop
                        </p>
                </div>
            </div>

            <div className="py-12 px-[10%]">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-1/3">
                        <img 
                            src="/src/assets/images/trialClass-image01.jpg"
                            className="w-full h-auto" 
                        />
                    </div>

                    <div className="w-full md:w-2/3 px-8">
                        <p className="mb-4 text-xl">You will learn the fundamental wheel-throwing techniques to create two simple vessels on an electric spinning wheel.</p>
                        
                        <p>Cost of Single Trial Class: <span className="font-medium">$70/pax</span></p>
                        <p>Duration of Trial Class: <span className="font-medium">Up to 3 hours</span></p>
                        <p>End product: <span className="font-medium">2 pottery works/pax</span></p>
                        <p>Class size: <span className="font-medium">up to 14 pax/session</span></p>
                        <p>Min age: <span className="font-medium">12 years old</span></p>
                        <p className="mb-4">All materials and tools will be provided</p>
                        
                        <p>Cost is inclusive of:</p>
                        <ul className="list-disc pl-5 mb-4">
                            <li>Firing of 2 pottery works (Extra charges apply for additional works)</li>
                            <li>Glazing will be done by our instructor (only transparent glaze available)</li>
                        </ul>

                        <p>Bookings are on a first come first served basis.</p>
                        <p>Bookings are only confirmed after payment is received</p>
                    </div>
                </div>
            </div>

            <hr className="w-2/3 mx-auto"/>
        </div>
    );
}

export default RegularWorkshops;