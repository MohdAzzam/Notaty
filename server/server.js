const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const Database = require('./Database');
app.use(cors());//api call out of domain
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));//urls that send to api to use url encoding
const db = new Database();


//create post api to add new note
app.post('/notes', (req, res) => {
    const body = req.body;
    console.log(body);
    db.addNote(body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send(err);

        })

});



app.get('/notes', (req, res) => {
    const {title}=req.query;
    if(title){
        db.getNotesByTitle(title).then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send(err);
        });
    }else{
        db.getNote().then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send(err);
        });
    }
});

app.get('/notes/:id', (req, res) => {
    const { id } = req.params;
    db.getNoteById(id)
        .then(data => {
            if (!data) {
                res.status(404).send("Note Id not exist");
            } else {
                res.send(data);
            }
        }).catch(err => {
            res.status(500).send(err);

        });

});
app.put('/update', (req, res) => {
    db.updateNote(req.body)
        .then(data => {
            if (!data) {
                res.status(404).send("Note Id not exist");
            } else {
                res.send(data);
            }
        }).catch(err => {
            res.status(500).send(err);
        });

});
app.delete('/notes/:id', (req, res) => {
    console.log("Hello");
    const { id } = req.params;
    db.delteNote(id)
        .then(data => {
            if (!data) {
                res.status(404).send("Note Id not exist");
            } else {
                res.send(data);
            }
        }).catch(err => {
            res.status(500).send(err);

        });

});
const port = 3000;
app.listen(port, () => {
    console.log(`server start at PORT  ${port}...`);
    db.connect();
})

