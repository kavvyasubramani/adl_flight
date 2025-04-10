import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
    return (
        <div className='nav'>
            <div className="nav-logo">SkyConnect</div>
            <ul className="nav-menu">
                <li><Link to="/home">Meals</Link></li> {/* ✅ Link to Meals Page */}
                <li><Link to="/movies">Movies</Link></li>
                <li><Link to="/moments">Moments</Link></li>
                <li className='nav-home'><Link to="/">Home</Link></li>
            </ul>
        </div>
    );
};

export default Navbar;
