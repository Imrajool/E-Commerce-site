import { Fragment, useEffect, useState } from "react"
import {useDispatch, useSelector} from 'react-redux'
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { createAdminProducts } from "../../actions/productActions";
import {toast} from 'react-toastify'
import { clearError, clearIsProductCreated } from "../../slices/productSlice";
import MetaData from '../layouts/MetaData'

export default function NewProduct(){

    const {loading,error,isProductCreated} = useSelector(state => state.productState)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name,setName] = useState('');
    const [price,setPrice] = useState();
    const [description,setDescription] = useState('');
    const [category,setCategory] = useState(null);
    const [stock,setStock] = useState('');
    const [seller,setSeller] = useState('');
    const [images,setImages] = useState([]);
    const [imagesPreview,setImagesPreview] = useState([]);

    const categories=[
        'Electronics',
        'Food',
        'Beauty and Healthcare',
        'Home Appliances',
        'Accessories'
    ];
    
    const onImageChange = (e) =>{
       const files = Array.from(e.target.files);

       files.map(file =>{
        const reader = new FileReader();
        
        reader.onload = () =>{
            if(reader.readyState === 2){
              setImagesPreview(oldArray => [...oldArray,reader.result])
              setImages(oldArray => [...oldArray,file])
           }
        }

        reader.readAsDataURL(file)
       })
    }

     const submitHandler = (e) =>{
         e.preventDefault();
         const formData = new FormData();
         formData.append('name',name)
         formData.append('price',price)
         formData.append('description',description)
         formData.append('stock',stock)
         formData.append('category',category)
         formData.append('seller',seller)

         images.forEach(image => {
            formData.append('images',image)
         })
        dispatch(createAdminProducts(formData))
     }
    
    useEffect(() =>{
       if(isProductCreated){
        toast("Product Created Successfully",{
            type:'success',
            position:'top-center',
            onOpen: () => {dispatch(clearIsProductCreated())}
        })
        navigate('/admin/products')
        return
       }
       if(error){
        toast(error,{
            type:'error',
            position:'top-center',
            onOpen: () => {dispatch(clearError())}
        })
        return
       }
    },[isProductCreated,error,dispatch])

    return (
        <Fragment>
            <MetaData title={'Admin-Create Product'}/>
        <div className="col-12 col-md-2">
            <Sidebar/>
        </div>
        <div className="wrapper my-5"> 
            <form className="shadow-lg" encType='multipart/form-data' onSubmit={submitHandler}>
                <h1 className="mb-4">New Product</h1>

                <div className="form-group">
                <label htmlFor="name_field">Name</label>
                <input
                    type="text"
                    id="name_field"
                    className="form-control"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                </div>

                <div className="form-group">
                    <label htmlFor="price_field">Price</label>
                    <input
                    type="text"
                    id="price_field"
                    className="form-control"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description_field">Description</label>
                    <textarea className="form-control" id="description_field" rows="8" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="category_field">Category</label>
                    <select className="form-control" id="category_field" onChange={e => setCategory(e.target.value)}>
                        <option value="">Select</option>
                        {categories.map(category=>
                            <option
                            key={category}
                            value={category}
                            >{category}</option>
                        )}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="stock_field">Stock</label>
                    <input
                    type="number"
                    id="stock_field"
                    className="form-control"
                    value={stock}
                    onChange={e => setStock(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="seller_field">Seller Name</label>
                    <input
                    type="text"
                    id="seller_field"
                    className="form-control"
                    value={seller}
                    onChange={e => setSeller(e.target.value)}
                    />
                </div>
                
                <div className='form-group'>
                    <label>Images</label>
                    
                        <div className='custom-file'>
                            <input
                                type='file'
                                name='product_images'
                                className='custom-file-input'
                                onChange={onImageChange}
                                id='customFile'
                                multiple
                            />
                            <label className='custom-file-label' htmlFor='customFile'>
                                Choose Images
                            </label>
                        </div>
                </div>
                {imagesPreview.map(image =>(
                    <img className="mt-3 mr-2"
                    key={image}
                    src={image}
                    alt={'Image Preview'}
                    width='55'
                    height='52'></img>
                ))}
    
                <button
                id="login_button"
                type="submit"
                className="btn btn-block py-3"
                disabled={loading}
                >
                CREATE
                </button>

            </form>
        </div>
        </Fragment>
    )
}