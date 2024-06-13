import User from '../models/user.model.js';
import Project from '../models/project.model.js';
import bcrypt from 'bcryptjs';

export const getUsers = async (req, res) => {
    try{
        const users = await User.findAll();
        res.json(users);
    }catch(error){
        console.log(error);
        res.status(500).json({message: error.message});
    
    }
};

export const getUser = async (req, res) => {
    const { id } = req.params;
    try{
        const user = await User.findByPk(id);
        if(!user){
            return res.status(404).json({message: "The user does not exist"});
        }
        res.json(user);
    }catch(error){
        console.log(error);
        res.status(500).json({message: error.message});
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, rol } = req.body;
    try{
        const user = await User.findByPk(id);
        if(!user){
            return res.status(404).json({message: "The user does not exist"});
        }
        const passwordHash = await bcrypt.hash(password, 10);

        user.name = name;
        user.email = email;
        user.password = passwordHash;
        user.rol = rol;
        await user.save();
        res.json(user);
    }catch(error){
        console.log(error);
        res.status(500).json({message: error.message});
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try{
        const user = await User.findByPk(id);
        if(!user){
            return res.status(404).json({message: "The user does not exist"});
        }

        // Verificar si el usuario tiene proyectos
        const porjects = await Project.findAll({ where: { usuarioId: id } });
        if (porjects.length > 0) {
            return res.status(400).json({message: "The user has projects, it cannot be deleted"});
        }

        await user.destroy();
        res.json({message: "User deleted successfully"});
    }catch(error){
        console.log(error);
        res.status(500).json({message: error.message});
    }
}