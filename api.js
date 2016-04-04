'use strict'

const http = require('http');
const https = require('https');
const fs   = require('fs');
const querystring = require('querystring');
const apiHost = "api.projectoxford.ai";

module.exports = {

    /**
     * Call MicroSoft Computer Vision API, etc.
     * options
     *   - service: Service name
     *   - key: Access key(find your key from https://www.microsoft.com/cognitive-services/en-us/subscriptions)
     *   - query: Query string attached a tail of service like (/service?param=something). It should be dictionary form.
     *   - image_url: {"url", "<image url>"}, 1st priotiry.
     *   - image_path: image file path to be sent, 2nd priority.
     */
    call: (args) => {

        // Decide content type
        let contentType, postData;
        if(args['image_url']) {
            contentType = 'application/json';
            postData = JSON.stringify(args['image_url']);
        } else if(args['image_path']) {
            contentType = 'application/octet-stream';
            postData = fs.readFileSync(args['image_path']);
        } else {
            // TODO: return with error.
        }

        // Build http request.
        let requestPath = args['service'];
        if(args['query']) {
            requestPath = requestPath + '?' + querystring.stringify(args['query']);
        }
        let options;
        if(global.proxy) {
            options = {
                host: global.proxy['host'],
                port: global.proxy['port'],
                path: 'https://'+ apiHost + requestPath,
                method: 'POST',
                headers: {
                    'Host': apiHost,
                    'Content-Type': contentType,
                    'Content-Length': postData.length,
                    'Ocp-Apim-Subscription-Key': args['key'],
                }
            }
        } else {
            options = {
                host: apiHost,
                port: 443,
                path: requestPath,
                method: 'POST',
                headers: {
                    'Content-Type': contentType,
                    'Content-Length': postData.length,
                    'Ocp-Apim-Subscription-Key': args['key'],
                }
            }
        }

        return new Promise((resolve, reject) => {
            const proto = global.proxy ? http : https;
            const req = proto.request(options, (res) => {
                if(res.statusCode < 200 || resolve.statusCode > 299) {
                    reject(new Error('Failed to load page, status code: ' + res.statusCode));
                }
                res.setEncoding('utf-8');

                const body = [];
                res.on('data', (chunk) => body.push(chunk));
                res.on('end', () => resolve(body.join('')));
            });

            req.on('error', (err) => reject(err));
            req.write(postData);
            req.end();
        });
    }
}
