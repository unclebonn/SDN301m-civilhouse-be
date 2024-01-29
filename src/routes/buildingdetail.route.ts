import { Router } from 'express';
import { createBuildingDetail, getBuildingDetail, getBuildingDetailById, deleteBuildingDetailById, updateBuildingDetailById } from '~/controllers';

const router = Router();

router
    .route("/")
    //get building
    .get(getBuildingDetail)
    // create building
    .post(createBuildingDetail)

router.route("/:id")
    //get building by id
    .get(getBuildingDetailById)
    // delete building by id
    .delete(deleteBuildingDetailById)
    //update building
    .put(updateBuildingDetailById);

export default router;