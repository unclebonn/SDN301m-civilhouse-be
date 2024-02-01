import { NextFunction, Request, Response } from "express";
import { Material } from "~/models";
import catchAsync from "~/utils/catchAsync";
import mongoose from 'mongoose';


export const getMaterial = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const material = await Material.find({});

    res.status(200).json({
        data: {
            material
        }
    })
})

export const createMaterial = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body._id) {
        req.body._id = new mongoose.Types.ObjectId();
    }
    const material = await Material.create(req.body);
    res.status(201).json({
        status: "createSuccess",
        data: {
            material,
        },
    });
});




export const updateMaterial = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.id;
    const newData = req.body;
    const material = await Material.findByIdAndUpdate(_id, newData, { new: true});

    res.status(200).json({
        status:"Update Successfully",
        data:{
            material
        }
    })
});

export const deleteMaterial = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.id;
    const material = await Material.findByIdAndDelete(_id);
    console.log(material);



    res.status(200).json({
        status: "Delete Successfully"
    })
});

export const getMaterialById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.id;
    const material = await Material.findById(_id).exec();


    res.status(200).json({
        data: {
            material
        }
    })
});