import scaled_logo from './scaled_logo.png'
import  {useNavigate} from 'react-router-dom';

function Navbar({children}) {
    const navigate=useNavigate();
    return(
        <div>
            <nav class="bg-dark-slate-gray flex items-center flex-wrap p-6 space-x-20">
                <div class="flex items-center flex-shrink-0 text-white mr-6 px-5">
                    <img src={scaled_logo} className="pr-3" />
                    <span class="font-semibold text-timberwolf text-xl tracking-tight">DOOMsphere</span>
                </div>
                <div class="flex w-full block flex-grow lg:flex lg:items-center lg:w-auto ml-auto items-stretch px-5 justify-end">
                    {children}
                </div>
            </nav>
        </div>
    )
}

export default Navbar;