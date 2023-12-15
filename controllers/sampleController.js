const express = require('express');

const methodGet = (req, res) => {
    res.send('Contoh menggunakan GET')
}

const methodPost = (req, res) => {
    res.send('Contoh menggunakan POST')
}

const methodPut = (req, res) => {
    res.send('Contoh menggunakan PUT')
}

const methodDelete = (req, res) => {
    res.send('Contoh menggunakan Delete')
}

module.exports = {
    methodGet, methodPost, methodPut, methodDelete
}