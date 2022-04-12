const mongoose = require('mongoose')

const AcademicYearSchema = new mongoose.Schema({

        name: {type: String, required: true},
        closureDate: {type: Date, required: true}

    }, {timestamps: true}
)

module.exports = mongoose.model('AcademicYear', AcademicYearSchema, 'academic_year')
