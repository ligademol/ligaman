const express = require('express');
const config = require('../configuration/config.json');
const matchController = require('../controllers/match')(config[config.env]);

var router = express.Router();


router.get('/match', (req,res,next)=>{
    matchController.getMatches()
    .then(rs=>res.json(rs))
    .catch(e=>res.status(500).send(e));
});

router.get('/match/:id', (req,res,next)=>{
    var id = req.params.id;
      matchController.getMatch(id)
    .then(rs=>{
        if(rs.length===0)
            res.status(404).send(`match ${id} not found`)
        else
            res.json(rs);
    })
    .catch(e=>res.status(500).send(e));
});

   
router.post('/match/:id', function(req,res,next){
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

router.get('/week/:week', function(req,res,next){
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

router.get('/rank', function(req,res,next){
    matchController.getRanking()
    .then((rs)=>res.json(rs))
    .catch((e)=>res.status(500).send(e));
});


module.exports = router;