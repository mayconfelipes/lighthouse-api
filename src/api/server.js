const httpServer = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
	console.log(`API RODANDO NA PORTA ${PORT}.`);
});
