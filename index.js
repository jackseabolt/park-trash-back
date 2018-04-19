const express = require('express'); 
const morgan = require('morgan'); 
const cors = require('cors'); 
const { PORT, CLIENT_ORIGIN } = require('./config'); 
const { sequelize } = require('./db/sequelize'); 
const { router: itemRouter } = require('./routers/itemRouter');
const app = express();  


app.use(morgan('common')); 
app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
)


app.use('/item', itemRouter); 

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Here is my response'})
}); 

// starting and stopping server

let server = app; 

const runServer = (port) => {
    server.listen(port, () => {
        console.log(`App is listening on port ${port}`); 
    }); 
}

const closeServer = () => {
    server.close(err => {
        if(err) {
            console.error(err); 
        }
    })
}

if (require.main === module) {
    runServer(PORT); 
}