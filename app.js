const express = require('express');
const config = require('./configuration/config.json');
const app = express();

const matchController = require('./controllers/match')(config);



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