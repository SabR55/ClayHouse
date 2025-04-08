
function ContactUs() {
    return(
        <div className="flex flex-wrap py-12 px-4 md:px-16 lg:px-24">
            <div className="w-full md:w-1/2 py-2 px-4 md:px-8">
                <img 
                src="/src/assets/images/regularClass-image02.jpg"
                alt="Contact us image" 
                className="w-full rounded-lg shadow-md"
                />
            </div>
            <div className="w-full md:w-1/2 pt-4 px-4 md:px-8 text-xl">
                <h2 className="text-4xl font-semibold text-gray-800">
                Contact Us!
                </h2>
                <p className="pt-4 text-gray-700">+65 9800 6700</p>
                <p className="pt-2 text-gray-700">admin@clayhouse.sg</p>
                <p className="pt-2 text-gray-700">
                Southside Plaza<br/>
                79 Anson Rd #03-03<br/>
                Singapore 079906
                </p>
            </div>
        </div>
    )
}

export default ContactUs;