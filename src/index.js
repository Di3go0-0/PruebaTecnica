import app from './app.js';
import SwaggerDocs from './swagger.js'


const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    SwaggerDocs(app, PORT)
    });

// set -x NODE_OPTIONS --experimental-vm-modules
// npx jest