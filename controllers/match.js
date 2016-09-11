
const sql = require('mssql');
const Q = require('Q');

function  matchController(config){
    if(this instanceof matchController)
        this.config = config;
    else return new matchController(config);
}




matchController.prototype.getRanking =  function(){
    var d = Q.defer();   
    sql.connect(this.config.cs).then(()=>{    
        new sql.Request().query("SELECT * from vwranking ORDER BY p DESC, ds DESC")
        .then((rs)=>d.resolve(rs))
        .catch((err)=>d.reject(err));
    }).catch((err)=>d.reject(err));
    return d.promise;
}





matchController.prototype.getMatches = function(){
    var d = Q.defer();   
    sql.connect(this.config.cs).then(()=>{    
        new sql.Request().query("SELECT * from wedstrijd ORDER BY tijdstip")
        .then((rs)=>d.resolve(rs))
        .catch((err)=>d.reject(err));
    }).catch((err)=>d.reject(err));
    return d.promise;
}



matchController.prototype.getMatch = function(matchid){
    var d = Q.defer();   
    sql.connect(this.config.cs).then(()=>{    
        new sql.Request()
        .input('matchid',sql.Int, matchid)
        .query("SELECT * from wedstrijd where nr = @matchid")
        .then((rs)=>d.resolve(rs))
        .catch((err)=>d.reject(err));
    }).catch((err)=>d.reject(err));
    return d.promise;
}



matchController.prototype.getMatchesByWeek = function(week, cb){
    sql.connect(this.config.cs).then(function(){    
        new sql.Request()
            .input('week',sql.Int, week)
            .query("SELECT * from wedstrijd where we = @week ORDER by tijdstip").then(function(rs){
            
            cb(null, rs);
        }).catch(function(err){
            cb(err,null)
        });

    }).catch(function(err){
        cb(err, null);
});
}

matchController.prototype.updateMatch = function(match, cb){
    sql.connect(this.config.cs).then(function(){    
        new sql.Request()
            .input('thuisscore',sql.Int, match.thuisscore)
            .input('uitscore',sql.Int, match.uitscore)
            .input('gespeeld',sql.Int, match.gespeeld)
            .input('matchid',sql.Int, match.nr)
            .query("UPDATE wedstrijd  SET thuisscore  = @thuisscore, uitscore=@uitscore, gespeeld = @gespeeld where nr = @matchid").then(function(rs){
            
            cb(null, rs);
        }).catch(function(err){
            cb(err,null)
        });

    }).catch(function(err){
        cb(err, null);
});
}



//Public
module.exports = matchController;