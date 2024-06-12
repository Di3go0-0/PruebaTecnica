import app from './app.js';
import { PORT } from './config.js';
import {connect} from './database/db.js';

connect();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });