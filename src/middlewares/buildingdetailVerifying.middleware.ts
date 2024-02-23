import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { isMongoId } from "validator";
import { Building, BuildingDetail, Item } from "~/models";
import AppError from "~/utils/appError";

export const validateBuildingDetail = [
    body('buildingID')
        .notEmpty()
        .withMessage('Building ID must be a non-empty string')
        .bail()
        .isMongoId()
        .withMessage('Invalid Building ID')
        .bail()
        .custom(async (_value, { req }) => {
            const buildingExists = await Building.exists({
                _id: req.body.buildingID
            });
            if (!buildingExists) {
                throw new Error('Building does not exist');
            }
            return true;
        }),
    body('itemID')
        .notEmpty()
        .withMessage('Item ID must be a non-empty string')
        .bail()
        .isMongoId()
        .withMessage('Invalid Item ID')
        .bail()
        .custom(async (_value, { req }) => {
            const itemExists = await Item.exists({
                _id: req.body.itemID
            });
            if (!itemExists) {
                throw new Error('Item does not exist');
            }
            return true;
        })
];

export const validateBuildingDetailUpdate = [
    body('buildingID')
        .optional()
        .isMongoId()
        .withMessage('Invalid Building ID')
        .bail()
        .custom(async (_value, { req }) => {
            const buildingExists = await Building.exists({
                _id: req.body.buildingID
            });
            if (!buildingExists) {
                throw new Error('Building does not exist');
            }
            return true;
        }),
    body('itemID')
        .optional()
        .isMongoId()
        .withMessage('Invalid Item ID')
        .bail()
        .custom(async (_value, { req }) => {
            const itemExists = await Item.exists({
                _id: req.body.itemID
            });
            if (!itemExists) {
                throw new Error('Item does not exist');
            }
            return true;
        })
];

export const checkIDifExisted = async(req: Request, res: Response, next: NextFunction) => {
    let ID = req.params.id;
    if(!isMongoId(ID)) {
        return next(new AppError("Invalid ID", 400));
    }
    let buildingDetail = await BuildingDetail.findById(ID);
    if(!buildingDetail) {
        return next(new AppError("Building Detail not found", 404));
    }
    next();
}

export const verifyBuildingDetail = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg).join(', ');
        return next(new AppError(errorMessages, 400));
    }
    next();
}