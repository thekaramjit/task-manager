const express=require("express")
const Task=require("../models/tasks")
const router=new express.Router();

router.post("/tasks",async (req,res)=>{
    console.log(req.body)
    const task=new Task(req.body)
    try{
        await task.save()
        res.send(task)
    }catch(e){
        res.send(400).send(e)
    }

})

router.get("/tasks",async (req,res)=>{

    try{
        const task=await Task.find({})
        res.status(200).send(task)

    }catch(e){
        res.status(400).send(e)
    }

})

router.get("/tasks/:id",async(req,res)=>{
    //to get id from url link
    const _id=req.params.id

    try{
        const task= await Task.findById(_id)
        if(!task){
            return res.status(400).send()
        }
        res.status(200).send(task)
    }catch(e){
        res.status(404).send(e)
    }
})

router.patch("/tasks/:id",async (req,res)=>{
    const updates=Object.keys(req.body)
    console.log(updates)
    const valid=["description","completed"]

    const isValidOperation=updates.every((update)=>{
        return valid.includes(update)
    })

    if(!isValidOperation){
        return res.status(400).send({error:"Invalid Update!"})
    }
    try{
        // const task=await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        const task=await Task.findById(req.params.id)
        updates.forEach((update)=>{
            task[update]=req.body[update]
        })
        await task.save();
        if(!task){
         return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})


router.delete("/tasks/:id",async (req,res)=>{
    try {
        const deleteTask=await Task.findByIdAndDelete(req.params.id)
        if(!deleteTask){
            res.status(404).send()
        }
        res.send(deleteTask)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports=router