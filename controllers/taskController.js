import { Task } from "../models/Task.model.js";

function taskController()
{
    return{
        async newTask(req,res)
        {
            const{title,content,createdFor,deadline,priority} = req.body;
            if(!title || !content || !deadline)
            {
                res.status(404).json({message:'All fields are required'})
            }

            const newTask = new Task({
                title,
                content,
                createdFor,
                deadline,
                priority
            })

            try {
                await newTask.save()
                res.status(200).json(newTask)
            } catch (error) {
                console.log(error)
            }

        },
        edit(req,res,next)
        {
            // console.log(req.user);
            res.send({message: 'Task saved successfully'})
        },

        async getTask(req, res) {
            const id = req.params.id;
            try {
               const priorityTasks = await Task.find({ createdFor: id,completed:"false", priority:"true" });
               const priorityFalse = await Task.find({ createdFor: id,completed:"false", priority:"false"}).sort({deadline:1});
               const tasks = priorityTasks.concat(priorityFalse)
               const completedTasks = await Task.find({ createdFor: id, completed: "true" });
               const task = tasks.concat(completedTasks)
               res.status(200).json(task);
             } catch (error) {
                // console.log(error.message);
                res.status(500).json({ error: 'Internal Server Error' });
              }
            },

        async deleteTask(req,res)
        {
            const id = req.params.id;
            try {
                const validTask = await Task.findByIdAndDelete({_id:id})
                if(!validTask) {
                    res.status(400).json({message:'couldn`t find task with id'})
                }
                res.status(200).json({message:'Task deleted successfully'})
            } catch (error) {
                console.log(error.message)
            }
        },

        async editTask(req,res)
        {
            const id = req.params.id;
            const{title,content,deadline} = req.body;
            
            try {
                const validUser = await Task.findByIdAndUpdate({_id:id},{title,content,deadline},{new:true})
                
                if(!validUser) {
                    res.status(400).json({message:'couldn`t find task with id'})
                }
                else{
                    res.status(200).json(validUser)
                }

            } catch (error) {
                console.log(error)
            }

        }

    }
}

export default taskController;