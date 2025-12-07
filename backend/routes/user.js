const {Router} = require('express')
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
const router = Router()
const {UserCollection} = require('../db/index')
const userMiddleware = require('../middlewares/user')


router.post('/signup',async function(req,res){
    const {username,password, email, fullName, mobileNo,role} = req.body
    if(!username || !password || !email || !mobileNo){
        return res.status(400).json({
            'msg':'please enter required details'
        })
    }
    const jwtSecret = "Arjun@1801"
    try{
        const hashedPassword = await bcrypt.hash(password,12)
        const user = await UserCollection.create({
            username:username,
            password:hashedPassword,
            email:email,
            fullName:fullName,
            mobileNo:mobileNo,
            role:role
        })
        const populateRole = await UserCollection.findById(user._id).populate('role')
        const token = jwt.sign({
            username:username,
            userId: user._id,
            role:populateRole.role.role
        },jwtSecret)
        res.status(201).json({
            'token':token
        })
        
    }catch(error){
        console.log(error)
        if(error.code==11000){
            return res.status(409).json({
                'msg':'username already exist'
            })
        }
        if(error.name=="ValidationError"){
            return res.status(400).json({
                'msg':'invalid input data'
            })
        }
        return res.status(500).json({
            'msg':'something went wrong'
        })
    }

})

router.post('/singin', async function(req,res){
    const {username, password} = req.body

    try{
        const user = await UserCollection.findOne({
            username:username
        }).populate('role')
        if(!user){
            return res.status(401).json({
                'msg':'no user found'
            })
        }
        const hashedPassword = user.password
        const result = await bcrypt.compare(password, hashedPassword)
        if(result){
            const token = jwt.sign({
                username:username,
                id:user._id,
                role:user.role.role
            },'Arjun@1801')
            return res.status(200).json({
                'msg':'login successfully',
                'token':token
            })
        }else{
            return res.status(401).json({
                'msg':'check your creds'
            })
        }
    }catch(error){
        res.status(500).json({
            msg:error
        })
    }
})

module.exports = router;