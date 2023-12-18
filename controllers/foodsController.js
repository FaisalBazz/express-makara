const foodsmodel = require('../models/foodsModel');
const upload = require('../helper/fileUpload');
const { Op } = require('sequelize');

const methodGetCondition = async (req, res) => {
    const param1 = req.body.nama
    const param2 = req.body.daerah
    try {
        const getData = await foodsmodel.findAll({
            attributes:[['nama','makanan']],
            // where:{
                // [Op.or]:[
                //     {nama: param1},
                //     {daerah: param2},
                // ]
                // [Op.and]:[
                //     {nama: param1},
                //     {daerah: param2},
                // ]
                // nama :{
                //     [Op.in]:[param1, param2]
                // }
            // }
            order:[['nama','asc']]
        })
        res.json(getData);
    } catch (error) {
        return res.status(400).send("Error")
    }
}

const methodUploadFoods = async (req, res) => {
    try {
        // untuk upload file
        await upload(req, res);

        if(req.file == undefined){
            console.error(req.file)
            return res.status(400).send({message: "Image belum dipilih!"})
        }

        // DB
        potosModel.create({
            idfoods : req.body.idfoods,
            path: req.file.originalname
        }).then((data) => {
            res.status(200).send({
                message: "File berhasil di upload " + data.path
            })
        })

    } catch (error) {
        console.error(error.message)
        res.status(400).send('error')
    }
}

const methodPost = async (req, res) => {
    try {
        const {nama, daerah, deskripsi} = req.body;
        const store = new foodsmodel({
            nama, daerah, deskripsi
        })

        await store.save();
        res.json(store)

    } catch (error){
        console.error(error.message)
        res.status(500).send('error')
    }
}

const methodGet = async (req, res) => {
    try {
        const getData = await foodsmodel.findAll({})
        res.json(getData)
    } catch (error){
        console.error(error.message)
        res.status(500).send('error')
    }
}

const methodGetId = async (req, res) => {
    try {
        const id = req.params.id
        const getData = await foodsmodel.findOne({
            where:{id:id}
        })
        res.json(getData)
    } catch (error){
        console.error(error.message)
        res.status(500).send('error')
    }
}

const methodPut = async (req, res) => {
    try {
        const {nama, daerah, deskripsi} = req.body;
        const id = req.params.id;
        const updateFoods = foodsmodel.update({
            nama, daerah, deskripsi
        },{
            where :{id:id}
        });

        await updateFoods
        res.send("Berhasil di update")
    } catch (error){
        console.error(error.message)
        res.status(500).send('error')
    }
}

const methodDelete = async (req, res) => {
    try {
        const id = req.params.id
        const deleteFoods = foodsmodel.destroy({
            where : {id:id}
        })

        await deleteFoods
        res.send("Berhasil dihapus!")
    } catch (error){
        console.error(error.message)
        res.status(500).send('error')
    }
}



module.exports = {
    methodPost,
    methodGet,
    methodGetId,
    methodPut,
    methodDelete,
    methodUploadFoods,
    methodGetCondition
}