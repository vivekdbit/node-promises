const express = require("express");
const expressRouter = express.Router();
const Database = require("./database");
const ObjectID = require("mongodb").ObjectID;

class DataRouter{
    dataRouter 
    constructor(){
        this.dataRouter = expressRouter;
        
        this.dataRouter.get("/",(req,res) => {    
    
            const readParams = {
                collection      : "inventory",
                criteria        : {},
                projection      : {}
            }
            
            new Database().read(readParams)
            .then( docs => res.send(docs) )
            .catch( err => res.status(500).send(err.message));
        })
        
        this.dataRouter.post("/", (req, res) => {
        
            const writeParams = {
                collection      : "inventory",
                data            : req.body
            }
            new Database().write(writeParams)
            .then( docs => res.send(docs) )
            .catch( err => res.status(500).send(err.message));
        })
        
        this.dataRouter.post("/inventories", (req, res) => {
            const writeMany = {
                collection      : "inventory",
                data            : req.body
            }
            new Database().writeMany(writeMany)
            .then( docs => res.send(docs) )
            .catch( err => res.status(500).send(err.message));
        })
        
        this.dataRouter.put("/:id", (req, res) => {
            const updateParams = {
                collection      : "inventory",
                criteria        : { "_id": new ObjectID(req.params.id) },
                data            : req.body
            }
            new Database().update(updateParams)
            .then( docs => res.send(docs) )
            .catch( err => res.status(500).send(err.message));
        })
        
        this.dataRouter.put("/inventories/:id", (req, res) => {
            const updateParams = {
                collection      : "inventory",
                criteria        : { "_id": new ObjectID(req.params.id) },
                data            : req.body
            }
            new Database().updateMany(updateParams)
            .then( docs => res.send(docs) )
            .catch( err => res.status(500).send(err.message));
        })
        
        this.dataRouter.delete("/:id", (req, res) => {
            const DeleteParams = {
                collection      : "inventory",
                criteria        : { "_id": new ObjectID(req.params.id) }
            }
            new Database().delete(DeleteParams)
            .then( docs => res.send(docs) )
            .catch( err => res.status(500).send(err.message));
        })

    }
}

module.exports = DataRouter;