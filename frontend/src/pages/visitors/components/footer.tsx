export function Footer(){

    return(
        <>
               <footer className="flex flex-col  bg-blue-950 text-teal-500 p-6">
        <div className="flex flex-col justify-center md:flex-row  md:justify-around ">
            <div className="flex flex-col space-y-4 my-10 md:my-5">
                <b className="text-2xl">About US</b>
                <ul className="space-y-4">
                    <li><a href="About-US#vision_and_mission">Mission</a></li>
                    <li><a href="About-US#vision_and_mission">Vision</a></li>
                    <li><a href="About-US#co-msg">Message From Our CEO</a></li>
                    <li><a href="About-US#co-founder">Meet the Co-founders</a></li>
                    <li><a href="About-US#team">Meet the Team</a></li>
                </ul>
            </div>
            <div className="flex flex-col space-y-4 my-10 md:my-5">
                <b className="text-2xl">Programs</b>
                <ul className="space-y-4">
                    <li><a href="/Programs#ourOfferings">Capacity Building Programs</a></li>
                    <li><a href="/Programs#ourOfferings">Accelerator Startups</a></li>
                    <li><a href="/Programs#Value_Added_Partners">Value Added Partners</a></li>
                </ul>
            </div>
    
            <div className="flex flex-col space-y-4 my-10 md:my-5">
                <b className="text-2xl">Advisory</b>
                <ul className="space-y-4">
                    <li><a href="/Advisory">Advisory Services</a></li>
                    <li><a href="/Advisory">Our Portfolio</a></li>
                </ul>
            </div>
    
            <div className="flex flex-col space-y-4 my-10 md:my-5">
                <b className="text-2xl">Projects</b>
                <ul className="space-y-4">
                    <li><a href="/Research-Products">Research Products</a></li>
                </ul>
            </div>
    
            <div className="flex flex-col space-y-4 my-10 md:my-5">
                <b className="text-2xl">Media Center</b>
                <ul className="space-y-4">
                    <li><a href="/Media-Center#news">News</a></li>
                    <li><a href="/Media-Center#gallery">Gallery</a></li>
                    <li><a href="/Media-Center#videos">Videos</a></li>
                </ul>
            </div>
    
            <div className="flex flex-col space-y-4 my-10 md:my-5">
                <b className="text-2xl">Contact Us</b>
                <ul>
                    <li><a href="mailto:info@entlaq.com">info@entlaq.com</a></li>
                </ul>
            </div>
        </div>
        <div className="flex flex-row justify-between my-10 text-slate-50">
            <small className="">&copy; 2024 Entlaq | All Rights Reserved</small>
            <div className="text-2xl mx-4 space-x-2">
                <a href="#"><i className="fa-brands fa-linkedin "></i></a>
                <a href="#"><i className="fa-brands fa-instagram"></i></a>
                <a href="#"><i className="fa-brands fa-facebook"></i></a>
                <a href="#"><i className="fa-brands fa-x-twitter"></i></a>
                <a href="#"><i className="fa-brands fa-tiktok"></i></a>
            </div>
        </div>
    </footer>
        </>
    )
}