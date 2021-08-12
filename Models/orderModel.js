let mongoose=require('mongoose');
// let db = require('../database');
// create an schema

let orderSchema = new mongoose.Schema({
        id:{type: String,required:true},
        docketNumber:{
            type: String,
            required:true,
            maxItems: 50
        },
        customerCode:{
            type:String,
            required:true,
            maxItems: 50
        },
        customerName:{
            type:String,
            required:true,
            maxItems: 50
        },
        referenceNumber:{
            type: String,
            maxItems: 50
            
        },
        paymentStatus:{
            type: String,
            required: true,
            maxItems: 10
        },
        collectableAmount:{
            type: Number,
            required: true,
            maxItems: 50
        },
        declaredAmount:{
            type: Number,
            required: true,
            maxItems: 50
        },
        billingWeight:{
            type: String,
            required: true,
            maxItems: 50
        },
        volumetricWeight:{
            type: String,
            required: true,
            maxItems: 10
        },
        shipmentLength:{
            type: String,
            required: true,
            maxItems: 10
        },
        shipmentWidth:{
            type: String,
            required: true,
            maxItems: 10
        },
        shipmentHeight:{
            type: String,
            required: true,
            maxItems: 10
        },
        serviceType:{
            type: String,
            required: true,
            maxItems: 10
        },
        quantity:{
            type: String,
            required: true,
            maxItems: 10
        },
        isDGShipment:{
            type: String,
            required: true,
            maxItems: 10
        },
        isOpenDelivery:{
            type: String,
            required: true,
            maxItems: 10
        },
        producrDesc:{
            type: String,
            required: true,
            maxItems: 100
        },
        invoiceNumber:{
            type: String,
            required: function() { return this.declaredAmount>=50000;},
            maxItems: 50
        },
        invoiceDate:{
            type: String,
            required: function() { return this.declaredAmount>=50000;},
            maxItems: 50
        },
        sellerName:{
            type: String,
            required: function() { return this.declaredAmount>=50000;},
            maxItems: 50
        },
        sellerAddress:{
            type: String,
            required: function() { return this.declaredAmount>=50000;},
            maxItems: 500
        },
        sellerPincode:{
            type: String,
            required: function() { return this.declaredAmount>=50000;},
            maxItems: 50
        },
        isSellerReqisteredUnderGST:{
            type: boolean,
            required: function() { return this.declaredAmount>=50000;},
            maxItems: 5
        },
        sellerGSTegNumber:{
            type: String,
            required: function() { return this.declaredAmount>=50000;},
            maxItems: 50
        },
        supplySellerStatePlace:{
            type: String,
            required: function() { return this.declaredAmount>=50000;},
            maxItems: 50
        },
        ewayBillRNumber:{
            type: String,
            required: function() { return this.declaredAmount>=50000;},
            maxItems: 50
        },
        EBMExpiryDate:{
            type: String,
            required: function() { return this.declaredAmount>=50000;},
            maxItems: 50
        },
        buyerGSTegNumber:{
            type: String,
            required: function() { return this.declaredAmount>=50000;},
            maxItems: 50
        },
        HSNCode:{
            type: String,
            required: true,
            maxItems: 50
        },
        taxableValue:{
            type: String,
            required: function() { return this.declaredAmount>=50000;},
            maxItems: 10
        },
        SGSTNumber:{
            type: String,
            required: function() { return this.declaredAmount>=50000;},
            maxItems: 10
        },
        CGSTNumber:{
            type: String,
            required: function() { return this.declaredAmount>=50000;},
            maxItems: 10
        },
        IGSTNumber:{
            type: String,
            required: function() { return this.declaredAmount>=50000;},
            maxItems: 10
        },
        discount:{
            type: String,
            maxItems: 10
        },
        GSTTaxRateCGSTN:{
            type: String,
            maxItems: 10
        },
        GSTTaxRateSGSTN:{
            type: String,
            maxItems: 10
        },
        GSTTaxRateIGSTN:{
            type: String,
            maxItems: 10
        },
        GSTTaxTotal:{
            type: String,
            required: function() { return this.declaredAmount>=50000;},
            maxItems: 10
        },
        pickupVendor:{
            type: String,
            required: true,
            maxItems: 100
        }, 
        pickVendorPhoneNumber:{
            type: String,
            required: true,
            maxItems: 50
        },
        pickVendorAddress:{
            type: String,
            required: true,
            maxItems: 500
        },
        pickVendorcity:{
            type: String,
            required: true,
            maxItems: 50
        },
        pickVendorPincode:{
            type: String,
            required: true,
            maxItems: 10
        },
        customerName:{
            type: String,
            required: true,
            maxItems: 50
        },
        customerCity:{
            type: String,
            required: true,
            maxItems: 50
        },
        customerState:{
            type: String,
            required: true,
            maxItems: 50
        },
        zipCode:{
            type: String,
            required: true,
            maxItems: 50
        },
        customerAddress:{
            type: String,
            required: true,
            maxItems: 500
        },
        customerMobileNUmberPrimary:{
            type: String,
            maxItems: 50,
            required:true
        },
        customerMobileNUmberSecondary:{
            type: String,
            maxItems: 50
        },
        virtualNumber:{
            type: String,
            maxItems: 50
        },
        RTOVendor:{
            type: String,
            required: true,
            maxItems: 100
        },
        RTOvendorphonenumber:{
            type: String,
            required: true,
            maxItems: 50
        },
        RTOvendoraddress:{
            type: String,
            required: true,
            maxItems: 500
        },
        RTOvendorcity:{
            type: String,
            required: true,
            maxItems: 50
        },
        RTOvendorPincode:{
            type: String,
            required: true,
            maxItems: 10
        },
        CXLatitude:{
            type: String,
            maxItems: 50
        },
        CXLongitude:{
            type: String,
            maxItems: 50
        },
        confidenceParameter:{
            type: String,
            maxItems: 50
        },
        pastDeliveryFlag:{
            type: boolean,
            maxItems: 5
        },
        UDF1:{
            type: String,
            maxItems: 50
        },
        UDF2:{
            type: String,
            maxItems: 50
        },
        UDF3:{
            type: String,
            maxItems: 50
        },
        UDF4:{
            type: String,
            maxItems: 100
        },
        UDF5:{
            type: String,
            maxItems:100,
        },

    },{timestamps:true});

module.exports=mongoose.model("Order",menuSchema,"Orders");


        