import { Fragment } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";

export default function Profile(){
    const {user}=useSelector(state => state.authState);
    return (
        <Fragment>
            <div className="container container-fluid">
                <h2 className="mt-5 ml-5">My Profile</h2>
                <div className="row justify-content-around mt-5 user-info">
                    <div className="col-12 col-md-3">
                        <figure className='avatar avatar-profile'>
                            <img className="rounded-circle img-fluid" src={user.avatar??'./images/default_avatar.png'} alt='' />
                        </figure>
                        <Link to={'/myprofile/updateProfile'} id="edit_profile" className="btn btn-primary btn-block my-5">
                            Edit Profile
                        </Link>
                    </div>
            
                    <div className="col-12 col-md-5">
                        <h4>Full Name</h4>
                        <p>{user.name}</p>
            
                        <h4>Email Address</h4>
                        <p>{user.email}</p>

                        <a href="javascript;" className="btn btn-danger btn-block mt-5">
                            My Orders
                        </a>

                        <Link to={'/myprofile/password/change'} className="btn btn-primary btn-block mt-3">
                            Change Password
                        </Link>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}