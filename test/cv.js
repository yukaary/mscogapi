const mscog = require('../index');

// proxy configuration
global.proxy = {
    'host': 'your.proxy.com',
    'port': 8080
}


const options1 = {
    'service': mscog.endpoints.imanalyze,
    'key': '<your service key>',
    'query': {
        'visualFeature': 'Categories'
    },
    'image_url': {
        'url': 'http://tetoan.com/wp-content/uploads/2015/04/%E6%80%92%E3%81%A3%E3%81%9F%E9%A1%94%E3%81%AE%E7%8C%AB.jpg'
    }
}

mscog.api.call(options1).then((html) => console.log(html)).catch((err) => console.log(err));

const options2 = {
    'service': mscog.endpoints.imanalyze,
    'key': '<your service key>',
    'query': {
        'visualFeature': 'Categories'
    },
    'image_path': './test/cat.jpg'
}

mscog.api.call(options2).then((html) => console.log(JSON.parse(html)["categories"][0]["name"])).catch((err) => console.log(err));

const options3 = {
    'service': mscog.endpoints.imdesc,
    'key': '<your service key>',
    'query': {
        'maxCandidates': 1
    },
    'image_path': './test/cat.jpg'
}

mscog.api.call(options3).then((html) => console.log("Title:" + JSON.parse(html)["description"]["captions"][0]["text"])).catch((err) => console.log(err));

const options4 = {
    'service': mscog.endpoints.imdesc,
    'key': '<your service key>',
    'query': {
        'maxCandidates': 1
    },
    'image_path': './test/RX-7.jpg'
}

mscog.api.call(options4).then((html) => console.log("Title:" + JSON.parse(html)["description"]["captions"][0]["text"])).catch((err) => console.log(err));
