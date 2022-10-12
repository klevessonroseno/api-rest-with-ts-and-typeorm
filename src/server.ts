import { AppDataSource } from './data-source';
import server from './app';

const port = process.env.SERVER_PORT;

AppDataSource.initialize().then(async () => {
    server.listen(3000, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(error => console.error(error));
