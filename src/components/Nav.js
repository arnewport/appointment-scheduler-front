import { Link, NavLink } from "react-router-dom";

function Nav() {

    return (
        <div className="d-flex align-items-center">
            <ul className="nav my-4">
                <li className="nav-item">
                    <NavLink id="linkTable" to="/" className="nav-link">Table</NavLink>
                </li>
            </ul>
            <div className="d-flex flex-grow-1 justify-content-end">
                <Link id="btnCreate" to="/create" className="btn btn-info">Create</Link>
            </div>
            <div className="d-flex flex-grow-1 justify-content-end">
                <Link id="btnSearch" to="/search" className="btn btn-info">Search</Link>
            </div>
        </div>
    );
}

export default Nav;