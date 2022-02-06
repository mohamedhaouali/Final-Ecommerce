import React, { useContext } from 'react'
import { GlobalState } from '../../GlobalState'

import Menu from './icon/menu.svg'
import Close from './icon/close.svg'
import Cart from './icon/cart.svg'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Header() {
    // ta5ou donnes mil Global State

    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart


    //logout
    const logoutUser = async () => {
        await axios.get('/user/logout')

        //token

        localStorage.removeItem('firstLogin')

        //(lorsque utilisateur se deconnecte le panier est vide)

        window.location.href = "/";


    }


    // redirection vers interface admin (s'il itilisateur admin)
    const adminRouter = () => {
        return (
            <>
                <li><Link to="/create_product">Create Product</Link></li>
                <li><Link to="/category">Categories</Link></li>
            </>
        )
    }

    //logout

    const loggedRouter = () => {
        return (
            <>
                <li><Link to="/history">History</Link></li>
                <li><Link to="/" onClick={logoutUser} >Logout</Link></li>
            </>
        )
    }

    return (
        <header>
            <div className="menu">
                <img src={Menu} alt="" width="30" />
            </div>

            <div className="logo">
                {/* si utilisateur admin */}
                <h1>
                    <Link to="/">{isAdmin ? 'Admin' : 'DevAT Shop'} </Link>
                </h1>
            </div>

            <ul>
                {/* si utilisateur admin For create products */}
                <li><Link to="/">{isAdmin ? 'Products' : 'Shop'}</Link></li>


                {isAdmin && adminRouter()}
                {
                    isLogged ? loggedRouter() : <li><Link to="/login">Login ✥ Register</Link></li>
                }
                <li>
                    <img src={Close} alt='' width="30" className='menu' />
                </li>

            </ul>

            {
                isAdmin ? ''
                    : <div className="cart-icon">
                        <span>{cart.length}</span>
                        <Link to="/cart">
                            <img src={Cart} alt="" width="30" />
                        </Link>
                    </div>
            }



        </header>
    )
}

export default Header