const Adminaccessmodel = require('../models/adminAccess');

//const post access
const postaccess = async (req, res) => {
    try {
        const { create_user_account, modify_user_account, role_update, delete_user_account } = req.body;

        // Check for the presence of required fields
        if (typeof create_user_account !== 'boolean' || typeof modify_user_account !== 'boolean' || 
            typeof role_update !== 'boolean' || typeof delete_user_account !== 'boolean') {
            return res.status(400).json({ error: 'Missing or invalid required fields' });
        }

        // Create the database entry
        const adminAccess = await Adminaccessmodel.create({
            create_user_account,
            modify_user_account,
            role_update,
            delete_user_account
        });

        return res.status(201).json({ message: 'Updated successfully', adminAccess });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
}

//put create_user_account
const putCreateUserAccount = async (req, res) => {
    try {
        const { create_user_account } = req.body;

        if (typeof create_user_account !== 'boolean') {
            return res.status(400).json({ error: 'Invalid create_user_account value' });
        }

        const updatedAdminAccess = await Adminaccessmodel.findOneAndUpdate(
            {}, // You might want to add a condition here based on your criteria
            { create_user_account },
            { new: true, useFindAndModify: false }
        );

        if (!updatedAdminAccess) {
            return res.status(404).json({ error: 'Admin access settings not found' });
        }

        return res.status(200).json({ message: 'create_user_account updated successfully', updatedAdminAccess });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

//put modify user account
const putModifyUserAccount = async (req, res) => {
    try {
        const { modify_user_account } = req.body;

        if (typeof modify_user_account !== 'boolean') {
            return res.status(400).json({ error: 'Invalid create_user_account value' });
        }

        const updatedAdminAccess = await Adminaccessmodel.findOneAndUpdate(
            {}, // You might want to add a condition here based on your criteria
            { modify_user_account },
            { new: true, useFindAndModify: false }
        );

        if (!updatedAdminAccess) {
            return res.status(404).json({ error: 'Admin access settings not found' });
        }

        return res.status(200).json({ message: 'modify_user_account updated successfully', updatedAdminAccess });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

//update role put
const updateRole = async(req,res) => {
    try {
        const {role_update } = req.body;

        if (typeof role_update !== 'boolean') {
            return res.status(400).json({ error: 'Invalid user role update access value' });
        }

        const updatedAdminAccess = await Adminaccessmodel.findOneAndUpdate(
            {}, // You might want to add a condition here based on your criteria
            { role_update },
            { new: true, useFindAndModify: false }
        );

        if (!updatedAdminAccess) {
            return res.status(404).json({ error: 'Admin access settings not found' });
        }

        return res.status(200).json({ message: 'user role update access successfully', updatedAdminAccess });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
}

//put deleteuser account
const putDeleteUserAccount = async(req, res) => {
    try {
        const {delete_user_account } = req.body;

        if (typeof delete_user_account !== 'boolean') {
            return res.status(400).json({ error: 'Invalid user delete access value' });
        }

        const updatedAdminAccess = await Adminaccessmodel.findOneAndUpdate(
            {}, // You might want to add a condition here based on your criteria
            { delete_user_account },
            { new: true, useFindAndModify: false }
        );

        if (!updatedAdminAccess) {
            return res.status(404).json({ error: 'Admin access settings not found' });
        }

        return res.status(200).json({ message: 'user delete access updated successfully', updatedAdminAccess });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
}


// GET create_user_account
const getCreateUserAccount = async (req, res) => {
    try {
        const adminAccess = await Adminaccessmodel.findOne(); // You might want to add a condition here based on your criteria

        if (!adminAccess) {
            return res.status(404).json({ error: 'Admin access settings not found' });
        }

        return res.status(200).json({ create_user_account: adminAccess.create_user_account });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

//get modify access
const getModifyUserAccount = async (req, res) => {
    try {
        const adminAccess = await Adminaccessmodel.findOne(); // You might want to add a condition here based on your criteria

        if (!adminAccess) {
            return res.status(404).json({ error: 'Admin access settings not found' });
        }

        return res.status(200).json({ modify_user_account: adminAccess.modify_user_account });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

//get role update access
const getupdateRole = async (req, res) => {
    try {
        const adminAccess = await Adminaccessmodel.findOne(); // You might want to add a condition here based on your criteria

        if (!adminAccess) {
            return res.status(404).json({ error: 'Admin access settings not found' });
        }

        return res.status(200).json({role_update: adminAccess.role_update });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

//get user delete access
const getDeleteUserAccount = async (req, res) => {
    try {
        const adminAccess = await Adminaccessmodel.findOne(); // You might want to add a condition here based on your criteria

        if (!adminAccess) {
            return res.status(404).json({ error: 'Admin access settings not found' });
        }

        return res.status(200).json({delete_user_account: adminAccess.delete_user_account });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};




module.exports = {
    postaccess,
    putCreateUserAccount,
    putModifyUserAccount,
    putDeleteUserAccount,
    updateRole,

    getCreateUserAccount,
    getModifyUserAccount,
    getupdateRole,
    getDeleteUserAccount
}
