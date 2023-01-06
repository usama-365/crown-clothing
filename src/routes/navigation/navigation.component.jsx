import {Link, Outlet} from "react-router-dom";

export const Navigation = function () {
    return (
        <>
            <nav className="navigation">
                <Link className="navigation__logo-container" to='/'>
                    <div className="navigation__logo">Logo</div>
                </Link>
                <ul className="navigation__list">
                    <li className="navigation__item">
                        <Link className="navigation__link" to='/shop'>Shop</Link>
                    </li>
                </ul>
            </nav>
            {/* Render the nested routes */}
            <Outlet/>
        </>
    );
}