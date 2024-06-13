// import bcrypt from 'bcrypt';
// const bcrypt = require('bcryptjs');
import bcrypt from 'bcryptjs';

export const hashFunction = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
}

