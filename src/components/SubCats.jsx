import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState , useContext } from 'react'
import { apiUrl } from '../App';
import { AppContext } from '../App';
import { Link } from 'react-router-dom';

const SubCategory = () => {
    const param = useParams().id
    const {lang ,productIds, setProductIds , productsObj, setProductsObj }= useContext(AppContext)
    const [imageSrc, setImageSrc] = useState('')
    const [name,setName] = useState('')
    const [desc,setDesc] = useState('')
    const [category, setCategory] = useState('')
    const [subCategories, setSubCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const histtory = useNavigate()
   

    // const [productIds, setProductIds] = 
  
    // Save the productIds array to sessionStorage whenever it changes
  

    const toggleProduct = (productId, price , imageSrc , name) => {
      setProductsObj((prevProducts) => {
        const productIndex = prevProducts.findIndex(product => product.productId === productId);
    
        if (productIndex !== -1) {
          return prevProducts.filter(product => product.productId !== productId);
        } else {
          return [...prevProducts, { productId, price , imageSrc , name}];
        }
      });
    };
  
    // Toggle function to add/remove product IDs
    const toggleProductId = (productId ,price , imageSrc ,name) => {
      setProductIds((prevIds) => {
        if (prevIds.includes(productId)) {
          // Remove the product ID from the array
          return prevIds.filter((id) => id !== productId);
        } else {
          // Add the product ID to the array
          return [...prevIds, productId];
        }
      });
     
   toggleProduct(productId , price , imageSrc ,name)
    };
  

    useEffect(() => {
        fetch(`${apiUrl}/subCategories/${param}`)
            .then((res) => res.json())
            .then((data) => {
              console.log(data)
                if (data.data) {
                  setImageSrc(data.data.imageCover)
                  if(lang==='ar'){
                    setName(data.data.name_ar)
                    setDesc(data.data.description_ar)
                    setCategory(data.data.category.name_ar )
                  }
                  else if(lang==='en'){

                    setName(data.data.name_en)
                    setDesc(data.data.description_en)
                    setCategory(data.data.category.name_en )
                  }

                }
         
            });
    }, [param ,lang]);

    useEffect(() => {
        fetch(`${apiUrl}/products?subCategory=${param}`)
            .then((res) => res.json())
            .then((data) => {
            
                if (data.data) {
        
                 
                    setProducts(data.data);
                    
                }
            });
    }, [param]);
    return (
    <div className="flex flex-col relative w-full bg-[#F0EEE4] gap-y-2">
        <div className="absolute text-white top-[350px] capitalize left-6 text-[30px] sm:text-[40px]  tracking-[3px] z-20">{category} - {name} </div>
        <p className='absolute text-white top-[400px] left-6 '>{desc}</p>
<img src={imageSrc} alt="" className='w-full h-[80vh]' />
<div className="absolute z-2 w-full h-[80vh] bg-[#0000006b] "></div>
<div className="flex w-full p-[6px] gap-1 justify-center flex-wrap">
  {products.map((sub)=>{
    let name , desc
    if(lang==='en'){
      name=sub.title_en
      desc = sub.description_en
    }else if(lang==='ar'){
      name=sub.title_ar
      desc = sub.description_ar
    }
    return(
      <div to={`/subCat/${sub._id}`} key={sub._id} className="relative w-[45%] h-[35vh] sm:h-[50vh] bg-white p-[2px] sm:w-[23%] flex flex-col gap-y-1 justify-center">
        <Link to={`/product/${sub._id}`} className='w-[100%] h-[100%]  relative '>
<img src={sub.imageCover} alt="" className='max-w-[100%] min-w-[100%] max-h-[60%] min-h-[60%] sm:min-h-[60%] sm:max-h-[60%]  ' />
        </Link>
<div className="w-[90%] mx-auto absolute bottom-2 left-1" >
<div className="text-black text-[12px] capitalize">{name}</div>
<p className='max-w-[90%] overflow-hidden text-black text-[12px]' >{desc}</p>
<div className="text-[13px] font-extrabold"> {sub.price  === 0 && sub.priceAfterDiscount <= 0 ? null  : sub.priceAfterDiscount > 0 ?<div>{sub.priceAfterDiscount} - {sub.price} $</div> : <div>{sub.price } $</div> }   </div>
</div>

<button onClick={() => toggleProductId(sub._id , sub.price , sub.imageCover ,name)}  className={`hover:rotate-90 active:bg-[#488AEC] active:text-white transition-all border-2 border-[#488AEC] p-0
          w-[27px] h-[27px] rounded-full text-[20px]
       font-bold ${productIds.includes(sub._id ) ? "bg-[#488AEC]" : "bg-white" }  ${productIds.includes(sub._id ) ? "text-white" : "text-[#488AEC]" }   absolute top-2 left-2 leading-none `}>
  <div  className='absolute top-[0%] left-[50%] translate-x-[-50%]'>+</div>
</button>

      </div>
    )
  })}
</div>
    </div>
  )
}

export default SubCategory