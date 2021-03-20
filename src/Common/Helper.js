module.exports = {
    idExists(id, array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i]['_id'] == id) return i;
        }
        return false;
    },
};
