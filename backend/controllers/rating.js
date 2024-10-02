const Doctor = require('../models/doctor')
const Rating = require('../models/rating')
const User = require('../models/user')

const createRating = async(req, res) => {
    try {
        const {doctorId, value } = req.body
        const rater = req.user

        if(rater.id === doctorId){
            return res.status(400).json({message: "You cannot rate yourself."})
        }

        const [duplicate] = await Rating.find({doctorId, raterId: rater.id})

        if(duplicate)
            return res.status(409).json({message: "Rating exists"})

        const result = await Rating.create({
            doctorId,
            raterId: rater.id,
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

    const result = await Doctor.findOneAndUpdate({userId: doctorId}, {rating: ratings.length > 0 ? total  / ratings.length : 0  })
    return result
    
}



const getRating = async(req, res) => {
    const {id} = req.params
    const [rating] = await Rating.find({raterId: req.user.id, doctorId: id})
    
    return res.status(200).json(rating)
    
}

const getFavorites = async(req, res) => {
    const favorites = await Rating.distinct('doctorId', {raterId: req.user.id})
    const result = []

    for(fav of favorites){
        const user = await User.findById(fav)
        const doc = await Doctor.findOne({userId: fav})

        result.push({...user.toObject(), doctorData: doc})
        
    }   
    
    return res.status(200).json(result)
    
}



module.exports = {
    createRating,
    deleteRating,
    updateRating,
    getRating,
    getFavorites 
}