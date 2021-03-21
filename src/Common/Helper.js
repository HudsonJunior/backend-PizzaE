module.exports = {
    fieldSearch(field, value, array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][field] == value) return i;
        }
        return false;
    },
};
