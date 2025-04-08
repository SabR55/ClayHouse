import { Instagram, Facebook } from "lucide-react";

function Footer() {
    return(
        <div className="py-12 px-8 px-[10%]" style={{ backgroundColor: "#392E26", color: "#FCF8F0" }}>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Section 1 - Main Branding */}
            <div className="flex-1 text-center sm:text-left mb-8 md:mb-0">
              <p 
                className="text-2xl font-semibold mb-2"
                style={{fontFamily:"Josefin Sans, sans-serif"}} 
              >
                Clay House</p>
              <p>Discover the art of play with clay</p>
            </div>

            {/* Section 2 - Contact & Social */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row gap-8">
                {/* Contact Information */}
                <div className="flex-1 w-70 text-center sm:text-left mb-8 sm:mb-0">
                  <p className="text-lg font-semibold mb-3">Contact Us</p>
                  <p className="mb-2">+65 9800 6700</p>
                  <p className="mb-2">admin@clayhouse.sg</p>
                  <p className="mb-2">
                    Southside Plaza <br/>
                    79 Anson Rd #03-03 <br/>
                    Singapore 079906</p>
                </div>

                {/* Social Media */}
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-lg font-semibold mb-3">Follow us</p>
                  <div className="flex gap-4 items-center">
                    <Instagram size={22}/>
                    <Facebook size={22}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
}

export default Footer;