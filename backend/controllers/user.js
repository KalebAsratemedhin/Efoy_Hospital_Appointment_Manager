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



module.exports = {
    findAllUsers,
    findOneUser,
}