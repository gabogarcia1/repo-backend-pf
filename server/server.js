const express =require('require');
const app =express();

app.get('/',function(req,res){
    res.json('GET usuarios');
})
app.post('/usuarios',function(req,res){
    res.json('POST usuarios');
})
app.put('/usuarios/:id',function(req,res){
    res.json('PUT usuarios');
})
app.delete('/usuarios.:id',function(req,res){
    res.json('DELETE usuarios');
})



app.listen(3000,()=>{
    console.log('Escuchando puerto 3000');
})