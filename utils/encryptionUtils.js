const bcrypt = require('bcrypt');


const hashPwd = async (pwd) => {
    try {
        return await bcrypt.hash(pwd, 10);
    } catch (error) {
        throw new Error("Hashing password failed: " + error.message);
    }
};
const comparePwd = async (password,hashedPassword)=>{
   return await bcrypt.compare(password, hashedPassword);
}

const Encry = { hashPwd,comparePwd };

module.exports = {Encry};
