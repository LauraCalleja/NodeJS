import {createServer} from 'http';

const useers = [
    {id:1, name: 'Laura Calleja'},
    {id:2, name: 'Isaac Francisco'},
    {id:3, name: 'Saul Javier'},
];

const server = createServer((req, res) => {
    if (req.url === '/api/users' && req.method === 'GET') {
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(users));
        res.end();
    } else if (
        req.url.match(/\/api\/users\/([0-9]+)/) &&
            req.method === 'GET'
        ) {
            getUserByIdHandler(req, res);
        } else if (req.url === '/api/users' && req.method === 'POST') {
            createUserHandler(req, res);
        } else {
            notFoundHandler(req, res);
        }
        });
  