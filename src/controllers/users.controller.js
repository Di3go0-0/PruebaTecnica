import User from '../models/user.model.js';
import Project from '../models/project.model.js';
import bcrypt from 'bcryptjs';

export const getUsers = async (req, res) => {
    try{
        const users = await User.findAll();
        res.status(200).json(users);
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
        } // Este estado nunca deberia ocurrir, ya que el unico que puede acceder a sus datos, es el propio usuario, por loque esta oblicado a existir
        res.status(200).json(user);
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
        res.status(200).json({message: "User updated successfully"});
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
        const porjects = await Project.findAll({ where: { userId: id } });
        if (porjects.length > 0) {
            return res.status(400).json({message: "The user has projects, it cannot be deleted"});
        }

        await user.destroy();
        res.status(200).json({message: "User deleted successfully"});
    }catch(error){
        console.log(error);
        res.status(500).json({message: error.message});
    }
}