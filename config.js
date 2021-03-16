module.exports = {
    name: "API",
    env: process.env.NODE_ENV || "development",
    port: process.env.PORT || 8080,
    base_url: process.env.BASE_URL || "http://localhost:8080",
    db: {
        uri:
            process.env.MONGODB_URI ||
            "mongodb+srv://admin:admin@cluster0.qggnh.mongodb.net/Cluster0?retryWrites=true&w=majority&ssl=true",
    },
};
