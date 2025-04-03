import React from 'react'
import { useEffect, useState ,useContext } from 'react'
import { apiUrl } from '../App';
import { Link } from 'react-router-dom';
import { CiMenuBurger } from "react-icons/ci";
import { AppContext } from '../App';
import { TiShoppingCart } from "react-icons/ti";



const Nav = () => {
    const [categories, setCategories] = useState([]);
    const [navList, setNavList] = useState(false);
    const [subCategories, setSubCategories] = useState([]);
    const {lang,setLang}= useContext(AppContext)
    const [isChecked, setIsChecked] = useState(false);
    const {productIds}= useContext(AppContext)

    const handleCheckboxChange = (event) => {
      setIsChecked(event.target.checked); 
      if(event.target.checked){
        setNavList(true)
      }
      else{
        setNavList(false)
      }
    };
    const checkIfChecked = () => {
        if (isChecked) {
          alert('Checkbox is checked');
        } else {
          alert('Checkbox is not checked');
        }
      };
    useEffect(() => {
        fetch(`${apiUrl}/categories` ,{
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => {

                if (data.data) {
                    setCategories(data.data);
                
                }
            });
    }, []);
    useEffect(() => {
        fetch(`${apiUrl}/subCategories`)
            .then((res) => res.json())
            .then((data) => {

                if (data.data) {
                    setSubCategories(data.data);
                    console.log(data.data);
                }
            });
    }, []);
    return (
        <div className=" transition-all  bg-[#fafafa73]  fixed w-full top-0 left-0 z-50 sm:hover:bg-white sm:hover:bg-none text-white sm:hover:text-black  pb-2 ">
             <Link to="cart" className="fixed  bg-white p-2 top-3 left-3 border-black z-10 text-black text-[25px] rounded-2xl cursor-pointer"><TiShoppingCart />
             <div className="absolute bg-red-600 text-white rounded-[50%] text-[20px] w-[30px] h-[30px] flex justify-center items-center right-[-12px]">{productIds.length}</div>
             </Link>
            <div className="burger absolute text-[35px] text-black right-2 top-4 cursor-pointer  p-1 rounded-xl sm:hidden  w-[50px]  "  >
        
    <label class="hamburger absolute left-[-15px] top-[-20px]">
  <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange}  />
  <svg viewBox="0 0 32 32">
    <path class="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
    <path class="line" d="M7 16 27 16"></path>
  </svg>
</label>
            </div>
            <div className="container flex flex-col ">
                <Link to='/' className="text-center text-[100px] font-racing font-normal ">ZIVA</Link>
                <div className={`w-fit  h-[100vh] sm:h-fit sm:w-full bg-gray-700 sm:bg-inherit top-0  py-2 transition-all z-50 fixed sm:absolute ${navList ? "left-0" : "-left-[100%]"} bottom-[-130%] sm:relative sm:left-0`}>
                    <div className="container mx-auto px-4 gap-y-3 flex flex-col sm:flex-row sm:justify-around sm:relative">
                        <h1 className='sm:hidden text-[35px] text-center border-b-4'>ZIVA</h1>
                        {categories.map((cat, index) => {
                            let name
                            if(lang==='en'){
                                name=cat.name_en}
                            else if(lang==='ar'){
                                name=cat.name_ar
                            }
                            return (
                                <Link to={`cat/${cat._id}`} key={index} onClick={() => {setIsChecked(!isChecked) , setNavList(!navList)}} className=" group capitalize sm:border-b-4 w-fit px-2  border-transparent sm:pb-2  sm:hover:border-black transition-all ">- {name}
                                    <div className="transition-all gap-3 absolute  bg-white -bottom-30 overflow-hidden  p-4 pt-20  hidden sm:group-hover:flex sm:rounded justify-center left-[-3%] sm:left-0 w-screen sm:w-[100%] sm:hover:flex flex-wrap overflow-y-scroll h-[67vh]">
                                        {subCategories.map((sub, index) => {
                                            let subName 
                                            let catName 
                                            if(lang==='en'){
                                                subName=sub.name_en
                                                catName = sub?.category?.name_en || "no-cat";
                     
                                            }
                                            else if(lang==='ar'){
                                                subName=sub.name_ar
                                                catName = sub?.category?.name_ar || "no-cat";
                                              
                                            }
                                            if(name === catName){
                                                return (
                                                    <Link to={`subCat/${sub._id}`} className="w-[45%] flex rounded-xl py-2 group justify-between gap-y-1 px-16 items-center hover:bg-black hover:text-white transition-all">
                                                        <Link to={`subCat/${sub._id}`} className="capitalize sm:border-b-4 border-transparent sm:pb-2  sm:hover:border-black transition-all border ">{subName}</Link>
                                                        <img src={sub.imageCover} className='max-w-[150px]  rounded min-w-[150px] max-h-[100px] min-h-[100px]' alt="" />
                                                    </Link>
                                                )
                                            }
                                
                                        })}
                                    </div>

                                </Link>

                            )
                        })}
                                   <Link to={`/special`}  onClick={() => {setIsChecked(!isChecked) , setNavList(!navList)}} className=" group capitalize sm:border-b-4 border-transparent sm:pb-2  sm:hover:border-black transition-all ">Special Orders</Link>
                                   <Link to={`/contact`}  onClick={() => {setIsChecked(!isChecked) , setNavList(!navList)}} className=" group capitalize sm:border-b-4 border-transparent sm:pb-2  sm:hover:border-black transition-all ">Contact Us</Link>
                                   <Link to={`/about`} onClick={() => {setIsChecked(!isChecked) , setNavList(!navList)}} className=" group capitalize sm:border-b-4 border-transparent sm:pb-2  sm:hover:border-black transition-all ">About Us</Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Nav