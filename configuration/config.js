function Config(){
    if(this instanceof Config){
        this.cs = process.env.CS.replace(/"/g,"");              
        return this;
    }        
    else {
        return new config()
    };
}

module.exports = new Config();
