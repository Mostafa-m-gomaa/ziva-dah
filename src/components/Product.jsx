import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState , useContext } from 'react'
import { apiUrl } from '../App';
import { AppContext } from '../App';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
const Product = () => {
    const param = useParams().id
    const {lang ,productIds, setProductIds , productsObj, setProductsObj }= useContext(AppContext)
    const [imageSrc, setImageSrc] = useState('')
    const [name,setName] = useState('')
    const [price,setPrice] = useState('')
    const [desc,setDesc] = useState('')
    const [images,setImages] = useState([])
    const [active,setActive] = useState(0)
    const [highlights,setHighlights] = useState([])
    const [showImage,setShowImage] = useState(false)
    const [showImageSrc,setShowImageSrc] = useState('')

    const handleImageClick = (sorce)=>{
        setShowImageSrc(sorce)
        setShowImage(true)
    }

    // const toggleProductId = (productId) => {
    //     setProductIds((prevIds) => {
    //       if (prevIds.includes(productId)) {
    //         // Remove the product ID from the array
    //         return prevIds.filter((id) => id !== productId);
    //       } else {
    //         // Add the product ID to the array
    //         return [...prevIds, productId];
    //       }
    //     });
    //     console.log(productIds.length)
     
    //   };
    const toggleProduct = (productId  ) => {
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
      const toggleProductId = (productId ) => {
        setProductIds((prevIds) => {
          if (prevIds.includes(productId)) {
            // Remove the product ID from the array
            return prevIds.filter((id) => id !== productId);
          } else {
            // Add the product ID to the array
            return [...prevIds, productId];
          }
        });
       
     toggleProduct(productId )
      };


    useEffect(() => {
        fetch(`${apiUrl}/products/${param}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.data) {
              setImageSrc(data.data.imageCover);
              setImages(data.data.images);
              setPrice(data.data.price);
      
              if (lang === 'ar') {
                setName(data.data.title_ar);
                setDesc(data.data.description_ar);
                setHighlights(data.data.highlights_ar);
              } else if (lang === 'en') {
                setName(data.data.title_en);
                setDesc(data.data.description_en);
                setHighlights(data.data.highlights_en);
              }
            }
          })
          .catch((error) => {
            console.error('Error fetching product data:', error);
          });
      }, [param, lang]);
      
    return (
    <div className="flex flex-col w-full bg-[#F0EEE4] gap-y-2  relative sm:pb-2 pt-44 sm:pt-52">
        {showImage ? <div className="fixed w-full h-full bg-[#00000073] z-20" onClick={()=>setShowImage(false)}></div>:null}
        {showImage ? <img className='fixed w-[80%] h-[60vh] left-[50%] top-[25%] translate-x-[-50%]  z-30 sm:h-[85vh] sm:top-[10%]' onClick={()=>setShowImage(false)} src={showImageSrc}/> :null}
        <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper h-[80vh]"
      >
        <SwiperSlide>   <img src={imageSrc} alt=""   onClick={()=>handleImageClick(img)}
              className={`w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] cursor-pointer `}
              /></SwiperSlide>
         {images.map((img,index)=>{
              return   <SwiperSlide key={index}>   <img src={img} alt=""   onClick={()=>handleImageClick(img)}
              className={`w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] cursor-pointer `}
              /></SwiperSlide>
     
    }
    )}
      </Swiper>
        <div className="flex flex-col gap-y-2 bg-black  w-full text-center justify-end  relative z-10  pb-2 " >

        <div className=" text-white top-[350px] capitalize left-6 text-[30px] sm:text-[40px]  tracking-[3px] z-20 bg-[#0000007a] w-fit mx-auto p-2 rounded-md">{name} </div>
        <div className="capitalize text-[#F0EEE4]">{desc} </div>
        <div className=" text-white top-[350px] capitalize left-6 text-[30px] sm:text-[40px]  tracking-[3px] z-20">{price} $</div>
        <button onClick={() => toggleProductId(param)} className='bg-[#143FB2] text-white w-fit p-2 cursor-pointer rounded-lg mx-auto transition-all hover:bg-black active:bg-white active:text-black'>{productIds.includes(param) ?"Added" :"Add To Cart +" }</button>
       
        </div>




    </div>
  )
}

export default Product