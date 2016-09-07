const express = require('express');
const bodyParser  = require('body-parser');

const config = require('./configuration/config.json');
const app = express();
const matchController = require('./controllers/match')(config[config.env]);

app.use(bodyParser.json());

app.get('/api/match', function(req,res){
    matchController.getMatches((e,rs)=>{
        if(e!==null){
              res.status(500).send(e);
        }
        else{
            res.json(rs);
        }
    });
});


app.get('/api/match/:id', function(req,res){
    var id = req.params.id;
    matchController.getMatch(id,(e,rs)=>{
        if(e!==null){
              res.status(500).send(e);
        }
        else{
            res.json(rs);
        }
    });
});


app.post('/api/match/:id', function(req,res){
    var id = req.params.id;
    var match = req.body;
    console.log(match);
    if(match.nr==id){

        matchController.updateMatch(match,(e,rs)=>{
            if(e!==null){
                res.status(500).send(e);
            }
            else{
                res.json(rs);
            }
        });

    }
    else(res.status(500).send('match ids not matching'));
});

app.get('/api/week/:week', function(req,res){
    var week = req.params.week;
    matchController.getMatchesByWeek(week,(e,rs)=>{
        if(e!==null){
              res.status(500).send(e);
        }
        else{
            res.json(rs);
        }
    });
});

app.get('/api/rank', function(req,res){
    matchController.getRanking((e,rs)=>{
        if(e!==null){
              res.status(500).send(e);
        }
        else{
            res.json(rs);
        }
    });
});

app.listen(process.env.PORT || 3000);