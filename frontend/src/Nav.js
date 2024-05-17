import scaled_logo from './scaled_logo.png'

function Nav() {
    return(
        <nav class="bg-dark-slate-gray flex items-center justify-between flex-wrap bg-teal-500 p-6">
            <div class="flex items-center flex-shrink-0 text-white mr-6">
                <img src={scaled_logo} className="pr-3" />
                <span class="font-semibold text-xl tracking-tight">DOOMsphere</span>
            </div>
        </nav>
    )
}

export default Nav;