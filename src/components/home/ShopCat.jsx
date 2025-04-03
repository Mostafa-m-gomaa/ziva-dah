import React from 'react'
import { useEffect, useState ,useContext } from 'react'
import { apiUrl, AppContext } from '../../App';
import { Link } from 'react-router-dom';
const ShopCat = () => {
    const {lang} =useContext(AppContext)
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch(`${apiUrl}/categories`)
            .then((res) => res.json())
            .then((data) => {

                if (data.data) {
                  setCategories(data.data)
                    console.log(data.data);
                }
            });
    }, []);
  return (
  <div className="flex flex-col bg-[#F0EEE4] gap-3 py-6">
    <h1 className='italic '>Shop By Category </h1>
    <p className='w-[80%] text-black mx-auto text-center'>Illuminating the many facets of Swarovski from heritage to lifestyle and beyond.</p>
    <div className="flex flex-col w-[80%] mx-auto gap-4 sm:flex-row sm:flex-wrap">
    {categories.map((cat,index)=>{
        return(
            <Link to={`cat/${cat._id}`} className="flex flex-col w-full sm:w-[31%] gap-3 bg-white p-4"  data-aos="flip-right">
                <img src={cat.imageCover} alt="" className='h-[200px] rounded md:h-[250px] 2xl:h-[400px]'/>
                <div className='text-center  capitalize text-[20px]'>{cat.name_en} </div>
            </Link>
        )
    })}
    </div>

  </div>
  )
}

export default ShopCat