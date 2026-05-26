import { Link } from "react-router-dom";

function NotFound() {
    return(
        <div className="min-h-screen bg-gray-800 flex flex-col gap-4 justify-center items-center font-montserrat">
            <div className="max-w-md flex flex-col gap-4">
                <p className="text-9xl font-black text-white/40 text-center tracking-wide">404</p>
                <p className=" text-3xl text-gray-50 italic">Oops, Page Not Found...</p>
                <Link to={'/'}>
                    <button className="p-4 bg-gray-50 hover:bg-gray-300 rounded-sm w-full text-lg cursor-pointer transition">Go to Payroll</button>
                </Link>
            </div>
        </div>
    );
}

export default NotFound;