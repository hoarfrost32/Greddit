import mongoose from "mongoose";
import User from './models/User.js';
import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import JWT_Auth from "./jwt_auth.js";
import Sphere from "./models/DOOMsphere.js";

dotenv.config();

mongoose.connect("mongodb+srv://adityatejpaul02:qLgBgGnBXbAVJy9K@test.i5n22ta.mongodb.net/?retryWrites=true&w=majority")

const app = express();

app.use(cors({Origin: '*'}))
app.use(bodyParser.json()); 

app.post('/api/auth/reg', async (req, res) => {
    // getting the user details from the request body and encrypting the password 
    const {first_name, last_name, username, birthday, email, number} = req.body
    const password = bcrypt.hashSync(req.body.password, 10)

    // Creating a user object and saving it in the database
    const user = new User({first_name, last_name, username, birthday, email, number, followers: [], following: [], subbed_to: [], created: [], password});
    // console.log(user)
    
    await user.save()
    .then(() => {
        console.log('User saved successfully');
        
        // jsonwebtoken
        const jwt_payload = {email: user.email}
        const jwt_token = jwt.sign(jwt_payload, process.env.JWT_KEY)
        
        res.json({jwt_token: jwt_token,
                  message: "Account created successfully"
                })
        })
        .catch((err) => {
            if (err.code === 11000) {
                res.json({message: 'Error! An account already exists with the same email address.'})
                console.log('Duplicate key error')
            }
        })

   
})

app.post('/api/auth/login', async (req, res) => {
    const {email, password} = req.body;
    // console.log(email)

    User.findOne({email: email}).exec((err, user) => {
        if(user === null) res.json({message: "Error! No account with this email address exists"})
        else {
            const check=bcrypt.compareSync(password, user.password)
            if(check){
                const jwt_payload = {email: user.email}
                const jwt_token = jwt.sign(jwt_payload, process.env.JWT_KEY)

                res.json({
                            jwt_token: jwt_token,
                            message: "Logged In"
                        })
            }
            else{
                res.json({
                    message: "Error! Wrong Password"
                })
            }
        }
        // console.log(user)

    })
})

app.post('/api/user/view', JWT_Auth, (req, res) => {
    User.findOne({email: req.email}).exec((err, user) => {
        res.send(user)
    })
})

app.post('/api/user/edit', JWT_Auth, (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10)
    // console.log(req.body)
    const user = User.findOneAndUpdate({email: req.email}, req.body, {new:true}, (err, user) => {
        if (err) {
            if(err.code==11000) res.json({message: "An account with the email id provided already exists and thus this edit is not possible"})
        } else {
            if(req.email !== req.body.email){
                res.json({message: 'User updated successfully. Please log out and log in again to see the changes and to use the website.', 
                logout: true});
            }
            else{
                res.json({message: 'User updated successfully.',
                logout: false})
            }
        }
    })
})

app.post('/api/my_spheres/create', JWT_Auth, async (req, res) => {
    // console.log(req.body)
    const tags = req.body.tags.split(",")
    const banned = req.body.banned.split(",")

    const sphere = new Sphere({_id: new mongoose.Types.ObjectId(), name: req.body.name, description: req.body.description, tags: tags, banned: banned, follower_count: 1, post_count: 0, req_by: []});

    sphere.save()
    .then(() => {
        User.findOne({email: req.email}, (err, user) => {
            user.subbed_to.push(sphere._id)
            user.created.push(sphere._id)
            user.save()
        })
        res.json({message: 'New Sphere Created!'})
    })
    .catch((err) => {
        if(err){
            if(err.code === 11000){
                res.json({message:"A Sphere with this name already exists"})
                console.log(err)
            }
        }    
    })
})

app.post('/api/my_spheres/view', JWT_Auth, async (req, res) => {
    User.findOne({email:req.email}).populate('created').lean().exec((err, user) => {
        
        for( var i=0; i<user.created.length; i++){
            for( var j=0; j<user.created[i].banned.length; j++){
                user.created[i].ban_keys = user.created[i].banned.join(', ')           
            }
        }
        res.send(user.created)
    })
})

app.post('/api/my_spheres/delete', JWT_Auth, (req, res) => {
    User.updateOne(
        {email:req.email},
        {
            $pull: {
                subbed_to: req.body.sub_id,
                created: req.body.sub_id
            }
        }
    ).exec()

    Sphere.deleteOne({_id: req.body.sub_id}).exec((err, user) => {
        console.log(user)
        res.json({message: "Sphere deleted successfully"})
    })

    // console.log(req.body.sub_id)
})
app.post('/api/all_spheres/view', JWT_Auth, async (req, res) => {
    User.findOne({email:req.email}).populate('subbed_to').lean().exec((err, user) => {

        const subbed_to = []

        for(var i=0; i<user.subbed_to.length; i++){
            subbed_to.push(user.subbed_to[i]._id)
            user.subbed_to[i].joined = true
        }

        Sphere.find(
            {
                _id: {
                    $nin: subbed_to
                }
            }
        ).lean().exec((err, spheres) => {
            for(var i=0; i<spheres.length; i++){
                spheres[i].joined = false
            }
            res.send(user.subbed_to.concat(spheres))
        })
    })
})



app.post('/api/all_spheres/join', JWT_Auth, (req, res) =>{
    
    User.findOne({email: req.email}).exec((err, user) => {
        Sphere.updateOne({_id: req.body.sub_id},
            {
                $push: {
                    req_by: user._id
                }
            }
        ).exec((err, sph) => {
            res.json({message: 'Your joining request is taken into consideration and will be reviewed by the relevant moderator'})
        })
    })
        
    // console.log(req.body.sub_id)
})

app.post ('/api/sub_tools/join', JWT_Auth, (req, res) => {
    var id = mongoose.Types.ObjectId(req.body.sub_id)
    // console.log(typeof(req.body.sub_id))

    Sphere.findOne({_id: id}).populate('req_by').lean().exec((err, sphere) => {
        res.send(sphere.req_by)
        // console.log(sphere.req_by)
    })
})

app.post('/api/sub_tools/join/accept', JWT_Auth, (req, res) => {
        User.findOneAndUpdate({_id: req.body.user_id},
            {
                $push: {
                    subbed_to: req.body.sub_id 
                }
            }
        ).exec((err, user) => {
            Sphere.updateOne({_id: req.body.sub_id}, 
                {
                    $pull: {
                        req_by: req.body.user_id
                    },
                    
                    $inc: {
                        follower_count: 1
                    }

                }   
            ).exec((err, sphere) => {console.log(err)})
            res.json({message: 'Request has been accepted'})
        })
    
})

const server = app.listen(5000);
