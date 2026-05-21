const fs = require('fs');
const https = require('https');

const token = 'patKMig4Cnzdgwqs9.e5fcf1a5e7d06b23573b5584c4fd8f37e608bfc97cbe2a350a94036ed633eacc';

const options = {
  hostname: 'api.airtable.com',
  path: '/v0/meta/bases',
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    console.log(data);
  });
});

req.on('error', (e) => {
  console.error(e);
});

req.end();
