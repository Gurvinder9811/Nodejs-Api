const express = require('express');
const {handleGetUsers,
     handlegetUserById, 
     handleUpdateUserById,
     handleDeleteUserById,
     handleCreateNewUser
    } = require('../controllers/user')
const router = express.Router();

//Route


//REST API
router.route("/").get(handleGetUsers).post(handleCreateNewUser); 

router
.route("/:id")
.get(handlegetUserById)
.patch(handleUpdateUserById)
.delete(handleDeleteUserById);


module.exports = router;