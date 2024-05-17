import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const sphereSchema = new Schema ({
    _id: Schema.Types.ObjectId,
    name: {type:String, unique: true},
    description: String,
    tags: [String],
    banned: [String],
    follower_count: Number, 
    post_count: Number,
    req_by: [{type: Schema.Types.ObjectId, ref: 'User'}]
})

const Sphere = model('Sphere', sphereSchema);
export default Sphere;