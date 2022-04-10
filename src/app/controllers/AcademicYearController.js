
const AcademicYear = require('../models/AcademicYear')



class AcademicYearController {

    // [POST] /academicYear
    async academicYearCreate(req, res, next){

        try {
            const newAcademicYear = new AcademicYear(req.body)
            const savedAcademicYear = await newAcademicYear.save()
            res.status(200).json(savedAcademicYear)

        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }

    // [GET] /academicYear
    async getAllAcademicYear(req, res, next){
        try {
            const academicYear = await AcademicYear.find({})
            res.status(200).json(academicYear)

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [GET] /category/:id
    async getACategory(req, res, next){
        try {
            const category = await Category.findById(req.params.id)
            res.status(200).json(category)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = new AcademicYearController
