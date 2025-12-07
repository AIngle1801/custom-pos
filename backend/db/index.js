const mongoose = require('mongoose')
mongoose.connect('')
.then(()=>{
    console.log("Mongodb connection done")
})
.catch((err)=>{
    console.log("error",err)
})

const Users = new mongoose.Schema({
    username:{type:String, required:true, unique: true, trim: true},
    email:{type:String, required:true, unique:true, trim:true,lowercase:true},
    fullName:{type:String, required:true, trim:true},
    mobileNo:{type:String, required:false },
    role:{type:mongoose.Schema.Types.ObjectId, ref:'role',required:true},
    address:{type:String,required:false},
    status:{type:Boolean, default:true},
    password:{type:String, required:true}
},{
    timestamps:true
})
const UserCollection = mongoose.model('user', Users)
const Invoice = new mongoose.Schema({
    orderID:{type:String, required:true},
    customer:{type:mongoose.Schema.Types.ObjectId, required:true,ref:'customer',},
    amount:{type:Number, required:true},
    items:[{
        itemName:{type:String, required:true},
        quantity:{type:Number, required:true},
        price:{type:Number,required:true},
        total:{type:Number, required:true}
    }],
    status:{type:String,enum:['pending','cancelled','paid'],default:'pending'},
    paymentMethod:{type:String, required:false}
},{
    timestamps:true
}
)

const InvoiceCollection = mongoose.model('invoice',Invoice)

const Customer = new mongoose.Schema({
    fullName:{type:String, required:true},
    email:{type:String, required:true},
    mobileNo:{type:String, required:true},
    address:{type:String, required:false},
},{
    timestamps:true
})

const CustomerCollection = mongoose.model('customer',Customer)

const Item = new mongoose.Schema({
    uom:{type:mongoose.Schema.Types.ObjectId,ref:'uom'},
    itemName:{type:String, required:true},
    type:{type:mongoose.Schema.Types.ObjectId, ref:'itemType'},
    actual_qty:{type:Number, required:true, default:0},
    price:{type:Number, required:true}
},{
    timestamps:true
})

const itemCollection = mongoose.model('item',Item)

const role = new mongoose.Schema({
    role:String
})

const roleCollection = mongoose.model('role',role)
const Itemtype = new mongoose.Schema({
    type:String
})
const itemTypeCollection = mongoose.model('itemType',Itemtype)
const uom = new mongoose.Schema({
    uom:String
})
const uomCollection = mongoose.model('uom',uom)

module.exports={
    uomCollection,
    itemTypeCollection,
    roleCollection,
    itemCollection,
    CustomerCollection,
    InvoiceCollection,
    UserCollection
}