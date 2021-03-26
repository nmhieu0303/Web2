const users = [{
    id: 1,
    displayName: 'Nguyễn Minh Hiếu',
    username: '18600087',
    email: 'abc@gmail.com',
    password: '$2b$10$D5irnf26qmmfNC7vEqeDMeTnVNiES/nWVS9.FqUaR8sFMjIi3tnmq'
}, {
    id: 2,
    displayName: 'Ronadol',
    username: 'abc',
    email: 'abc@gmail.com',
    password: 'abc'
}, {
    id: 3,
    displayName: 'Neymar',
    username: '1860008',
    email: 'abc@gmail.com',
    password: '$2b$10$D5irnf26qmmfNC7vEqeDMeTnVNiES/nWVS9.FqUaR8sFMjIi3tnmq'
}];
exports.findByUsername = function(username) {
    return users.find(user => user.username === username);
}

exports.findByEmail = function(email) {
    return users.find(user => user.email === email);
}

exports.findById = function(id) {
    return users.find(user => user.id === id);
}