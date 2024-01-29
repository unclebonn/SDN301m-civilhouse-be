import { NextFunction, Request, Response } from "express";
import { MaterialType } from "~/models";
import catchAsync from "~/utils/catchAsync";
import mongoose from 'mongoose';



export const getMaterialType = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const materialType = await MaterialType.find({});

    res.status(200).json({
        data: {
            materialType
        }
    })
})

export const createMaterialType = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Kiểm tra nếu không có _id, thì tạo mới
    if (!req.body._id) {
        req.body._id = new mongoose.Types.ObjectId();
    }
    const material = await MaterialType.create(req.body);
    res.status(201).json({
        status: "createSuccess",
        data: {
            material,
        },
    });
});




export const updateMaterialType = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.id;
    const newData = req.body;
    const materialType = await MaterialType.findByIdAndUpdate(_id, newData, { new: true});

    res.status(200).json({
        status:"Update Successfully",
        data:{
            materialType
        }
    })
});

export const deleteMaterialType = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const _id = req.params.id;
        const materialType = await MaterialType.findByIdAndDelete(_id);
        console.log(materialType);



        res.status(200).json({
            status: "Delete Successfully"
        })
    });

export const getMaterialTypeById = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const _id = req.params.id;
        const materialType = await MaterialType.findById(_id).exec();


        res.status(200).json({
            data: {
                materialType
            }
        })
    });