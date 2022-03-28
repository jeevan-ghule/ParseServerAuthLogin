const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const CustomAuth = require('./customAuth');
var ParseDashboard = require('parse-dashboard');
// databaseURI: "mongodb://127.0.0.1:27017/nft", //'mongodb://localhost:27017/dev',

const config = {
    databaseURI: "postgres://admin:admin@0.0.0.0:5432/parse",
    cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud.js',
    appId: process.env.APP_ID || 'myAppId',
    masterKey: process.env.MASTER_KEY || 'masterKey', //Add your master key here. Keep it secret!
    serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse', // Don't forget to change to https if needed
    liveQuery: {
        classNames: ['Posts', 'Comments'], // List of classes to support for query subscriptions
    },
    restApiKey: 'Qwerty&*900',
    allowClientClassCreation: false,
    auth: {
        myAuth: {
            module: CustomAuth,
            appIds: ['aa', 'bb']
        }
    },
    sessionLength: 60 * 10 // 10
};


var options = { allowInsecureHTTP: false };

var dashboard = new ParseDashboard({
    "apps": [
        {
            "serverURL": "http://localhost:1337/parse",
            "appId": "myAppId",
            "masterKey": "masterKey",
            "appName": "MyApp"
        }
    ]
}, options);


const app = express();

// Serve static assets from the /public folder
// app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
const mountPath = process.env.PARSE_MOUNT || '/parse';
const api = new ParseServer(config);
app.use(mountPath, api);
// make the Parse Dashboard available at /dashboard
app.use('/dashboard', dashboard);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function (req, res) {
    res.status(200).send('I dream of being a website.  Please star the parse-server repo on GitHub!');
});

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
// app.get('/test', function (req, res) {
//     res.sendFile(path.join(__dirname, '/public/test.html'));
// });

const port = process.env.PORT || 1337;
const httpServer = require('http').createServer(app);
httpServer.listen(port, function () {
    console.log('parse-server-example running on port ' + port + '.');
});
// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);
