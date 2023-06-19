const mssql = require('mssql')

// const getAUser = ('../utils/getAUser')
const config = require('../config/config');

async function getAUser(MemberID) {
    let sql = await mssql.connect(config);

    if (sql.connected) {
        try {
            let result = await sql.query(`SELECT * FROM dbo.Members WHERE MemberID =${MemberID}`)
                // .input("MemberID", MemberID)
                // .execute("dbo.get_Member_byID");

            let user = result.recordset[0];

            return user
        } catch (error) {
            console.error('Error retrieving user from database: ', error);
            return null;
        }
    } else {
        return null;
    }
}

module.exports = getAUser;