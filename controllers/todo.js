import {Todo} from '../models/todo.js';

export const createTodo = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ success: false, message: "Title and description are required" });
        }
        
        const todo = new Todo({
            title,
            description
        });
        await todo.save();
        return res.status(201).json({ success: true, message: "Todo created successfully", todo });
    } catch (error) {
        console.error("Error creating todo:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        return res.status(200).json({ success: true, todos });
    } catch (error) {
        console.error("Error fetching todos:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const updateTodo = async (req, res) => {
    try{
        const todoId = req.params.todoId;
        const title = req.body;
        const todo = await Todo.findByIdAndUpdate(todoId, title, { new: true });
        await todo.save();
        return res.status(200).json({ success: true, message: "Todo updated successfully", todo });   

    }catch(error){
        console.error("Error updating todo:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const deleteTodo = async (req, res) => {
    try {
        const todoId = req.params.todoId;
        const todo = await Todo.findByIdAndDelete(todoId);
        return res.status(200).json({ success: true, message: "Todo deleted successfully", todo });
    } catch (error) {
        console.error("Error deleting todo:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}