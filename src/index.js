import app from './app.js';


const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });

// set -x NODE_OPTIONS --experimental-vm-modules
// npx jest