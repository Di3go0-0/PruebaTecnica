import User from '../models/user.model.js';

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
            return res.status(404).json({message: "El usuario no existe"});
        }
        res.json(user);
    }catch(error){
        console.log(error);
        res.status(500).json({message: error.message});
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    res.json({ message: `Update user with id: ${id}` });
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try{
        const user = await User.findByPk(id);
        if(!user){
            return res.status(404).json({message: "El usuario no existe"});
        }
        await user.destroy();
        res.json({message: "Usuario eliminado correctamente"});
    }catch(error){
        console.log(error);
        res.status(500).json({message: error.message});
    }
}
