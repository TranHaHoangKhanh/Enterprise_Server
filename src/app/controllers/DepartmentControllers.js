const Department = require('../models/Department')
const Idea = require('../models/Idea')
const User = require('../models/User')

class DepartmentController {

    // [POST] /department
    async createDepart(req, res, next){

        try {
            const newDepart = new Department(req.body)
            const savedDepart = await newDepart.save()
            res.status(200).json(savedDepart)

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [PUT] /department/:id
    async updateDepart(req, res, next){

        try {
            const departId = req.params.id
            const depart = await Department.findById(departId)
            await depart.updateOne({ $set: req.body})
            const updatedDepart = await Department.findById(departId)
            res.status(200).json({
                message: "The department has been updated.",
                department: updatedDepart
            })

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [DELETE] /department/:id
    async deleteDepart(req, res, next){

        try {
            const depart = await Department.findById(req.params.id)
            await depart.deleteOne()
            res.status(200).json({
                message: 'The department has been deleted.'
            })

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [GET] /departments
    async getAllDepart(req, res, next){

        try {
            const depart = await Department.find({})
            res.status(200).json(depart)

        } catch (error) {
            res.status(500).json(error)
        }
    }


    // [GET] /department/statistic/:id
    async getAllInfoOfDepart(req, res, next){
        const deptId = req.params.id;

        try {
            const depart = await Department.findOne({_id: deptId});

            const allUserOfThisDepartment = await User.find({department_id: deptId });

            allUserOfThisDepartment.map((r) => r.toObject());


            const allIdeaOfThisDepartment = [];

            for(const user of allUserOfThisDepartment){
                const ideasOfThisUser = await Idea.find({user_id: user.id});

                for(const idea of ideasOfThisUser){
                    allIdeaOfThisDepartment.push(idea)
                }
            }

            const mostView =  allIdeaOfThisDepartment.sort((a,b)=>{return b.total_view - a.total_view})[0];
            const mostLike =  allIdeaOfThisDepartment.sort((a,b)=>{return b.thumbsUp.length - a.thumbsDown.length})[0];
            const lasted =  allIdeaOfThisDepartment.sort((a,b)=>{return b.createdAt - a.createdAt})[0];



            console.log(lasted);

            res.status(200).json({mostView: mostView, mostLike: mostLike, lasted: lasted})

        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }



    // [GET] /department/:id
    async getADepart(req, res, next){

        try {
            const depart = await Department.findById(req.params.id)
            res.status(200).json(depart)

        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = new DepartmentController
