const router = require('express').Router();
const dbAuth = require('../db/dbAuth.js');
const {
    searchBusGetController,
    searchBusPostController
  
} = require('../controllers/searchController.js')
router.get('/bus',searchBusGetController);
router.post('/bus',searchBusPostController);

module.exports = router;
