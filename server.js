const express = require("express");
const app = express();

app.get('/', (req,res) => {
    res.send('Hello word ! ')
})

app.get('/api/:date', (req, res,next)=>{

    let dataPath = req.params.date;
    let unix;
    let utc;
    if(dataPath >10){
        unix = req.params.date;
        utc = new Date(Number(unix)); 
    }else{
        utc = new Date(dataPath).toString();
        unix = new Date(utc).getTime();
    }
   
    console.log(utc);
    res.send({unix, utc});
})


//Unmatched routes handler
app.use(function (req,res) {
    if(req.method.toLowerCase() === "options"){
        res.end();
    } else{
        res.status(404).type('txt').send('not Foujnd');
    }
});

const listener = app.listen(process.env.PORT || 3000, function(){
    console.log("Your app is listening on port" + listener.address().port);
})