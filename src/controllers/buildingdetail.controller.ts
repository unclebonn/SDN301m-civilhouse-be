import { Request, Response, NextFunction } from 'express';
import { BuildingDetail } from '~/models';
import catchAsync from '~/utils/catchAsync';

export const getBuildingDetail = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const building = await BuildingDetail.find({});

    res.status(200).json({
        data: {
            building
        }
    })
})

export const getBuildingDetailById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.id;
    const building = await BuildingDetail.findById(_id).exec();

    res.status(200).json({
        data: {
            building
        }
    })
}) 

export const createBuildingDetail = catchAsync(async (req: Request, res: Response, next: NextFunction) => { 
    const building = await BuildingDetail.create(req.body);

    res.status(201).json({
        status: "createSuccess",
        data: {
            building
        }
    })
})

export const deleteBuildingDetailById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.id;
    const building = await BuildingDetail.findByIdAndDelete(_id);
    console.log(building);

    res.status(200).json({
        status: "deleteSuccess"
    })
})

export const updateBuildingDetailById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.id;
    const newData = req.body;
    const building = await BuildingDetail.findByIdAndUpdate(_id, newData, { new: true });
    res.status(200).json({
        status: "updateSuccess",
        data: {
            building
        }
    })
})