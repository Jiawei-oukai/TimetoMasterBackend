// import bcrypt from "bcrypt";
import bcrypt from 'bcryptjs';

// const bcrypt = require('bcryptjs');

export const validatePassword = async (plainPassword, hashedPassword) => {
  const validatedPassword = await bcrypt.compare(plainPassword, hashedPassword);
    return validatedPassword;
};
