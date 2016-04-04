mscogapi
===============================================================================

Sample node.js client implementation for MicroSoft Cognitive Services.

## Usage

Call image analysis API with image URL.
```
const mscog = require('mscog');

const urloption = {
    'service': mscog.endpoints.imanalyze,
    'key': '<your service key>',
    'query': {
        'visualFeature': 'Categories'
    },
    'image_url': {
        'url': 'http://tetoan.com/wp-content/uploads/2015/04/%E6%80%92%E3%81%A3%E3%81%9F%E9%A1%94%E3%81%AE%E7%8C%AB.jpg'
    }
}

mscog.api.call(urloption).then((html) => console.log(html)).catch((err) => console.log(err));
```

Call image analysis API with image PATH.
```
const mscog = require('mscog');

const pathoption = {
    'service': mscog.endpoints.imanalyze,
    'key': '<your service key>',
    'query': {
        'visualFeature': 'Categories'
    },
    'image_path': './test/cat.jpg'
}

mscog.api.call(pathoption).then((html) => console.log(html)).catch((err) => console.log(err));
```
