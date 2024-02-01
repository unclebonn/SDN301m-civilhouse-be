import { Router } from "express";
import { getMaterialTypeById, deleteMaterialType, getMaterialType, updateMaterialType, createMaterialType } from "~/controllers/materialType.controller";

const router = Router();

router
    .route("/")

    .get(getMaterialType)

    .post(createMaterialType)

router.route("/:id")

    .get(getMaterialTypeById)

    .delete(deleteMaterialType)

    .put(updateMaterialType);

export default router;





