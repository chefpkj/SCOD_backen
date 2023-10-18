import express from "express";
import Paragraph from "../models/paragraphModel.js";
import Joi from "joi"
import ParagraphModel from "../models/paragraphModel.js";
const router=express.Router();


//route to get all the paragraph blocks
router.get('/all',async (req,res)=>{
    const data=await Paragraph.find({});
    return res.status(200).send(data)
})


//route to add a paragraph block
router.post('/add',async (req,res)=>{

    const{error}=isValid(req.body);
    if(error){
        return res.status(400).send(error?.details[0]?.message);
    }

    try{
        const newPara=new ParagraphModel({
            order_on_report:req?.body?.order_on_report,
            data:{
                text:req?.body?.data?.text
            }
        })
        const result=await newPara.save();
        return res.status(200).send(result)

    }
    catch(err){
        return res.status(400).send(err?.errmsg)
        
    }
    
})


//to delete a paragraph block
router.delete('/delete/:id',async (req,res)=>{
    const id=req?.params?.id;
    //check if this is there
    try{
        let result=await ParagraphModel?.findById(id)
    if(!result){
       return res.status(404).send("ID not found");
    }
      result=await ParagraphModel?.deleteOne({_id:id});
      return res.status(200).send(result);
    }
    catch(err){
        return res.status(400).send(err);
    }

})

//to update the paragraph
router.put('/update',async (req,res)=>{
    //check if id is present or not

    try{
        const oldPara=await ParagraphModel.findById(req?.body?._id);
    if(!oldPara){
        return res.status(404).send("ID not found");
    };
    // oldPara?.order_on_report=req?.body?.order_on_report;
    // oldPara?.data=req?.body?.data;
    oldPara.set({
        order_on_report: req?.body?.order_on_report, data:req?.body?.data });
    const result=await oldPara.save();
    return res.status(200).send(result);

    }
    catch(err){
        return res.status(400).send(err?.errmsg)
    }
    
    
})

function isValid(req_body) {
    const schema = Joi.object({
        order_on_report: Joi.number().required(),
        data: {
            text: Joi.string()
        }
    }).options({ convert: false }); // This option prevents automatic type conversion.

    return schema.validate(req_body);
}


export default router;