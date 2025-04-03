import React from 'react'
import { useEffect, useState ,useContext } from 'react'
import { apiUrl } from '../../App';
import { Link } from 'react-router-dom';

const WordZiva = () => {
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
<h1>Word Of Ziva</h1>
<div className="flex flex-col w-[80%] mx-auto gap-6 sm:flex-row sm:flex-wrap">
{products.map((prod,index)=>{
    if(prod?.subCategory?.name_en === "collection"){

        return(
   <div className="flex flex-col w-full gap-3 sm:w-[30%]"  data-aos="zoom-in-down">
    <img src={prod.imageCover} className='w-full h-[350px] sm:h-[450px]' alt="" />
    <div className="text-black capitalize text-[30px]">{prod.title_en}</div>
    <div>{prod.description_en}</div>
    
   </div> 
        )
    }
})}
</div>
    </div>
  )
}

export default WordZiva