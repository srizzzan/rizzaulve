const https = require('https');

https.get('https://unsplash.com/s/photos/fashion-model', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Unsplash pages usually have a lot of images with the URL format we want
    const matches = data.match(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+/g);
    if (!matches) {
      console.log('No matches found');
      return;
    }
    const unique = [...new Set(matches)];
    console.log(JSON.stringify(unique.slice(0, 20), null, 2));
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
