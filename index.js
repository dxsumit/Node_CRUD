const express = require('express');
const {connectToDB} = require('./db/connect');          // mongo Atlas database configuration 
const cors = require('cors');
const Task = require('./models/tasks');

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const PORT = process.env.PORT || 4000;

// IIFE to connect to the database...
(async() => {
    
    try{
        connectToDB();
        // console.log('Connedted To DataBase.');
        app.listen(PORT, () => console.log('Server is active on port 4000') );
    }
    catch(err) {
        console.log(err);
    }

})();



app.get('/all', async (req, res)=>{
    // console.log('in all');
    try{
        const allTasks = await Task.find();
        res.status(200).json({status: 'Successfull', msg: allTasks});
    }
    catch(err){
        res.status(500).json({status: 'failed', message: err});
    }
})


app.get('/find/:id', async (req, res)=>{

    // 639ebe63ab0cf83085dd6b43
    // console.log('IN find.');
    try{
        const {id} = req.params
        const foundTask = await Task.findOne({_id:id});

        if(!foundTask)
            return res.status(404).json({status: 'failed', message: 'ID not found.'});
        
        res.status(200).json({status: 'Successfull', msg: foundTask});
    }
    catch(err){
        res.status(500).json({status: 'failed', message: err});
    }

});


app.delete('/delete/:id', async (req, res)=>{

    // 639f2962f7f14f57ccd90168
    // console.log('IN delete..');
    try{
        const {id} = req.params
        const foundTask = await Task.findOneAndDelete({_id:id});

        if(!foundTask)
            return res.status(404).json({status: 'failed', message: 'ID not found.'});
        
        res.status(200).json({status: 'Successfull', msg: foundTask});
    }
    catch(err){
        res.status(500).json({status: 'failed', message: err});
    }

});

// patch perticular fields..
app.patch('/update/:id', async (req, res)=>{

    // 63c52f6aa837fe2a359849ec
    // console.log('IN update..');
    try{
        const {id} = req.params
        const updatedTask = await Task.findOneAndUpdate({_id:id }, req.body, {
            new: true,
            runValidators: true
        });

        if(!updatedTask)
            return res.status(404).json({status: 'failed', message: 'ID not found.'});
        
        res.status(200).json({status: 'Successfull', msg: updatedTask});
    }
    catch(err){
        res.status(500).json({status: 'failed', message: err});
    }

});


// create new data..
app.post('/create', async (req, res) => {
    // console.log('In the create.');
    // console.log(req.body);

    try{
        const currentTask = new Task(req.body);
        await currentTask.save();
        res.status(201).json({currentTask});
    }
    catch(err){
        console.log(err);
        res.status(500).json({status: "Failed", body: req.body, error: err});
    }

})


app.get('/', (req, res)=>{
    res.send("Heeeloo. This is baseURL");
});


// defalut path.. if none above found then this will active
app.all('*', (req,res) => {
    res.status(404).send('<h1> Resourse not found </h1> <p> Probably wrong URL </p>');
});


