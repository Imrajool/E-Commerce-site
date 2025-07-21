import { Fragment } from "react";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MDBDataTable } from 'mdbreact';
import { Link } from "react-router-dom";
import {getAdminProducts} from '../../actions/productActions'
import Loader from "../layouts/Loader";
import { toast } from "react-toastify";
import { clearError } from "../../slices/productsSlice";
import MetaData from '../layouts/MetaData'

import { Button } from "react-bootstrap";

export default function Products(){
    const {products= [],loading,error} = useSelector(state => state.productsState);
    const dispatch = useDispatch();

    useEffect(() =>{
         if(error){
             toast(error,{
                 type:'error',
                 position:'top-center',
                 onOpen : () => {dispatch(clearError())}
             })
         }
        dispatch(getAdminProducts())
    },[dispatch,error])

    const setProducts = () =>{
        const data ={
            columns:[
                {
                    label:'ID',
                    field:'id',
                    sort:'asc'
                },
                {
                    label:'Name',
                    field:'name',
                    sort:'asc'
                },
                {
                    label:'Price',
                    field:'price',
                    sort:'asc'
                },
                {
                    label:'Stock',
                    field:'stock',
                    sort:'asc'
                },
                {
                    label:'Actions',
                    field:'actions',
                    sort:'asc'
                }
            ],
            rows:[]
            }
            if (Array.isArray(products)) {
                products.forEach(product => {
                data.rows.push({
                    id: product._id,
                    name: product.name,
                    price: `$${product.price}`,
                    stock: product.stock,
                    actions:(
                         <Fragment>
                             <Link to={`/product/${product._id}`} className="btn btn-primary"><i className="fa fa-pencil"></i></Link>
                             <Button className="btn btn-danger py-1 px-2 ml-2">
                                 <i className="fa fa-trash"></i>
                             </Button>
                        </Fragment>
                     )
                })})
            return data;
        }
    }

    return (
        <Fragment>
            <MetaData title={'Admin-All Products'}/>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar/>
                </div>
                <div className="col-12 col-md-10" >
                    <h1 className="my-4">Products list</h1>
                    {loading ? 
                    <Loader/> : 
                    <MDBDataTable 
                    className="px-3"
                    bordered
                    striped
                    hover
                    data={setProducts()}/>
                    }
                    
                </div>
            </div>
        </Fragment>
    )
}
