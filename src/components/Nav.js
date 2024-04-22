import { Link, NavLink } from "react-router-dom";

function Nav() {

    return (
        <div className="d-flex align-items-center">
            <ul className="nav my-4">
                <li className="nav-item">
                    <NavLink id="linkTable" to="/" className="nav-link">Table</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink id="linkCreate" to="/create" className="nav-link">Create</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink id="linkSearch" to="/searching" className="nav-link">Search</NavLink>
                </li>
            </ul>
            
        </div>
    );
}

export default Nav;