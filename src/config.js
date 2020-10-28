const config = {
	'development': {
		'domain': 'http://200.150.129.6:5000',
		'appName': "PontoTel Challenge",
		'version': "1.0",
		'company': "PontoTel",
		'year': "2020"
	}
}

let environment = 'development';
require('dotenv').config();
if(process.env.REACT_APP_NODE_ENV !==  undefined){
	environment = process.env.REACT_APP_NODE_ENV ;
}

console.log("Starting environment " + environment)

export const Properties = config[environment];
