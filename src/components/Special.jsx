import React ,{useState , useContext} from 'react'
import {AppContext} from '../App'
import { apiUrl } from '../App'
import transition from './Transition';
import toast, { Toaster } from 'react-hot-toast';


const Special = () => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const [text,setText] = useState('')
    const [code,setCode] = useState('')
    const [address,setAddress] = useState('')
    const [whatsapp,setWhatsapp] = useState('')
    const [gold,setGold] = useState('')
    const {setLoader} = useContext(AppContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoader(true)
        fetch(`${apiUrl}/recommends`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                uername: name,
                username: name,
                email,
                phone,
                nameInside:text,
                 productCode:code,
                address,
                whatsapp,
                type:gold
            })
        })
        .then(res=>res.json())
        .then(data=>{
            setLoader(false)
            console.log(data)
            if(data.data){
toast.success('Your Order has been placed successfully we will contact you soon')
            }
           else if(data.status === "error"){
toast.error(data.message)
            }
           else if(data.errors){
toast.error(data.errors[0].msg)
            }
        })
    }

  return (
    <div className="flex flex-col bg-[#ebdede] pt-56">
<h1>order your spsecial order now </h1>
<p className='text-[gray] text-center py-4 capitalize text-[20px]'>you can choose from our menu and send the product code at the form </p>

<section className="bg-gray-100">
  <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
      <div className="lg:col-span-2 lg:py-12 flex justify-center items-center">
   

        <div className="text-[70px] uppercase">
    Ziva

         
        </div>
      </div>

      <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
        <form action="#" className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="sr-only" htmlFor="name">Name</label>
            <input
              className="w-full rounded-lg border-2 border-gray-900 p-3 text-sm"
              placeholder="Name"
              type="text"
              id="name"
              onChange={(e)=>setName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="sr-only" htmlFor="email">Email</label>
              <input
                className="w-full rounded-lg border-2 border-gray-500 p-3 text-sm"
                placeholder="Email address"
                type="email"
                id="email"
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="sr-only" htmlFor="phone">Phone</label>
              <input
                className="w-full rounded-lg border-2 border-gray-500 p-3 text-sm"
                placeholder="Phone Number"
                type="tel"
                id="phone"
                onChange={(e)=>setPhone(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="sr-only" htmlFor="name">Text at the accesorries</label>
            <input
              className="w-full rounded-lg border-2 border-gray-900 p-3 text-sm"
              placeholder="Text at the accesorries"
              type="text"
              id="name"
              onChange={(e)=>setText(e.target.value)}
            />
          </div>
          <div>
            <label className="sr-only" htmlFor="name">Product Code</label>
            <input
              className="w-full rounded-lg border-2 border-gray-900 p-3 text-sm"
              placeholder="Product Code"
              type="text"
              id="name"
              onChange={(e)=>setCode(e.target.value)}
            />
          </div>
          <div>
            <label className="sr-only" htmlFor="name">Your Address</label>
            <input
              className="w-full rounded-lg border-2 border-gray-900 p-3 text-sm"
              placeholder="Your Address"
              type="text"
              id="name"
              onChange={(e)=>setAddress(e.target.value)}
            />
          </div>
          <div>
            <label className="sr-only" htmlFor="name">Your Whatsapp Link</label>
            <input
              className="w-full rounded-lg border-2 border-gray-900 p-3 text-sm"
              placeholder="Your Whatsapp Link"
              type="text"
              id="name"
              onChange={(e)=>setWhatsapp(e.target.value)}
            />
          </div>
        <div>Gold Type</div>
          <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
            <div>
              <label
                htmlFor="Option1"
                className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
                tabIndex="0"
              >
                <input className="sr-only" onClick={()=>setGold("21")} id="Option1" type="radio" tabIndex="-1" name="option" />

                <span className="text-sm" onClick={()=>setGold("21")}> 21 </span>
              </label>
            </div>

            <div>
              <label
                htmlFor="Option2"
                className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
                tabIndex="0"
              >
                <input className="sr-only" id="Option2" type="radio" tabIndex="-1" name="option" onClick={()=>setGold("14")} />

                <span className="text-sm" onClick={()=>setGold("14")}> 14 </span>
              </label>
            </div>

       
          </div>

   

          <div className="mt-4">
            <button
              type="submit"
              className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
            >
              Send Enquiry
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default transition(Special)