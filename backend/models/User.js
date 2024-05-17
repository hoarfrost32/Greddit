import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
    first_name: String,
    last_name: String,
    username: String,
    birthday: String,
    email: {type:String, unique: true},
    number: Number,
    followers: [String],
    following: [String],
    subbed_to: [{type: Schema.Types.ObjectId, ref: 'Sphere'}],
    created: [{type: Schema.Types.ObjectId, ref: 'Sphere'}],
    password: String,
});
  
const User = model('User', userSchema);
export default User;