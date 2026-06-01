import { Link } from "react-router-dom";
import AnimatedButton from "../components/AnimatedButton";

function NotFound() {
    return(
        <div className="min-h-screen bg-clx-green flex flex-col gap-4 justify-center items-center font-montserrat">
            <div className="max-w-md flex flex-col gap-4 text-center">
                <p className="text-8xl font-sans font-black text-white/80 ">404</p>
                <p className=" text-3xl text-gray-50 italic">Oops, Page Not Found...</p>
                <Link to={'/'}>
                    <AnimatedButton style={"gap-2 bg-white hover:bg-gray-200 px-8 py-3 text-black font-montserrat font-medium text-base rounded-sm w-full transition-colors"}>Go to Payroll</AnimatedButton>
                </Link>
            </div>
        </div>
    );
}

export default NotFound;