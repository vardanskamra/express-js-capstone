import express from "express";

const app = express();
const port = 3000;
var posts = [];

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) =>{
    let data = {
        allPosts: posts,
    };
    res.render("index.ejs", data);
});

app.get("/about", (req, res) =>{
    res.render("about.ejs");
});

app.get("/newpost", (req, res) =>{
    res.render("newpost.ejs");
});

app.post("/newpost/submit", (req, res) =>{
    res.render("newpost.ejs");
    console.log(req.body);
    let data = {
        title: req.body.title,
        intro: req.body.intro,
        para: req.body.para,
        conc: req.body.conc,
    };

    posts.push(data);
    console.log(posts)
});

app.post("/article", (req, res) =>{
    let {title} = req.body;
    let data = finder(posts, title);
    res.render("article.ejs", data);
});

app.post("/article/edit", (req, res) =>{
    let {title} = req.body;
    let data = finder(posts, title);
    res.render("editpost.ejs", data);
});

app.post("/article/edit/submit", (req, res) =>{
    let data = {
        title: req.body.title,
        intro: req.body.intro,
        para: req.body.para,
        conc: req.body.conc,
    };

    for (let i = 0; i<posts.length; i++){
        if (posts[i]["title"]===data.title){
            posts.splice(i, 1);
        }
    };

    posts.push(data);
    res.render("article.ejs", data);
});

app.post("/article/delete", (req, res) =>{
    let {title} = req.body;
    
    for (let i = 0; i<posts.length; i++){
        if (posts[i]["title"]===title){
            posts.splice(i, 1);
        }
    };

    let data = {
        allPosts: posts,
    };
    res.render("index.ejs", data);
});

app.listen(port, ()=>{
    console.log(`Server running on localhost:${port}`);
});

function finder(postsArray, ti){
    for (let i = 0; i<postsArray.length; i++){
        if (postsArray[i]["title"]===ti){
            return postsArray[i];
        }
    }
};
