import bodyParser from 'body-parser';
import express from 'express';
import pg from 'pg';
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
const db = new pg.Client({
    user : "postgres",
    password : "Ayush8923",
    host : "localhost",
    database : "world",
    port : 5432
})

db.connect();
var currentQuestion = {};
var quiz = [];
var counter = 0;
db.query("select * from flags",(err,res)=>{
    quiz = res.rows;
    db.end();
})
app.post("/submit",(req,res)=>{
    console.log(req.body);
    if(req.body.countryname == currentQuestion.name){
        nextQuestion();
        counter++;
        console.log(counter);
        res.render("index.ejs",{question:currentQuestion,
            counter : counter
        });
    }else{
        res.render("index.ejs",{isFalse : true})
    }
})
app.get("/",(req,res)=>{
    nextQuestion();
    res.render("index.ejs",{question:currentQuestion,
        counter : counter
    });
})

app.listen(3000,()=>{
    console.log("Server Started at 3000");
})

function nextQuestion(){
    currentQuestion = quiz[Math.floor(Math.random()*quiz.length)];
    console.log(currentQuestion);
}