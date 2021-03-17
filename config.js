module.exports = {
    name: 'API',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 8080,
    base_url: process.env.BASE_URL || 'http://localhost:8080',
    db: {
        uri:
            process.env.MONGODB_URI ||
            'mongodb://admin:admin@cluster0-shard-00-00.qggnh.mongodb.net:27017,cluster0-shard-00-01.qggnh.mongodb.net:27017,cluster0-shard-00-02.qggnh.mongodb.net:27017/Cluster0?ssl=true&replicaSet=atlas-r8w5zd-shard-0&authSource=admin&retryWrites=true&w=majority',
    },
};
