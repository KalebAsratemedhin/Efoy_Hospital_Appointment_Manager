const Doctor = require('../models/doctorModel')
const Rating = require('../models/ratingModel')

const createRating = async(req, res) => {
    try {
        const {doctorId, value } = req.body
        const rater = req.user

        const [duplicate] = await Rating.find({doctorId, raterId: rater.data._id})

        if(duplicate)
            return res.status(409).json({message: "Rating exists"})

        const result = await Rating.create({
            doctorId,
            raterId: rater.data._id,
            value

        })

        const updatedUser = await updateTotalRating(doctorId)
        res.status(201).json(updatedUser)
        
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }

}

const deleteRating = async(req, res) => {
    try {
        const {id} = req.params 
        const result = await Rating.findByIdAndDelete(id)

        if(!result){
            return res.status(404).json({message: "Not found"})
        }
        const updatedUser = await updateTotalRating(result.doctorId)

        res.status(202).json(updatedUser)

        
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
    
}

const updateRating = async(req, res) => {
    try {
        const {id} = req.params 
        const update = req.body


        const result = await Rating.findByIdAndUpdate(id, update )

        const updatedUser = await updateTotalRating(result.doctorId)

        res.status(202).json(updatedUser)
        
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
    
}


const updateTotalRating = async(doctorId) => {
    const ratings = await Rating.find({doctorId})

    let total = 0
    for (const rating of ratings){
        total += rating.value

    }

    const result = await Doctor.findByIdAndUpdate(doctorId, {rating: ratings.length > 0 ? total  / ratings.length : 0  })
    return result
    
}



const getRating = async(req, res) => {
    const user = req.user
    const {id} = req.params
    const [rating] = await Rating.find({raterId: user.data._id, doctorId: id})
    
    return res.status(200).json(rating)
    
}



module.exports = {
    createRating,
    deleteRating,
    updateRating,
    getRating
 
}