const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 4000;
var model = require('./model');
var user_permissions = model.user_permissions;
var permission_list = model.permission_list;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/node-mongoose', {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.get('/permissionlist',function(req, res){
    permission_list.find({}, function (err, docs) { 
        if (err){ 
            console.log(err); 
        } 
        else{ 
            console.log("First function call : ", docs);
            // let arr={};
            // docs.forEach(element => {
            //     arr[element._id] = element.resource;
            //     console.log(arr);
            // });
            // res.send(arr);
            res.send(docs);
        } 
    });
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/permissions',function(req, res){
    user_permissions.find({}, function (err, docs) { 
        if (err){ 
            console.log(err); 
        } 
        else{ 
            console.log("First function call : ", docs);
            let arr={};
            docs.forEach(element => {
                arr[element.user_type] = element.permission_id;
                console.log(arr);
            });
            res.send(arr);
            // res.send(docs);
        } 
    });
});

app.get('/permission/:user_type',function(req, res){
    user_permissions.find({user_type:req.params.user_type}, function (err, docs) { 
        if (err){ 
            console.log(err); 
        } 
        else{ 
            console.log("First function call : ", docs);
            let arr={};
            arr[docs[0].user_type] = docs[0].permission_id;
            res.send(arr);
        } 
    });
});

app.post('/permission/',function(req, res){
    console.log(req.body);
    let user_type = Object.keys(req.body)[0];
    let permission_id = Object.values(req.body)[0];
    const query = { user_type: user_type };//605242aec0fba88ccbd242c4
    const update = {$set:{permission_id: permission_id }};
    const options = {upsert: true};
    console.log(query,update,options);
    user_permissions.updateOne(query, update, options, function (err, docs) { 
        if (err){ 
            console.log(err); 
        } 
        else{ 
            console.log("Update function call : ", docs);
            res.send(docs);
        } 
    });
});

app.listen(port, function() {
  console.log("Server is running on Port: " + port);
});