import { verify } from 'crypto';
import { Router } from 'express';
import { validate } from 'json-schema';
import { createBuildingDetail, getBuildingDetail, getBuildingDetailById, deleteBuildingDetailById, updateBuildingDetailById } from '~/controllers';
import { checkIDifExisted, validateBuildingDetail, validateBuildingDetailUpdate, verifyBuildingDetail } from '~/middlewares/buildingdetailVerifying.middleware';

const router = Router();

router
    .route("/")
    // create building
    .post(
        validateBuildingDetail,
        verifyBuildingDetail,
        createBuildingDetail
    );

// get all buiding
router.route("/all").get(getBuildingDetail);

router.route("/:id")
    //get building by id
    .get(getBuildingDetailById)
    // delete building by id
    .delete(
        checkIDifExisted,
        deleteBuildingDetailById)
    //update building
    .put(
        checkIDifExisted,
        validateBuildingDetailUpdate,
        verifyBuildingDetail,
        updateBuildingDetailById);

export default router;