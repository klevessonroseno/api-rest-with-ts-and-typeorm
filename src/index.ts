import { AppDataSource } from "./data-source"

AppDataSource.initialize().then(async () => {
    console.log('Database connected succesfully.');
}).catch(error => console.log(error));
