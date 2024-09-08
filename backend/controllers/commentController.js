const Comment = require('../models/commentModel')


const createComment = async(req, res) => {
    try {
        const body = req.body
        const user = req.user


        if(user.data._id.toString() === body.doctorId){
            return res.status(400).json({message: "You cannot comment on yourself."})
        }
        const result = await Comment.create({
            ...body,
            commenterId: user.data._id
        })


        res.status(201).json(result)
        
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }

}

const deleteComment = async(req, res) => {
    try {
        const {id} = req.params
        const result = await Comment.findByIdAndDelete(id)

        if(!result)
            return res.status(404).json({message: "The comment is not found."})

        res.status(200).json(result)
        
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
    
}

const updateComment = async(req, res) => {
    try {
        console.log("update comm", req.params, req.body)
        const {id} = req.params
        
        const result = await Comment.findByIdAndUpdate(id, req.body)
        console.log("update comm res", result)


        if(!result)
            return res.status(404).json({message: "The comment is not found."})

        res.status(200).json(result)
        
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
    
}

const getComments = async(req, res) => {
    try {
        const {id} = req.params

        if (!id)
            return res.status(400).json({message: "No Id provided."})

        const result = await Comment.find({doctorId: id}).populate('commenterId')
        return res.status(200).json(result)
        
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
    
}

module.exports = {
    createComment,
    deleteComment,
    updateComment,
    getComments

}
