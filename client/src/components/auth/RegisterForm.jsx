import { useForm } from "react-hook-form"
import { signUpSchema } from "../../utils/validation"
import { yupResolver } from "@hookform/resolvers/yup"
import AuthInput from "./AuthInput"
import { useDispatch, useSelector } from "react-redux"
import { PulseLoader } from "react-spinners"
import { Link, useNavigate } from "react-router-dom"
import { changeStatus, registerUser } from "../../features/userSlice"
import { useState } from "react"
import Picture from "./Picture"
import axios from "axios"

const cloud_name =process.env.REACT_APP_CLOUD_NAME
const cloud_secret  = process.env.REACT_APP_CLOUD_SECRET

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState : {errors} 
  }= useForm({
    resolver : yupResolver(signUpSchema)
  })

  const [picture,setPicture] = useState();
  const [readablePicture,setReadablePicture] = useState()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {status,error} = useSelector((state) => state.user)

  const onSubmit  = async (data) => {
    let Secureurl= ""
    dispatch(changeStatus('loading'))
    if(picture){
      //upload to cloudinary and register
     Secureurl =  await uploadImage(picture)
    }

    const res = await dispatch(registerUser({...data,picture:Secureurl}))

   if(res?.payload?.user){
    navigate('/')
   }
  }

  //uploading image in cloudinary from client side
  const uploadImage = async(file)=>{
    const formData = new FormData()
    formData.append("upload_preset",cloud_secret)
    formData.append('file',file)

    const {data} = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,formData)

    //return secure url
    return data["secure_url"]
  
  }


  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-md space-y-8 p-10 rounded-xl dark:bg-dark_bg_2"> 
      <div className="text-center dark:text-dark_text_1">
      <h2 className="mt-6 text-3xl font-bold">Welcome</h2>
      <p className="mt-2 text-sm">Sign up</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}  className=" mt-6 space-y-6">

        <AuthInput
        name="name"
        type="text"
        placeholder="Full Name"
        register={register}
        error={errors?.name?.message}
        />

        <AuthInput
        name="email"
        type="email"
        placeholder="Email address"
        register={register}
        error={errors?.email?.message}
        />


        
        <AuthInput
        name="status"
        type="text"
        placeholder="Status(Optional)"
        register={register}
        error={errors?.status?.message}
        />


        
        <AuthInput
        name="password"
        type="password"
        placeholder="Password"
        register={register}
        error={errors?.password?.message}
        />

        {/* picture */}
        <Picture readablePicture={readablePicture} setPicture={setPicture} setReadablePicture={setReadablePicture}/>

      {
        error ? <div>
          <p className="text-red-400">{error}</p>
        </div> : null
      }

        <button className=" w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none hover:bg-green_2 
        shadow-lg cursor-pointer transition ease-in duration-300" type="submit">
          {status==="loading" ? <PulseLoader color="#fff" size={16}/>:"Sign up"}
        </button>

        <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
          <span>have an account ?</span>
          <Link to="/login" className="hover:underline cursor-pointer transition ease-in duration-300">Sign in</Link>
        </p>
      </form>
      </div>
    </div>
  )
}

export default RegisterForm