import {Link, Outlet} from "react-router-dom";
import {ReactComponent as CrownLogo} from "../../assets/crown.svg";
import "./navigation.styles.scss";
import {useContext} from "react";
import {UserContext} from "../../contexts/user.context";
import {signOutUser} from '../../services/firebase/firebase.service';

export const Navigation = function () {
    const {currentUser, setCurrentUser} = useContext(UserContext);

    const signOutHandler = async function () {
        await signOutUser();
        setCurrentUser(null);
    }

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
                                <Link className="navigation__link" onClick={signOutHandler} to='/signin'>Sign Out</Link>
                            </li>
                        ) : (
                            <li className="navigation__item">
                                <Link className="navigation__link" to="/signin">Sign In</Link>
                            </li>
                        )
                    }

                </ul>
            </nav>
            {/* Render the nested routes */}
            <Outlet/>
        </>
    );
}