function Config(){
    if(this instanceof Config){    
        if(process.env.CS!==undefined && process.env.CS !== null){
            console.log('CS ENVIRONMENT VARIABLE: %s', process.env.CS);
            this.cs = process.env.CS.replace(/"/g,"");    
        }
        else{
            console.error('CS ENVIRONMENT MISSING');
        }
        return this;
    }        
    else {
        return new config()
    };
}
module.exports = new Config();
