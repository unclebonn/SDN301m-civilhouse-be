import express from 'express'
import contractController from '~/controllers/contract.controller';
const router = express.Router();

router
.route("/")
.get(contractController.getAllContract)
.post(contractController.createContract)


router
.route('/:id')
.put(contractController.updateContractbyId)
.delete(contractController.deleteContractbyId)
.get(contractController.getContractById)

router
.route('/user/:userID')
.get(contractController.getContractByUserId)

router 
.route('/building/:buildingID')
.get(contractController.getContractByBuildingId)

export default router;
