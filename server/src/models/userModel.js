import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema({
    name:{type:String,
        required:[true,"Please provide your name"],
    },
    email:{
        type:String,
        required:[true,"Please provide your email address"],
        unique:[true,"This email address already exists"],
        lowercase:true,
        validate:{
            validator : function(v){
                return validator.isEmail(v)
            },
            message:'Please provide a valid email address'
        }
    },
    picture:{
        type:String,
        default:"https://res.cloudinary.com/dkd5jblv5/image/upload/v1675976806/Default_ProfilePicture_gjngnb.png",
    },
    status:{
        type:String,
        default:'Hey there ! I am using whatsapp'
    },
    password:{
        type:String,
        required:[true,"Please provide your password"],
        minLength:[6,"Please make sure your password is atleast 6 characters long"],
        maxLength:[128,"Please make sure your password is less than 128 characters"]
 },    
},{
    timestamps:true,
    collection:'users'
})

userSchema.methods.comparePassword = async function(candidatePassword){
   const match = await bcrypt.compare(candidatePassword,this.password)
   return match
}

userSchema.pre('save',async function(next){
  if(!this.isModified('password')) return next()
    try {
      const salt = await bcrypt.genSalt(12)
      this.password = await bcrypt.hash(this.password,salt)
      return next() 
    } catch (error) {
        return next(error)
    }
})



const UserModel = mongoose.model("UserModel",userSchema)

export default UserModel