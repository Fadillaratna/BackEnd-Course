"use strict";

// import
const db = require("../database");
const md5 = require("md5");

const auth = require("../auth")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "COURSEWEBNODE"



// endpoint
module.exports = {
  getAll: (req, res) => {
    db.query(`select * from admin`, (err, results) => {
      if (err) throw err;
      res.json({
        message: "Berhasil Menampilkan Semua Data",
        data: results,
      });
    });
  },

  getId: (req, res) => {
    const id = req.params.id;
    db.query(`select * from admin where id_admin = '${id}'`, (err, results) => {
      if (err) throw err;
      res.json({
        message: "Berhasil Menampilkan Data",
        data: results,
      });
    });
  },

  add: (req, res) => {
    let data = {
      name: req.body.name,
      address: req.body.address,
      level: "Admin",
      gender: req.body.gender,
      age: req.body.age,
      phone: req.body.phone,
      email: req.body.email,
      password: md5(req.body.password)
    }
    if ((!data.name, !data.email || !data.password)) {
      res.status(402).json({
        message: "Nama Petugas, Username, dan Password Harus Diisi!",
      });
    }
    if(req.file){
      data.image = req.file.filename
      db.query(`insert into admin set ?`, data, (err, result) => {
        if(err) throw err;
        res.json({
          data: data
        })
      })
    }else{
      db.query(`insert into admin set ?`, data, (err, result) => {
        if(err) throw err;
        res.json({
          data: data
        })
      })
    }
  },

  update: (req, res) => {
    const id = req.params.id;
    let data = {
      name: req.body.name,
      address: req.body.address,
      level: "Admin",
      gender: req.body.gender,
      age: req.body.age,
      phone: req.body.phone,
      email: req.body.email,
      password: md5(req.body.password)
    }
    if(req.file){
      data.image = req.file.filename
      db.query(`update admin set ? where id_admin = ${id}`, data, (err, result) =>{
        if(err) throw err
        res.json({
          message: "Success update data",
          data
        })
      })
    }else{
      db.query(`update admin set ? where id_admin = ${id}`, data, (err, result) =>{
        if(err) throw err
        res.json({
          message: "Success update data",
          data
        })
      })
    }
  },

  delete: (req, res) => {
    const id = req.params.id;
    db.query(`delete from admin where id_admin = '${id}'`, (err, results) => {
      if ((null, err)) throw err;
      res.json({
        message: "Berhasil Hapus Data",
        data: results,
      });
    });
  },

  login: (req, res) => {
    let email =  req.body.email
    let password = req.body.password

    if( !email || !password) res.status(402).json({message: "email dan password harus diisi."})

       db.query(`select * from admin where email = '${email}'`, (err, result)=>{
        const admin = result[0]
          if (typeof admin === 'undefined'){
            res.status(401).json({message: "User not fond"})
          }else{
            if(admin.password === md5(password)){
              const token = jwt.sign({data: admin}, SECRET_KEY)
              res.json({
                logged: true,
                data: result,
                token: token
              })
            }else{
              res.json({
                message: "Invalid password"
              })
            }
            
          }
        })
  }
};
