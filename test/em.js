const mscog = require('../index');

// proxy configuration
global.proxy = {
    'host': 'your.proxy.com',
    'port': 8080
}

const options1 = {
    'service': mscog.endpoints.emrecognize,
    'key': '<your service key>',
    'image_path': './test/oko.jpg'
}

mscog.api.call(options1).then((html) => {
    emotions = JSON.parse(html);
    for (var em of emotions) {
        console.log(em);
    }

}).catch((err) => console.log(err));
