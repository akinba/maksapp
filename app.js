//Required frameworks
const 	express		=	require('express'),
		bodyParser 	=	require('body-parser'),
		pg			=	require('pg'),
		Sequelize	=	require('sequelize'),
		socketIO	=	require('socket.io'),
		http		=	require('http');

const app = express();
var port=process.env.PORT||3005;

//middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static('statics'));

//set socket.io
var server 	= http.createServer(app);
var io 		= socketIO(server);

//set database
var sequelize = new Sequelize("postgres://postgres:ntc123*@192.168.2.188:5432/serkangis");
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.yapi = require('./models/yapi.js')(sequelize, Sequelize);
//db.kapi = require('./models/kapi.js')(sequelize, Sequelize);
db.sequelize.sync({force: true});


app.get('/',(req,res)=>{
	res.render('index');
});


//run app
server.listen( port, ()=>{
	console.log(`Sunucu ${port}'de calisiyor`  );
});

