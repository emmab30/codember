const _ = require('lodash');
const axios = require('axios');

const getFile = () => {
    return axios.get(`https://codember.dev/users.txt`)
    .then((response) => {
        const data = [];
        let buffer = [];
        const lines = response.data.split('\n');
        for(var idx in lines) {
            const line = lines[idx];
            if(line == '') {
                data.push(buffer.join(' '));

                buffer = [];
                continue;
            }

            buffer = buffer.concat(line);
        }

        return data;
    });
}

const getBoomerangs = (array) => {
    let boomerangsCount = 0;
    for(var idx in array) {
        const index = parseInt(idx);
        if(array.length < (index + 2)) continue;

        boomerangsCount += (array[index] == array[index + 2] && array[index + 1] != array[index]) ? 1 : 0;
    }

    return boomerangsCount;
};

const USER_REQUIRED_KEYS = ['usr', 'eme', 'psw', 'age', 'loc', 'fll'];
const getValidUsers = (users) => {
    const validUsers = [];
    for(var idx in users) {
        const index = parseInt(idx);
        const user = users[index];
        const properties = user.split(' ');
        const keys = _.map(properties, i => i.split(':')[0]);

        const intersection = _.intersection(keys, USER_REQUIRED_KEYS);
        let isValid = intersection.length === USER_REQUIRED_KEYS.length;

        if(isValid) validUsers.push(user);
    }

    return _.compact(validUsers);
}

getFile().then((users) => {
    const validUsers = getValidUsers(users);

    // Print the results
    console.log(`[Resultados] Numero total de usuarios: ${validUsers.length}`);
    console.log(`[Resultados] Ultimo usuario`, _.last(validUsers));
});