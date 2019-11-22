const MongoClient=require('mongodb').MongoClient

class Database {
    
    constructor(){
        const url = 'mongodb://localhost:27017';
        this.client = new MongoClient(url, { useNewUrlParser: true })
        this.db = "employeedb"
    }

    read(readParams){

        return new Promise( (resolve,reject) => {
            
            this.client.connect().then( conn => {
                const db = conn.db(this.db);
                const collection = db.collection(readParams.collection);

                collection.find(readParams.criteria,readParams.projection).toArray()
                .then( docs => resolve(docs))
                .catch( err => reject(err) );              
                
            }).catch( err => reject(err));
        })
    }

    readOne(readParams){

        return new Promise( (resolve,reject) => {
            this.client.connect().then( conn => {
                const db = conn.db(this.db);
                const collection = db.collection(readParams.collection);

                collection.findOne(readParams.criteria, readParams.projection)
                .then( docs => resolve(docs))
                .catch( err => reject(err));

            }).catch(err => reject(err));
        })
    }

    write(writeParams) {

        return new Promise( (resolve,reject) => {

            this.client.connect().then( conn => {
                const db = conn.db(this.db);
                const collection = db.collection(writeParams.collection);

                collection.insertOne(writeParams.data)
                .then( docs => resolve(docs) )
                .catch( err => reject(err) );

            }).catch( err => reject(err));
        })
    }

    writeMany(writeParams) {

        return new Promise( (resolve,reject) => {
            this.client.connect().then( conn => {
                const db = conn.db(this.db);
                const collection = db.collection(writeParams.collection);

                collection.insertMany(writeParams.data)
                .then( docs => resolve(docs) )
                .catch( err => reject(err) );

            }).catch( err => reject(err));
        })
    }

    update(updateParams) {

        return new Promise( (resolve,reject) => {
            this.client.connect().then( conn => {
                const db = conn.db(this.db);
                const collection = db.collection(updateParams.collection);

                collection.updateOne(updateParams.criteria , { $set: updateParams.data })
                .then( docs => resolve(docs) )
                .catch( err => reject(err) );

            }).catch( err => reject(err));
        })
    }

    updateMany(updateParams) {

        return new Promise( (resolve,reject) => {
            this.client.connect().then( conn => {
                const db = conn.db(this.db);
                const collection = db.collection(updateParams.collection);

                collection.updateMany(updateParams.criteria , { $set: updateParams.data })
                .then( docs => resolve(docs) )
                .catch( err => reject(err) );

            }).catch( err => reject(err));
        })
    }
    
    delete(deleteParams) {

        return new Promise( (resolve,reject) => {
            this.client.connect().then( conn => {
                const db = conn.db(this.db);
                const collection = db.collection(deleteParams.collection);

                collection.deleteOne(deleteParams.criteria)
                .then( docs => resolve(docs) )
                .catch( err => reject(err) )
            })
        })
    }


}

module.exports=Database