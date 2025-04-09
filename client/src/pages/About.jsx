import images from '../assets/assets.js';

function About() {
    return(
        <div className="w-full">
            <div>
                <div className="w-full py-2 text-white" style={{backgroundColor:"#6B5B4D"}}>
                    <h1 
                        className="pt-8 text-3xl font-semibold pb-4 text-center"
                        style={{fontFamily:"Josefin Sans, sans-serif"}}
                        >
                        Clay House - Full Stack MERN Project
                        </h1>
                </div>

                <div className="mx-[10%]">
                    <p className="text-2xl font-semibold pt-8">
                        Project Overview
                    </p>
                    <p className="w-full md:w-2/3 text-lg pt-2">
                        Clay House represents my comprehensive full-stack development capabilities through the creation of a booking platform for a fictional pottery business. This project demonstrates my proficiency in building modern, responsive web applications with a seamless integration between frontend and backend technologies.
                    </p>
                </div>
            </div>

            <div 
                className="mx-[7%] px-[3%] rounded-lg my-12"
                style={{ backgroundColor: "#E2D9CD" }}
                >
                <div className="pt-8 pl-4 text-3xl font-bold">Technical Stack</div>
                <div className="flex flex-wrap pt-2 pb-4 pl-4">
                    <div className="w-full md:w-1/2 py-2">
                        <p className="text-xl font-semibold py-2">Frontend Development</p>
                        <ul className="list-disc text-lg px-5">
                            <li className="pt-2">
                                <a>
                                <span className="font-semibold">React.js: </span> 
                                Built a dynamic, responsive user interface with reusable components</a>
                            </li>
                            <li className="pt-2">
                                <a>
                                <span className="font-semibold">Tailwind CSS: </span> 
                                Implemented a modern, utility-first CSS framework for efficient styling and responsive design</a>
                            </li>
                            <li className="pt-2">
                                <a>
                                <span className="font-semibold">React Router: </span> 
                                Developed intuitive navigation with protected routes for authenticated users</a>
                            </li>
                            <li className="pt-2">
                                <a>
                                <span className="font-semibold">Custom Components: </span> 
                                Created reusable UI elements for consistent user experience throughout the application</a>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/2 pt-2 pb-2">
                        <p className="text-xl font-semibold">Backend Development</p>
                        <ul className="list-disc text-lg px-5">
                            <li className="pt-2">
                                <a>
                                <span className="font-semibold">Node.js & Express: </span> 
                                Constructed a robust RESTful API architecture</a>
                            </li>
                            <li className="pt-2">
                                <a>
                                <span className="font-semibold">MongoDB: </span> 
                                Designed and implemented a non-relational database with optimized schemas</a>
                            </li>
                            <li className="pt-2">
                                <a>
                                <span className="font-semibold">Bcrypt: </span> 
                                Implemented secure password hashing for user authentication</a>
                            </li>
                            <li className="pt-2">
                                <a>
                                <span className="font-semibold">CryptoJS: </span> 
                                Utilized advanced encryption for sensitive payment information</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="mx-[7%]">
                
                <div class="flex flex-col md:flex-row w-full">
                    <div class="md:w-1/2 p-4">
                        <img 
                            class="w-full"
                            src={images.trialClassImage01}
                            alt="Trial Class Hero Image"
                        />
                    </div>
                    
                    <div class="md:w-1/2 pl-6 flex flex-col justify-center">
                        <h1 class="text-3xl font-bold mb-2">Core Functionalities</h1>
                        <p className="text-lg pb-2">This MERN stack application showcases my ability to develop complex, interconnected features including:</p>
                        <ul className="list-disc text-lg px-5">
                            <li className="pt-2">
                                <a>
                                <span className="font-semibold">Node.js & Express: </span> 
                                Constructed a robust RESTful API architecture</a>
                            </li>
                            <li className="pt-2">
                                <a>
                                <span className="font-semibold">MongoDB: </span> 
                                Designed and implemented a non-relational database with optimized schemas</a>
                            </li>
                            <li className="pt-2">
                                <a>
                                <span className="font-semibold">Bcrypt: </span> 
                                Implemented secure password hashing for user authentication</a>
                            </li>
                            <li className="pt-2">
                                <a>
                                <span className="font-semibold">CryptoJS: </span> 
                                Utilized advanced encryption for sensitive payment information</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="mx-[10%] py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* section 1 - takes 2/3 width on large screens */}
                    <div className="lg:w-2/3">
                        <h1 className="text-3xl font-bold mb-2">Technical Challenges & Solutions</h1>
                        <p className="text-lg pb-2">Throughout this project, I tackled several complex implementation challenges, including:</p>
                        <ul className="list-disc text-lg px-5">
                            <li className="pt-2">
                                <a>Developing a class booking system</a>
                            </li>
                            <li className="pt-2">
                                <a>Creating a secure payment processing system with encrypted credit card information</a>
                            </li>
                            <li className="pt-2">
                                <a>Implementing password hashing for user security</a>
                            </li>
                            <li className="pt-2">
                                <a>Designing an intuitive user interface with Tailwind CSS's responsive framework</a>
                            </li>
                        </ul>

                        <p className="text-lg pt-4">
                            This project exemplifies my full-stack development skills and my ability to create comprehensive, production-ready web applications from concept to deployment.
                        </p>
                    </div>

                    {/* section 2 - takes 1/3 width on large screens */}
                    <div className="lg:w-1/3 flex items-center justify-center">
                        <img
                            className="w-2/3 max-w-xs"
                            src={images.homeBookingIcon}
                            alt="Second image"
                        />
                    </div>
                </div>
            </div>

            <div className="mx-[10%] py-12 text-lg text-center">
                <hr className="pb-8 "/>
                <h1 className="text-3xl font-bold mb-2">My Other Works</h1>
                <p>My Resume:&nbsp;
                    <a className="hover:underline font-medium"
                        href="https://drive.google.com/drive/folders/1mwNmVUkT0h37h56EGBkJ70shv36mBGWy?usp=sharing" target="_blank"
                        >
                        Sab's Resume
                    </a>
                </p>
                <p>Another MERN Project:&nbsp;
                    <a className="hover:underline font-medium"
                        href="https://shadownspirits-client.onrender.com/" target="_blank"
                        >
                        Shadow & Spirits
                    </a>
                </p>
                <p>Behance:&nbsp;
                    <a className="hover:underline font-medium"
                        href="https://www.behance.net/sab_r" target="_blank"
                        >
                        Sab's Behance Page
                    </a>
                </p>
                <p>GitHub:&nbsp; 
                    <a className="hover:underline font-medium"
                        href="https://github.com/SabR55" target="_blank"
                        >
                        Sab's GitHub Page
                    </a>
                </p>
            </div>
        </div>
    )
}

export default About;