const mssql = require('mssql')
const config = require('../config/config')
const bcrypt = require('bcrypt')
const getAUser = require('../utilis/getAUser')
loginUser: async(req, res) => {
    let { MemberID, Password } = req.body;

    try {
        let user = await getAUser(MemberID);
        if (user) {
            let passwordsMatch = await bcrypt.compare(Password, user.Password)
            console.log(passwordsMatch);
            if (passwordsMatch) {
                let token = await tokenGenerator({ MemberID: user.MemberID, roles: "admin" });
                res.json({ success: true, message: "Logged in successfully", token });
            } else {
                res.status(401).json({ success: false, message: "Wrong user credentials", results: `${user.Password} ${Password}` });
            }
        } else {
            res.status(404).json({ success: false, message: "No user found" });
        }
    } catch (error) {
        console.error('Error authenticating user: ', error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}