import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv"
dotenv.config()
mongoose.connect(process.env.MongooseURL!)
.then(()=>{
    console.log("Mongoose Connected")
})
.catch((e)=>{
    console.log(e);
})
export interface AuthUser extends Document {
  _id: mongoose.Types.ObjectId;
  username?: string;
  name?: string;
  email?: string;
  password?: string;
  googleid?: string;
}

const UserSchema = new Schema<AuthUser>(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      sparse: true,
    },
    email: {
      type: String,
      required: function (this:AuthUser) {
        return !this.googleid;
      },
      unique: true,
      sparse: true,
    },
    password: {
      type: String,
      minlength: 3,
      maxlength: 12,
      required: function (this:AuthUser) {
        return !this.googleid;
      },
    },
    googleid: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  { timestamps: true }
);
export const User = mongoose.model<AuthUser>("User", UserSchema);