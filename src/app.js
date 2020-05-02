const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')


console.log(__dirname)
console.log(path.join(__dirname,'../public'))

const publicPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'/templates/views')
const partialsPath = path.join(__dirname,'/templates/partials')

const app = express()
const port = process.env.PORT || 3000

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicPath))

app.get('/weather',(req,res)=>{
    /*res.render('index',{
        title:'Weather',
        name:'Oleksandr Kostilyev'
    })*/
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }

    else{
        geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
            //const{latitude,longitude,location}=data;
            console.log(latitude,longitude)
            if(error){
                return res.send({error})
            }
            forecast(latitude,longitude,(error,data)=>{
                console.log(latitude,longitude)
                if(error){
                    res.send({error})
                }
                res.send({
                    location,
                    address: req.query.address,
                    forecast: data.weather_descriptions[0]
                })
                //data.location = location;
                //data.title='Weather'
                //res.render('index',data);
                //console.log(data)
            })
        })
    }

    
    //console.log(req.query.address)

})
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'ABCD' 
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'ABCD' 
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'ABCD' 
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.key){
        return res.send({
            error:'You must provide a key'
        })
    }

    console.log(req.query.key)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'Help page not found',
        about:'page not found'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title:'404 not found',
        about:'page not found'
    })
})




app.listen(port,()=>{
    console.log('Server is up on port '+port)
})
