import React from 'react'
import { useEffect, useState ,useContext } from 'react'
import { apiUrl } from '../../App';
import { Link } from 'react-router-dom';

const Collection = () => {
    const [products,setProducts] = useState([]);
    useEffect(() => {
        fetch(`${apiUrl}/products`)
            .then((res) => res.json())
            .then((data) => {

                if (data.data) {
                    setProducts(data.data);
                    console.log(data.data);
                }
            });
    }, []);
  return (
    <div className="flex flex-col py-8">
<h1>Collection</h1>
<div className="flex flex-col w-[80%] mx-auto gap-6 sm:flex-row sm:flex-wrap">
{products.map((prod,index)=>{
    if(prod?.subCategory?.name_en === "collection"){

        return(
   <Link to={`product/${prod._id}`} className="flex flex-col w-full gap-3 sm:w-[30%]"  data-aos="flip-up">
    <img src={prod.imageCover} className='w-full h-[350px] sm:h-[450px]' alt="" />
    <div className="text-black capitalize text-[30px]">{prod.title_en}</div>
    <div>{prod.description_en}</div>
    <div className="text-[13px] font-extrabold"> {prod.price  === 0 && prod.priceAfterDiscount <= 0 ? null  : prod.priceAfterDiscount > 0 ?<div>{prod.priceAfterDiscount} - {prod.price} $</div> : <div>{prod.price } $</div> }   </div>
   </Link> 
        )
    }
})}
</div>
    </div>
  )
}

export default Collection