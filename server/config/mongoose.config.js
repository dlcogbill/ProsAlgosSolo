const mongoose = require('mongoose');
const soloProjectDB = "soloProjectDB";

mongoose.connect(`mongodb://0.0.0.0/${soloProjectDB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log(`Connection established to MongoDB ${soloProjectDB}`);
    })
    .catch((err) => {
        console.log('DB CONNECTION ERROR', err);
    });
