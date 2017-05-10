'use strict'

module.exports = (sequelize, DataTypes)=>{
	const Yapi = sequelize.define('yapi', {
		kimlikno: {
			type: DataTypes.BIGINT

		},
		ad: {
			type: DataTypes.STRING
		},
		zeminustu: {
			type: DataTypes.INTEGER
		},
		zeminalti: {
			type: DataTypes.INTEGER
		},
		tip: {
			type: DataTypes.ENUM,
			values: ['Mesken','Kamu','Isyeri']
		},
		durum: {
			type: DataTypes.ENUM,
			values: ['Bilinmeyen','Proje','Insaat','Iskan','Ruhsatsiz','KismiIskan','YananYikilan']
		},
		olcek: {
			type: DataTypes.ENUM,
			values: ['1/500','1/1000','1/2000','1/2500','1/5000','1/10000','1/25000']
		},
		olusumyontemi: {
			type: DataTypes.ENUM,
			values:['Elektronik Takeometre','GPS Teknigi','Ortofoto Uzerinden Sayisallastirma',
					'Uzaktan Algilama ile Sayisallastirma','Uydu Goruntusunden Sayisallastirma',
					'Pafta Uzerinden Elle Sayisallastirma','Pafta Uzerinden Tarama Yontemiyle Sayisallastirma',
					'Koordinatsiz Cizim']
		},
		parselkimlikno: {
			type: DataTypes.BIGINT
		},
		postakodu: {
			type: DataTypes.STRING
		},
		sitekoopadi: {
			type: DataTypes.STRING
		},
		aciklama: {
			type: DataTypes.STRING
		},
		adano: {
			type: DataTypes.INTEGER
		},
		parselno: {
			type: DataTypes.INTEGER
		},
		paftano: {
			type: DataTypes.STRING
		},
		geom: {
			type: DataTypes.GEOMETRY('Polygon',4326)
		}
	}, {
		paranoid: true,
		underscored:  true,
		freezeTableName: true
	});
	return Yapi;
};