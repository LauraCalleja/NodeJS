import http from 'http';
import fs from 'fs/promises';
//import { promises } from 'dns';
import url from 'url';
import path from 'path';
const PORT = process.env.PORT;

//Get current path
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__filename, __dirname);

const server = http.createServer(async (req, res) => {
    //res.setHeader('Content-Type', 'text/html');
    //res.statusCode = 404;
    //console.log(req.url);
    //console.log(req.method);
    try {
        // Check if GET request
        if(req.method === 'GET') {
            let filePath;
            if (req.url === '/') {
                filePath = path.join(__dirname, 'public', 'index.html');
        
            } else if (req.url === '/about') {
                filePath = path.join(__dirname, 'public', 'about.html');

            } else {
                //res.writeHead(404, { 'Content-Type': 'text/html'})       
                //res.end('<h1>Not Found</h1');
                throw new Error('Not Found');
            }
            const data = await fs.readFile(filePath);
            res.setHeader('Content-Type', 'text/html')
            res.write(data);
            res.end();
        } else{
            throw new Error('Method not allowed');
        }
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain'})       
        res.end('ServerError');
    }


    //res.writeHead(200, { 'Content-Type': 'text/html'})
    //res.end(JSON.stringify({ message: 'Server Error' }));
    //res.end('<h1>Hello World!</h1');
    //res.writeHead(200, { 'Content-Type': 'application/JSON'})
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
