import { YoutubeIcon } from "lucide-react";


function Home() {
    return(
        <div className="w-full">
            <img
            className="px-[10%] w-full"
            src="src/assets/images/home-hero.jpg" />

            <div className="flex flex-col items-center text-center py-16 px-10">
                <hr className="w-2/3" />
                <p className="py-8 text-2xl">Get your hands dirty and your creativity flowing!</p>
                <hr className="w-2/3" />
            </div>
            

            <div className="flex flex-col justify-center items-center w-full" style={{padding:"0 10%"}} >
                {/* 1st Section */}
                <div className="flex justify-center items-center w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
                        <div className="flex justify-center items-center p-4">
                        <img
                            className="w-full max-w-md"
                            src="/src/assets/images/home-image01.jpg"
                            alt="Home image"
                        />
                        </div>
                        
                        <div className="flex items-center p-4">
                        <p className="text-lg md:text-left w-full">Transform ordinary clay into extraordinary creations at Clay House. Our hands-on classes welcome beginners and experienced potters alike in a supportive, inspiring environment where creativity flows as freely as conversation.</p>
                        </div>
                    </div>
                </div>

                {/* 2nd Section */}
                <div className="flex justify-center items-center w-full4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
                        <div className="flex items-center p-2 order-2 md:order-1">
                            <p className="text-lg md:text-left w-full">
                            Clay House began as a passion project between ceramic artists Maya Lin and Daniel Ng in 2018. <br/><br/>

                            The studio has grown from a small workshop into a vibrant creative hub in Singapore. Our talented instructors guide students of all levels in a welcoming community where ancient pottery traditions meet contemporary expression, celebrating the joy of creating with our hands.
                            </p>
                        </div>
                        
                        <div className="flex justify-center items-center p-4 order-1 md:order-2">
                            <img
                            className="w-full max-w-md"
                            src="/src/assets/images/home-image02.png"
                            alt="Second image"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Section */}
            <div className="mt-16 py-16 flex flex-col items-center text-center" style={{backgroundColor:"#E2D9CD"}}>
                <img
                    className="w-18 mb-4"
                    src="/src/assets/images/home-book-trial-icon.svg"
                    alt="Second image"
                />

                <p 
                    className="text-2xl font-semibold"
                    style={{fontFamily:"Josefin Sans, sans-serif"}}
                >
                    Turn curiosity into creativity <br/> 
                    Reserve your seat at the wheel!
                </p>

                <button className="buttonBrown w-60 text-lg font-medium py-2 px-4 mt-8 rounded-md shadow cursor-pointer">
                    Book Trial Class
                </button>
            </div>
        </div>
    );
}

export default Home;
