const fs = require('fs');
const https = require('https');
const path = require('path');

const images = [
    { url: 'https://images.unsplash.com/photo-1624355385006-2592b2d28f80?auto=format&fit=crop&q=80&w=800', path: 'public/images/gallery/choila.jpg' },
    { url: 'https://images.unsplash.com/photo-1596560548464-f010549b8416?auto=format&fit=crop&q=80&w=800', path: 'public/images/gallery/momo.jpg' },
    { url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800', path: 'public/images/gallery/samosa.jpg' },
    { url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800', path: 'public/images/gallery/curry.jpg' },
    { url: 'https://images.unsplash.com/photo-1609181169828-4ce6838e5531?auto=format&fit=crop&q=80&w=800', path: 'public/images/gallery/selroti.jpg' },
    { url: 'https://images.unsplash.com/photo-1631515243349-e0603f48808c?auto=format&fit=crop&q=80&w=800', path: 'public/images/gallery/thakaliset.jpg' },
    { url: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&q=80&w=800', path: 'public/images/gallery/thukpa.jpg' },
    { url: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&q=80&w=800', path: 'public/images/gallery/sekuwa.jpg' },
    { url: 'https://images.unsplash.com/photo-1603133872878-684f10842796?auto=format&fit=crop&q=80&w=800', path: 'public/images/gallery/friedrice.jpg' },
    { url: 'https://images.unsplash.com/photo-1542385317-21a48c9085df?auto=format&fit=crop&q=80&w=800', path: 'public/images/gallery/kheer.jpg' },
    { url: 'https://images.unsplash.com/photo-1544025162-d76690b6d029?auto=format&fit=crop&q=80&w=1920', path: 'public/images/reservation-bg.jpg' },
    { url: 'https://images.unsplash.com/photo-1588675646184-f5b0b0b0b2de?auto=format&fit=crop&q=80&w=1200', path: 'public/images/about-img.jpg' },
    { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=100&w=1920', path: 'public/images/hero-bg.jpg' }
];

const downloadImage = (url, filepath) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filepath);
        https.get(url, (response) => {
            if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    console.log(`Downloaded: ${filepath}`);
                    resolve();
                });
            } else if (response.statusCode === 302 || response.statusCode === 301) {
                // Follow redirect
                downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
            } else {
                file.close();
                fs.unlink(filepath, () => { }); // Delete the file async
                reject(`Server responded with ${response.statusCode}: ${response.statusMessage} for ${url}`);
            }
        }).on('error', (err) => {
            fs.unlink(filepath, () => { }); // Delete the file async
            reject(err.message);
        });
    });
};

(async () => {
    // Ensure directories exist
    if (!fs.existsSync('public/images/gallery')) {
        fs.mkdirSync('public/images/gallery', { recursive: true });
    }

    for (const image of images) {
        try {
            await downloadImage(image.url, image.path);
        } catch (error) {
            console.error(`Failed to download ${image.path}:`, error);
        }
    }
})();
