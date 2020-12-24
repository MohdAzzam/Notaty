const mongoose = require('mongoose');
const Note = require('./Models/note');
class Database {

    constructor() {
        this.Url = "mongodb://localhost:27017/notaty";
    }
    connect() {
        mongoose.connect(this.Url,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            }).then(() => {
                console.log("DB Connected Successfully");
            }).catch((err) => {
                console.log("ERROR in connection with DB", err);
            })

    }
    addNote(note) {
        return new Promise((resolve, reject) => {
            note['createdDate'] = new Date();
            note['updatedDate'] = new Date();
            let newNote = new Note(note);
            newNote.save().
                then(doc => {
                    resolve(doc);
                }).
                catch(err => {
                    reject(err);
                });

        })
    }
    getNote() {
        return new Promise((resolve, reject) => {
            Note.find({}).
                then(data => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
    getNoteById(id) {
        return new Promise((resolve, reject) => {
            Note.findById(id).then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            })

        })
    }
    getNotesByTitle(noteTitle) {
        return new Promise((resolve, reject) => {
            const query = { title: {$regex: new RegExp(noteTitle,'i')} };
            Note.find(query)
                .then(data => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                })
        });

    }
    updateNote(note) {
        return new Promise((resolve, reject) => {
            note["updatedDate"] = new Date();
            Note.findByIdAndUpdate(note["_id"], note).
                then(data => {
                    console.log(data);
                    resolve(data);


                })
                .catch(err => {
                    reject(err);
                });
        });
    }
    delteNote(id) {
        return new Promise((resolve, reject) => {
            Note.findByIdAndDelete(id)
                .then(data => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                })

        })
    }


}
module.exports = Database;
