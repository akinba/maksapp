//Required frameworks
const 	express		=	require('express'),
		bodyParser 	=	require('body-parser'),
		pg			=	require('pg'),
		Sequelize	=	require('sequelize'),
		socketIO	=	require('socket.io'),
		http		=	require('http'),
		os			=	require('os');

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
if (os.hostname()=='raspi') {
	var sequelize = new Sequelize("postgres://postgres:pi@localhost:5432/maks");
} else {
	var sequelize = new Sequelize("postgres://postgres:pi@www.akinba.com:5432/maks");
}
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.yapi = require('./models/yapi.js')(sequelize, Sequelize);
//db.kapi = require('./models/kapi.js')(sequelize, Sequelize);
db.sequelize.sync({force: false});

//publish index page with attributes
app.get('/',(req,res)=>{
	res.render('index',{tables: ['yapi']});
});


io.on('connection',(socket)=>{
	console.log(`${socket.id} connected`);
	socket.on('getyapi',(data)=>{
		console.log(data);
		db.yapi.findAll({
			//limit:1,
			where: {
				geom: {
					$overlap: db.yapi.sequelize.fn('ST_MakeEnvelope', 
						data[0],
						data[1],
						data[2],
						data[3])
				}
			}
		}).then((rows)=>{
			var geoJson={"type": "FeatureCollection", "features": []};
			rows.forEach((row)=>{
				var geometry= row.dataValues.geom;
				delete row.dataValues.geom;
				var feature= {
					"type":"Feature",
					"geometry": geometry,
					"properties": row.dataValues
				}
				geoJson.features.push(feature);
			});
			//console.log(geoJson);
			io.sockets.sockets[socket.id].emit('drawyapi', geoJson);
		});
	});
});

//run app
server.listen( port, ()=>{
	console.log(`Sunucu ${port}'de calisiyor`  );
});

