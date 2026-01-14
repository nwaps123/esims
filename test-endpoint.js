const https = require('https');

const options = {
  hostname: 'keys.foreignpay.ru',
  port: 443,
  path: '/webhook/esim-trip/get-products?country=france',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'Node.js Test'
  }
};

console.log('Testing:', options.hostname + options.path);

const req = https.request(options, (res) => {
  console.log('Status:', res.statusCode);
  console.log('Headers:', res.headers);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response length:', data.length);
    console.log('First 500 chars:', data.substring(0, 500));
    
    try {
      const parsed = JSON.parse(data);
      console.log('Parsed successfully');
      console.log('Type:', typeof parsed);
      console.log('Is array?', Array.isArray(parsed));
      if (Array.isArray(parsed)) {
        console.log('Array length:', parsed.length);
        if (parsed.length > 0) {
          console.log('First item keys:', Object.keys(parsed[0]));
        }
      }
    } catch (e) {
      console.log('JSON parse error:', e.message);
    }
  });
});

req.on('error', (e) => {
  console.error('Request error:', e.message);
});

req.end();
