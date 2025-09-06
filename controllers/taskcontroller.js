import Task from "../models/Task.js";


export const getTask = async (req,res) =>{
    const task = await Task.find({userId:req.user.id});
    // const task = await Task.find();
    res.json(task);
}

export const getTaskById = async (req, res) => {
  try {
    const taskId = Number(req.params.id);
    const task = await Task.findOne({ id: taskId }).exec();

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.send(task);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const addTask = async (req,res)=>{
    const {id,name,completed} = req.body;
    const userId = req.user.id;
    const newTask = new Task({
      id,name,completed,userId
    })
    await newTask.save();
    res.status(201).json(newTask);

}

export const deleteTask = async (req,res)=>{
    
    await Task.deleteOne({id:parseInt(req.params.id)});
    res.status(201).json({message:"task deleted"});
}

export const clearTodo = async (req,res)=>{
   try{
    const tasks = await Task.find();
    if(!tasks.length){
      res.status(404).json({message:"the task list is empty"})
    }
    await Task.deleteMany();
    res.status(200).json({message:"all task deleted successfully"});
   }catch(error){
    res.status(500).json({message:"internal server error"});
   }
}

export const updateTodo = async (req,res)=>{
   try { 
    const updates = req.body;
   const updated = await Task.findOneAndUpdate({id:Number(req.params.id)},updates,{new:true});
    res.send(updated)

    
   } catch (error) {
    console.log(error);
   }
}