import { NextFunction, Request, Response } from "express";
import { Building, BuildingDetail } from "~/models";
import catchAsync from "~/utils/catchAsync";

export const createBuilding = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const building = await Building.create(req.body);

        res.status(201).json({
            status: "createSuccess",
            data: {
                building
            }
        })
    }
)


export const getBuilding = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const building = await Building.find({});

        res.status(200).json({
            data: {
                building
            }
        })
    }
)

export const getBuildingById = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const _id = req.params.id;
        const building = await Building.findById(_id).exec();


        res.status(200).json({
            data: {
                building
            }
        })
    }
)

export const deleteBuildingById = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const _id = req.params.id;
        const building = await Building.findByIdAndDelete(_id);
        console.log(building);



        res.status(200).json({
            status: "deleteSuccess"
        })
    }
)

export const updateBuildingById = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const _id = req.params.id;
        const newData = req.body;
        const building = await Building.findByIdAndUpdate(_id, newData, { new: true});

        res.status(200).json({
            status:"Update Successfully",
            data:{
                building
            }
        })
    }
)

