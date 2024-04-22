import bcryptjs from 'bcryptjs';
import { User } from '../models/User.model.js';
import jwt from 'jsonwebtoken'
function authController()
{
    return{
        async signup(req,res)
        {
            const{username,email,password} = req.body;
            // console.log(req.body)
            if(!username || !email || !password)
            {
                res.status(400).json({
                    message: "Please fill all the fields"
                })
            }

            const hashedPassword = bcryptjs.hashSync(password,10)
            const newUser = new User({
                username,
                email,
                password:hashedPassword
            })
            try {
                await newUser.save();
                // console.log(newUser)
                res.json('Signup successful')
            } catch (error) {
                console.log(error)
            }

        },

        async getUser(req,res){
            // console.log(req.params.id)
            try {
                const user = await User.findById({_id:req.params.id})
                res.status(200).json(user)
            } catch (error) {
                console.log(error)
            }
        },

        async signin(req,res)
        {
            const{username,password} = req.body;
            // console.log(req.body)
            if(!username || !password)
            {
                return res.status(400).json({
                    message: "Please fill all the fields"
                })
            }
            
            try {

               const user = await User.findOne({ username });

               if (!user) {
                 return res.status(401).json({ message: "Invalid username or password" });
                }

                const isValidPassword = bcryptjs.compareSync(password, user.password);

                if (!isValidPassword) {
                    return res.status(401).json({ message: "Invalid username or password" });
                }
                // console.log(user.isAdmin)
                const token = jwt.sign({ id: user._id, isAdmin:user.isAdmin }, process.env.JWT_SECRET);
                // console.log(res)

                return res.json({user,token})

                // return res.status(200).json({ message:"success"})

            } catch (error) {
                return res.json(400).json({message: 'invalid'})
            }

        },

        async signout(req,res,next)
        {
            res.clearCookie('access_token');
            res.status(200).json({message:"signing out"})
        }
    }   
}

export default authController;