
const sql = require('mssql');
const Q = require('q');

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

matchController.prototype.getWeeks = function(){
    var d = Q.defer();   
    sql.connect(this.config.cs).then(()=>{    
        new sql.Request().query("SELECT DISTINCT we as week, bw as bondsweek, datum, CASE comp WHEN 'LIGA' THen 'liga' ELSE 'beker' END as competitie from wedstrijd WHERE comp NOT LIKE 'VRIEND%' ORDER BY datum")
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


matchController.prototype.getMatchesByWeek = function(week){
    var d = Q.defer();   
    sql.connect(this.config.cs).then(()=>{    
        new sql.Request()
        .input('week',sql.Int, week)
        .query("SELECT * from wedstrijd where we = @week ORDER by tijdstip")
        .then((rs)=>d.resolve(rs))
        .catch((err)=>d.reject(err));
    }).catch((err)=>d.reject(err));
    return d.promise;
}

matchController.prototype.updateMatch = function(match){
    var d = Q.defer();   
    sql.connect(this.config.cs).then(()=>{    
        new sql.Request()
            .input('thuisscore',sql.Int, match.thuisscore)
            .input('uitscore',sql.Int, match.uitscore)
            .input('gespeeld',sql.Int, match.gespeeld)
            .input('matchid',sql.Int, match.nr)
            .query("UPDATE wedstrijd  SET thuisscore  = @thuisscore, uitscore=@uitscore, gespeeld = @gespeeld where nr = @matchid")
        .then((rs)=>d.resolve(rs))
        .catch((err)=>d.reject(err));
    }).catch((err)=>d.reject(err));
    return d.promise;
}

//Public
module.exports = matchController;