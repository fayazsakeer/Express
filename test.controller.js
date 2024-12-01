import testModel from "../model/test.model.js";

export function abcd (req,res){
    res.status(400).send ("Test");
}
export async function write(req,res) {
    try {
        let {name,email} = req.body;
        let result = await testModel.create({name, email});
        console.log(result);
        res.status(200).json({msg : "Record created successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg : "failed to create record"})
    }
}
export async function read(req,res){
    try {
        let result = await testModel.find();
        res.status(200).json({msg:"Read succe",data: result});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg : "failed to read record"})
    }
}
export async function update(req,res){
    try {
        let id = req.params.id;
        let {name,email} = req.body;
        console.log(id);
        
        await testModel.updateOne({_id:id},{name,email});
        res.status(200).json({msg:"Record Updated"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg : "failed to update record"})
    }
}

export async function del(req,res){
    try {
        let id = req.params.id;
        await testModel.deleteOne({_id:id});
        res.status(200).json({msg:"record deleted "})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg : "failed to Delete record"})
    }
}