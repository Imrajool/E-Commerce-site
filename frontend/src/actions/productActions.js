import axios from 'axios'
import{productsRequest,productsSuccess,productsFail, getAdminProductsRequest, getAdminProductsSuccess, getAdminProductsFail} from '../slices/productsSlice'
import { productFail, productRequest, productSuccess,createReviewFail,createReviewSuccess,createReviewRequest, newProductRequest, newProductSuccess, newProductFail } from '../slices/productSlice'

export const getProducts = ({ keyword ,price, category,rating, currentPage=1}) => async (dispatch) => {
  try {
    dispatch(productsRequest());

    let link = `/api/v1/products?page=${currentPage}`;

    
    if (keyword) link += `&keyword=${keyword}`;

    if (price &&
      Array.isArray(price) &&
      price.length === 2 &&
      typeof price[0] === 'number' &&
      typeof price[1] === 'number') {
      link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`;
    }
     if(category) link +=`&category=${category}`;

    if (rating) link += `&rating=${rating}`;


    const { data } = await axios.get(link);
    dispatch(productsSuccess(data));


  } catch (error) {
    dispatch(productsFail(error.response.data.message));
  }
};




export const getProduct= id=>async (dispatch)=>{
    try {
        dispatch(productRequest());//requesting data using reducers with the help of action creators
        
        const {data} = await axios.get(`/api/v1/product/${id}`)  

        dispatch(productSuccess(data));//Collecting the requested data using reducers with the help of action creators
    } catch (error) {
        dispatch(productFail(error.response.data.message));//Reporting error using reducers with the help of action creators
    }
}

export const createReview = reviewData => async(dispatch)=>{
    try {
        dispatch(createReviewRequest())
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const {data}=await axios.put(`/api/v1/review`,reviewData,config)
        dispatch(createReviewSuccess(data))
    } catch (error) {
        dispatch(createReviewFail(error.response.data.message))
    }
}


//Admin get products
export const getAdminProducts = () => async(dispatch) => {
    try {
        dispatch(getAdminProductsRequest());
        const {data} = await axios.get('/api/v1/admin/products')
        dispatch(getAdminProductsSuccess(data))
    } catch (error) {
        dispatch(getAdminProductsFail(error.response.data.message))
    }
}

export const createAdminProducts = (formData) => async(dispatch) => {
    try {
        dispatch(newProductRequest());
        const config = {
            headers:{
                'Content-type':'multipart-form-data'
            }
        }
        const {data} = await axios.post('/api/v1/admin/product/new',formData,config)
        dispatch(newProductSuccess(data))
    } catch (error) {
        dispatch(newProductFail(error.response.data.message))
    }
}