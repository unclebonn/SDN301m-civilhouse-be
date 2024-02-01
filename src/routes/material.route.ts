import { Router } from "express";
import { getMaterialById, deleteMaterial, getMaterial, updateMaterial, createMaterial } from "~/controllers/material.controller";

const router = Router();

router
    .route("/")

    .get(getMaterial)

    .post(createMaterial)

router.route("/:id")

    .get(getMaterialById)

    .delete(deleteMaterial)

    .put(updateMaterial);

export default router;





