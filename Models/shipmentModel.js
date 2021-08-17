let mongoose=require('mongoose');
let menuSchema = new mongoose.Schema({
    id:{type: String,required:true},
    code:{
        type:Number,
        required:true
    },
    relation:{
      type: String ,
      required:true
    },
    seller:{
      type: String,
      required:true
    },
    address:{
      type: String,
      required:true,
    },
    pincode:{
      type:Number,
      required:true
    },
    city:{
      type:String,
      required:true
    },
    state:{
      type:String,
      required:true
    },
    type:{
      type:String,
      required:true
    },
    phone: {
        type: String,
        validate: {
          validator: function(v) {
            return /\d{3}\d{3}\d{4}/.test(v);
          },
          message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
    },
    location:{
        type:String,
        required:true,
    },
    delivered:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

module.exports=mongoose.model("Shipment",menuSchema,"Shipments");