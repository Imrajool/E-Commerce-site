import React, { Fragment } from 'react';
import Search from './Search';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Image,Dropdown} from 'react-bootstrap'
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { logoutUser } from '../../actions/userActions';

export default function Header (){
    const {isAuthenticate,user}=useSelector(state => state.authState)
    const {items:cartItems} = useSelector(state => state.cartState)
    const dispatch=useDispatch();
    const navigate=useNavigate();
    // const bufferToBase64 = (bufferData) => {
    //     if (!bufferData) return null;
    //     const binary = new Uint8Array(bufferData).reduce(
    //         (acc, byte) => acc + String.fromCharCode(byte),
    //         ''
    //     );
    //     return `data:image/jpeg;base64,${window.btoa(binary)}`;
    // };
    const logoutHandler=()=>{
        dispatch(logoutUser)
    }

    return (
        <nav className="navbar row">
            <div className="col-12 col-md-3">
                <div className="navbar-brand">
                    <Link to={'/'}>
                        <img width="150px" src="/images/logo.png" alt='My Cart logo' />
                    </Link>
                </div>
            </div>

            <div className="col-12 col-md-6 mt-2 mt-md-0">
               <Search/>
            </div>

            <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                { isAuthenticate ? 
                    (
                    <Dropdown className='d-inline'>
                        <Dropdown.Toggle variant='default text-white pr-5' id='dropdown-basic'>
                            <figure className='avatar avatar-nav'>
                            <Image
                                width="50px"
                                src={
                                    user?.avatar
                                        ? user.avatar.startsWith('http')
                                        ? user.avatar
                                        : `http://localhost:8000/${user.avatar}` // adjust for your backend port
                                        : '/images/default_avatar.png'
                                }
                                alt="avatar"
                            />
                            </figure>
                            <span>{user?.name}</span>
                        </Dropdown.Toggle>
                        <DropdownMenu>
                            <Fragment>
                            {user && user.role === 'admin' &&
                            <DropdownItem onClick={() => navigate('/admin/dashboard')} className='text-dark'>Dashboard</DropdownItem> }
                            <DropdownItem onClick={() => navigate('/myprofile')} className='text-dark'>Profile</DropdownItem>
                            <DropdownItem onClick={() => navigate('/myOrder')} className='text-dark'>My Orders</DropdownItem>
                            <DropdownItem onClick={logoutHandler} className='text-danger'>Logout</DropdownItem>
                            </Fragment>
                        </DropdownMenu>
                    </Dropdown>

                    ) :
                    <Link to="/login" className="btn" id="login_btn">Login</Link>
                }
                <Link to={'/cart'} id="cart" className="ml-3">Cart</Link>
                <span className="ml-1" id="cart_count">{cartItems.length}</span>
            </div>
        </nav>
    )
}