const mssql = require('mssql')
const config = require('../config/config')
const bcrypt = require('bcrypt')
const getAUser = require('../utilis/getAUser')
const { tokenGenerator } = require("../utilis/tokens")
const { newUserValidator } = require('../validators/newUserValidator')


module.exports = {

    postUser: async(req, res) => {
        let user = req.body
            // let salt = await bcrypt.genSalt(8),
            // let hashed_pwd = await bcrypt.hash(user.Password, salt)

        console.log(user)
            // let valid_user = newUserValidator(user) 
        let { value } = newUserValidator(user) //we can just destructure this to get the value of what we are passing to the database in this case the fullName, contactNumber, address and password//remember we got rid of the if(sql.connected) block since by now we have handled all the errors and have a legit user
        console.log(value)
        let hashed_pwd = await bcrypt.hash(user.Password, 8)



        let sql = await mssql.connect(config)


        try {


            if (sql.connected) {

                let results = await sql.request()
                    .input("Name", value.Name)
                    .input("Address", value.Address)
                    .input("ContactNumber", value.ContactNumber)
                    .input("Password", hashed_pwd)
                    .execute("dbo.create_new_member")


                console.log(results)
                results.rowsAffected.length ? res.send({ success: true, message: 'Saved User' }) :
                    res.send({ success: false, message: 'An error occurred' })
            }



        } catch (error) {
            res.send(error.message) //don't ever return an error this way which is the error returned by the ode as this exposes some details

        }








    },






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


}




