import bcrypt from 'bcrypt';


/**
 * 
 * @param {String} password 
 * @returns {Promise<String>}
 */
export const encryptPassword = async (password) => {

   const salt = await bcrypt.genSalt(10);
   return await bcrypt.hash(password, salt);
}

/**
 * 
 * @param {String} password 
 * @param {String} passwordDB 
 * @returns {Promise<Boolean>}
 */
export const validatePassword = async (password, passwordDB) => {

   return await bcrypt.compare(password, passwordDB);
}