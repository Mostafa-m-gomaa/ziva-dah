import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState , useContext } from 'react'
import { apiUrl } from '../App';
import { AppContext } from '../App';
import { Link } from 'react-router-dom';
import transition from './Transition';

const Categories = () => {
    const param = useParams().id
    const {lang}= useContext(AppContext)
    const [imageSrc, setImageSrc] = useState('')
    const [name,setName] = useState('')
    const [subCategories, setSubCategories] = useState([]);


    useEffect(() => {
        fetch(`${apiUrl}/categories/${param}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.data) {
                  setImageSrc(data.data.imageCover)
                    if(lang==='ar'){
                    setName(data.data.name_ar)
                    }else if(lang==='en'){

                      setName(data.data.name_en)
                    }

                }
            });
    }, [param , lang]);
    useEffect(() => {
        fetch(`${apiUrl}/subCategories?category=${param}`)
            .then((res) => res.json())
            .then((data) => {
            
                if (data.data) {
           setSubCategories(data.data);
                    
                    
                }
            });
    }, [param ,lang]);
    return (
    <div className="flex flex-col relative w-full bg-[#F0EEE4] gap-y-2">
        <div className="absolute text-white top-[350px] capitalize left-6 text-[30px] sm:text-[40px]  tracking-[3px] z-20">{name} -</div>
<img src={imageSrc} alt="" className='w-full sm:h-[100vh] h-[80vh]' />
<div className="absolute z-2 w-full h-[80vh] bg-[#0000006b] "></div>
<div className="flex w-full p-[6px] gap-1 justify-center flex-wrap">
  {subCategories.map((sub)=>{
    let name , desc
    if(lang==='en'){
      name=sub.name_en
      desc = sub.description_en
    }else if(lang==='ar'){
      name=sub.name_ar
      desc = sub.description_ar
    }
    return(
      <Link to={`/subCat/${sub._id}`} className="w-[45%] h-[35vh] sm:h-[45vh] bg-white p-[2px] sm:w-[23%] flex flex-col gap-y-1" data-aos="fade-down">
<img src={sub.imageCover} alt="" className='max-w-[100%] min-w-[100%] max-h-[60%] min-h-[60%] sm:min-h-[70%] sm:max-h-[70%] ' />
<div className="w-[90%] mx-auto">
<div className="text-black text-[12px] capitalize">{name}</div>
<p className='max-w-[90%] overflow-hidden text-black text-[12px]' >{desc}</p>
</div>

      </Link>
    )
  })}
</div>
    </div>
  )
}

export default transition(Categories)