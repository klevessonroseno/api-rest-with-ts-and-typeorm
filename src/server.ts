import { AppDataSource } from './config/data-source';
import server from './App';

const port = process.env.SERVER_PORT;

class Server {
    static init(): void {
        AppDataSource.initialize().then(async () => {
            server.listen(port, () => {
                console.log(`Server is running on port ${port}`);
            });
        }).catch(error => console.error(error));
    }
}

Server.init();
