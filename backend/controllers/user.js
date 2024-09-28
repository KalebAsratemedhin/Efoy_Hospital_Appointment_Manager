const User = require("../models/user")


const findAllUsers = async (req, res) => {
    try {
        const users = await User.findMany({});

        return res.status(200).json(users)

    } catch (error) {
        res.status(500).send({message: error.message})

    }

}

const findOneUser = async (req, res) => {
    try {
        const {id} = req.params
        const user = await User.findById(id);

        return res.status(200).json(user)

    } catch (error) {
        res.status(500).send({message: error.message})

    }

}

const updateUser = async (req, res) => {
    try {
        console.log("updateUser req", req.params, req.body, req.user.id)

        const {id} = req.params 
        console.log("updateUser", id, req.body, req.user.id)

        if (id !== req.user.id){
            return res.status(401).json({message: 'Unauthorized.'})
        }

        const user = await User.findByIdAndUpdate(id, req.body);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ message: 'User updated successfully', user });

        
    } catch (error) {
        res.status(500).send({message: error.message})

    }

}



module.exports = {
    findAllUsers,
    findOneUser,
    updateUser
}