import React, { useContext, useEffect } from "react";
import { useState } from "react";
import "./article.css";
import { AppContext } from "../../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContentTop from "../ContentTop/ContentTop";
import { Link, useParams } from "react-router-dom";

const EditSub = () => {
    const param =useParams().id
  const [showConfirm, setShowConfirm] = useState(false);
  const [artId, setArtId] = useState("");
  const [refresh, setRefresh] = useState(false);
  const {route, setLoader } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [categories,setCategories] = useState([]);
  const [catId, setCatId] = useState("");
 
  const [image, setImage] = useState(null);

  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [descAr, setDescAr] = useState("");
  const [descEn, setDescEn] = useState("");



 

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    } else {
      setImage(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
if(nameAr){

    formData.append("name_ar", nameAr);
}
if(nameEn){
    formData.append("name_en", nameEn); }
    if(catId){
    formData.append("category", catId); }
    if(descAr){
    formData.append("description_ar", descAr); }
    if(descEn){
    formData.append("description_en", descEn); }
    if(image){
    formData.append("imageCover", image); }
        
 
  
    setLoader(true);
    try {
      const response = await fetch(`${route}subCategories/${param}`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          
        },
      }).then((res) => res.json());
      setLoader(false);
      console.log(response);
      if (response.data) {
        toast.success("Edited Successfully");
        setRefresh(!refresh);
      } else if (response.errors) {
        toast.error(response.errors[0].msg);
      } else {
        console.log(response);
        toast.error("هناك خطأ");
      }
    } catch (error) {}
  };

  const deleteArt = async () => {
    setShowConfirm(false);
    setLoader(true);

    try {
      const response = await fetch(`${route}/subCategories/${artId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      console.log(response);
      if (response.ok) {
        toast.success("Deleted Successfully");
        setRefresh(!refresh);
      } else if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Only try to parse JSON if the response has content
      const data = response.status !== 204 ? await response.json() : null;

      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetch(`${route}/categories`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setCategories(data.data);
        }
      });
  }, [refresh]);
  useEffect(() => {
    fetch(`${route}/subCategories`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.data) {
          setUsers(data.data);
          console.log(data.data);
        }
      });
  }, [refresh]);
  return (
    <div className="articles">
      <ContentTop headTitle="Users" />

      {showConfirm ? (
        <div className="confirm">
          <div>are yoy sure ?</div>
          <div className="btns">
            <button onClick={deleteArt} className="yes">
              Yes
            </button>
            <button onClick={() => setShowConfirm(false)} className="no">
              No
            </button>
          </div>
        </div>
      ) : null}
      <div className="container">
        <div className="add">
          <h1>Edit Sub Category</h1>
          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="">
              Name Ar
              <input
                onChange={(e) => setNameAr(e.target.value)}
                type="text"
              />
            </label>
            <label htmlFor="">
              Name En
              <input
                onChange={(e) => setNameEn(e.target.value)}
                type="text"
              />
            </label>
            <label htmlFor="">
              Image
              <input
                 onChange={handleImageChange}
                type="file"
              />
            </label>
            <label htmlFor="">
              Category
              <select name="" id="" onChange={(e)=>setCatId(e.target.value)}>
                <option value="">select Category</option>
                {categories.map((cate) => (
                  <option key={cate._id} value={cate._id}>
                    {cate.name_en}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="">
              description Ar
              <input
                onChange={(e) => setDescAr(e.target.value)}
                type="text"
              />
            </label>
            <label htmlFor="">
              description En
              <input
                onChange={(e) => setDescEn(e.target.value)}
                type="text"
              />
            </label>
         
  
         
            
           
       

            <button type="submit">Edit</button>
          </form>
        </div>
   
      </div>
    </div>
  );
};

export default EditSub;
