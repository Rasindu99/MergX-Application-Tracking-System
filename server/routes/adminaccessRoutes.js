const express = require('express');
const router = express.Router();
const cors = require('cors');
const { postaccess, putCreateUserAccount,  getCreateUserAccount, putModifyUserAccount, updateRole, getModifyUserAccount, getupdateRole, getDeleteUserAccount, putDeleteUserAccount } = require('../controllers/adminaccessController');
const { postrecruiteraccess } = require('../controllers/recruiteraccessController')

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
);
//admin access
router.post('/postaccess', postaccess);
router.put('/updatecreateuseraccount',putCreateUserAccount);
router.put('/modifyuseraccount',putModifyUserAccount);
router.put('/updateroleaccess', updateRole);
router.put('/deleteuser', putDeleteUserAccount);

router.get('/getcreateuseraccount',getCreateUserAccount);
router.get('/getmodifyuseraccount', getModifyUserAccount);
router.get('/getupdaterole', getupdateRole);
router.get('/getdeleteaccount', getDeleteUserAccount);

//recruiter access
router.post('/postrecruiteraccess',postrecruiteraccess);

module.exports = router;
