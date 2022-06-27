const mongoose = require('mongoose');
const soloProjectDB = "soloProjectDB";

mongoose.connect(`mongodb://localhost/${soloProjectDB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log(`Connection established to MongoDB ${soloProjectDB}`);
    })
    .catch((err) => {
        console.log('DB CONNECTION ERROR', err);
    });