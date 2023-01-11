import {Link, Outlet} from "react-router-dom";
import {ReactComponent as CrownLogo} from "../../assets/crown.svg";
import "./navigation.styles.scss";
import {useContext} from "react";
import {UserContext} from "../../contexts/user.context";
import {signOutUser} from "../../services/firebase/firebase.service";
import {CartIcon} from "../../components/cart-icon/cart-icon.component";
import {CartDropdown} from "../../components/cart-dropdown/cart-dropdown.component";
import {CartContext} from "../../contexts/cart.context";

export const Navigation = function () {
    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);
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
                    {
                        currentUser ? (
                            <li className="navigation__item">
                                <span className="navigation__link" onClick={signOutUser}>Sign Out</span>
                            </li>
                        ) : (
                            <li className="navigation__item">
                                <Link className="navigation__link" to="/signin">Sign In</Link>
                            </li>
                        )
                    }
                    <li className="navigation__item">
                        <span className="navigation__link"><CartIcon/></span>
                    </li>
                </ul>
                {isCartOpen && <CartDropdown/>}
            </nav>
            {/* Render the nested routes */}
            <Outlet/>
        </>
    );
}