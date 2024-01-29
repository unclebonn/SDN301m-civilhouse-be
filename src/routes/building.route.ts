import { Router } from "express";
import { createBuilding, deleteBuildingById, getBuilding, getBuildingById, updateBuildingById } from "~/controllers";

const router = Router();

router
    .route("/")
    //get building
    .get(getBuilding)
    // create buidling
    .post(createBuilding)


    


router.route("/:id")
    //get building by id
    .get(getBuildingById)
    // delete buidling by id
    .delete(deleteBuildingById)
    //update buidling
    .put(updateBuildingById);

export default router;





