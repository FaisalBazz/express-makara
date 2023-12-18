const axios = require('axios');
const fs = require('fs');
const path = require('path');
const upload = require('../helper/fileUpload');
const FormData = require('form-data');

const fetchApi = async (req, res) => {
    try {
        const response = await axios.get('https://reqres.in/api/users?page=2')
        console.log(response.data)

        res.status(200).json({
            message: "Data Berhasil didapat!",
            data: response.data.data
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const postData = async (req, res) => {
    try {
        const fileData = req.body.file; // Ambil data file dari req.body
        if (!fileData) {
            return res.status(400).json({ message: req.body.name });
          }
    
        // Simpan data file sementara untuk mengirimnya ke Flask
        const tempFilePath = 'tempfile.txt';
        fs.writeFileSync(tempFilePath, fileData, 'base64');
    
        // Buat objek FormData dan tambahkan file
        const formData = new FormData();
        formData.append('file', fs.createReadStream(tempFilePath));
    
        // Kirim data menggunakan Axios ke server Flask
        const response = await axios.post('http://35.226.32.1:5000/predict', formData, {
          headers: {
            ...formData.getHeaders(),
          },
        });

        res.status(200).json({
            message: "Data Berhasil di kirim!",
            data: response.data
        })
    } catch (error) {
      // Tangani kesalahan multer dan kesalahan lainnya di sini
      res.status(500).json({
        message: error.message,
      });
    }
  };

const updateData = async (req, res) => {
    try {
        
        const response = await axios({
            method: 'put',
            url: 'https://reqres.in/api/users/'+ id,
            data: {
                name: req.body.name,
                job: req.body.job
            }
        })

        res.status(200).json({
            message: "Data Berhasil di Update!",
            data: response.data
        })
        
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const deleteData = async (req,res) => {
    try {
        var id = req.params.id
        const response = await axios({
            method: 'delete',
            url: 'https://reqres.in/api/users/'+ id,
        })

        res.status(200).json({
            message: "Data Berhasil di Hapus!",
            data: response.data
        })
        
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

module.exports = {
    fetchApi,
    postData,
    updateData,
    deleteData
}