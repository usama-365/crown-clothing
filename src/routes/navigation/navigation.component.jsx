import {Link, Outlet} from "react-router-dom";
import {ReactComponent as CrownLogo} from "../../assets/crown.svg";
import "./navigation.styles.scss";

export const Navigation = function () {
    return (
        <>
            <nav className="navigation">
                <Link className="navigation__logo-container" to="/">
                    <CrownLogo className="navigation__logo"/>
                </Link>
                <ul className="navigation__list">
                    <li className="navigation__item">
                        <Link className="navigation__link" to="/shop">Shop</Link>
                    </li>
                </ul>
            </nav>
            {/* Render the nested routes */}
            <Outlet/>
        </>
    );
}