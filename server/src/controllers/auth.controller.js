import { createUser,signUser } from "../services/auth.service.js"
import tryCatch from "../utils/tryCatch.js"
import { generateToken,verifyToken } from "../services/token.service.js"
import createHttpError from "http-errors"
import { findUser } from "../services/user.service.js"

export const register = tryCatch(async(req,res)=>{
   const {name,email,picture,status,password} = req.body
    const newUser = await createUser({
        name,
        email,
        picture,
        status,
        password
    })

    //generating access_token 
    const access_token = await generateToken({
        userId:newUser?._id
    },
    process.env.ACCESS_TOKEN_SECRET,
    "1d"
    )

    //generating refresh token 
    const refresh_token = await generateToken({
        userId:newUser?._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    "30d"
    )

    res.cookie('refreshToken',refresh_token,{
        httpOnly:true,
        path:'/api/v1/auth/refreshtoken',
        maxAge:30*24*60*60*1000
    })

    res.status(201).json({
        message:"register success",
        user:{
            _id:newUser?._id,
            name:newUser?.name,
            email:newUser?.email,
            picture:newUser?.picture,
            status:newUser?.status,
            token:access_token,

        }
    })
})


export const login = tryCatch(async(req,res)=>{
    const {email,password} = req.body

    const user = await signUser(email,password);       


     //generating access_token 
     const access_token = await generateToken({
        userId:user?._id
    },
    process.env.ACCESS_TOKEN_SECRET,
    "1d"
    )

    //generating refresh token 
    const refresh_token = await generateToken({
        userId:user?._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    "30d"
    )

    res.cookie('refreshToken',refresh_token,{
        httpOnly:true,
        path:'/api/v1/auth/refreshtoken',
        maxAge:30*24*60*60*1000
    })

    res.status(201).json({
        message:"login success",
        user:{
            _id:user?._id,
            name:user?.name,
            email:user?.email,
            picture:user?.picture,
            status:user?.status,
            token:access_token,

        }
    })


})


export const logout = tryCatch(async(req,res)=>{
    res.clearCookie("refreshToken",{
        path:'/api/v1/auth/refreshtoken'
    })

    res.json({
        message:'logged out!'
    })

})


export const refreshToken = tryCatch(async(req,res)=>{
    const refresh_token = req.cookies.refreshToken;
    if(!refresh_token){
        throw createHttpError.Unauthorized('Please login')
    }
    const check = await verifyToken(refresh_token,process.env.REFRESH_TOKEN_SECRET)

    //check if user is present
    const user = await findUser(check.userId)

        //generating access_token 
        const access_token = generateToken({
            userId:user?._id
        },
        process.env.ACCESS_TOKEN_SECRET,
        "1d"
        )

        res.status(201).json({
            message:"login success",
            access_token,
            user:{
                _id:user?._id,
                name:user?.name,
                email:user?.email,
                picture:user?.picture,
                status:user?.status
            }
        })
    

})