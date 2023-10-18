import mongoose from "mongoose";
const paragraphSchema=new mongoose.Schema({
    order_on_report:{type:Number,required:true,unique:true},
    data:{
        text:{type:String}
    },
    // block_type:{type:String,required:true}
});



const ParagraphModel=mongoose.model('paragraph',paragraphSchema);

// async function addParagraph(){
//     const para=new ParagraphModel(
//         {
//             order_on_report:2,
//             data:{
//                 text:"This is your admin chefpkj!!"
//             },
//             // block_type:"paragraph"
//         }
//     )
//     const res=await para.save();
//     console.log(res);
// }
// addParagraph();



export default ParagraphModel;