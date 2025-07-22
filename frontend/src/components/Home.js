import { Fragment } from "react/jsx-runtime";
import MetaData from "./layouts/MetaData";
import { useEffect, useState } from "react";
import { getProducts } from "../actions/productActions";
import { useDispatch, useSelector } from 'react-redux';
import Loader from "./layouts/Loader";
import Product from "./product/Product";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Pagination from 'react-js-pagination'
import { useParams } from "react-router-dom";

export default function Home (){
    const dispatch=useDispatch();
    const {products,loading,error,productsCount,resPerPage}=useSelector((state)=> state.productsState)
    const [currentPage,setCurrentPage]=useState(1)
    const{keyword}=useParams()

    const setCurrentPageNo =(pageNo)=>{
       setCurrentPage(pageNo)
    }

    useEffect(()=>{
        if(error){
            toast.error(error,{ 
                position: "top-center"
               })

        }
        
        dispatch(getProducts({keyword:null,price:null,category:null,rating:null,currentPage}))
    },[error,dispatch,currentPage,keyword])

    return (
        <Fragment>
            {loading ? <Loader/> :
                <Fragment>
                    <MetaData title='Buy Products' />
                    <h1 id="products_heading">Latest Products</h1>
                    <section id="products" className="container mt-5">
                        <div className="row">
                            { products && products.map(product =>(
                                <Product col={3} key={product._id} product={product}/>
                            ))
                            }
                        
                        </div>
                    </section>
                    {productsCount>0 && productsCount > 3 ?
                    <div className="d-flex justify-content-center mt-5">
                        <Pagination
                           activePage={currentPage}
                           onChange={setCurrentPageNo}
                           totalItemsCount={productsCount}
                           itemsCountPerPage={resPerPage}
                           nextPageText={'Next'}
                           firstPageText={'First'}
                           lastPageText={'Last'}
                           itemClass={'page-item'}
                           linkClass={'page-link'}
                        />
                    </div> : null }
                </Fragment>
            }
        </Fragment>
    )
}