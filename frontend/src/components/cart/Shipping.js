import { Fragment, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import {countries} from 'countries-list'
import { saveShippingInfo } from "../../slices/cartSlice";
import CheckOutStep from './CheckoutStep'
import {toast} from 'react-toastify'

export const validateShipping = (shipping,navigate) =>{
    if(!shipping.address ||!shipping.city ||!shipping.state ||!shipping.phone ||!shipping.country ||!shipping.postalCode ){
        toast.error('Please fill the shipping information',{
            position:"top-center"
        })
        navigate('/shipping')
    }
}
 
export default function Shipping (){

    const {shippingInfo= {}}=useSelector(state => state.cartState)
    const dispatch = useDispatch();

    const [address,setAddress]=useState(shippingInfo.address)
    const [city,setCity]=useState(shippingInfo.city)
    const [phone,setPhone]=useState(shippingInfo.phone)
    const [postalCode,setPostalCode]=useState(shippingInfo.postalCode)
    const [country,setCountry]=useState(shippingInfo.country)
    const [state,setState]=useState(shippingInfo.state)
    const countryList=Object.values(countries)
    const navigate = useNavigate()

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(saveShippingInfo({address,city,phone,postalCode,state,country}))
        navigate('/order/confirm')
    }

    return (
        <Fragment>
            <CheckOutStep shipping/>
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-4">Shipping Info</h1>
                        <div className="form-group">
                            <label htmlFor="address_field">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city_field">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">Phone No</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="postal_code_field">Postal Code</label>
                            <input
                                type="number"
                                id="postal_code_field"
                                className="form-control"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="state_field">State</label>
                            <input
                                type="text"
                                id="state_field"
                                className="form-control"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="country_field">Country</label>
                            <select
                                id="country_field"
                                className="form-control"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                            >
                                {countryList.map((country , i) =>(
                                    <option key={i} value={country.name}>
                                        {country.name}
                                    </option>
                                ))}

                            </select>
                        </div>

                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            CONTINUE
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}