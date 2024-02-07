import { NextFunction, Response, Request } from 'express';
import { RequestContract } from '~/models';
import catchAsync from '~/utils/catchAsync';

class ContractController {
  public getAllContract = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const contract = await RequestContract.find();

      res.status(200).json({
        status: 'success',
        data: {
          contract
        }
      });
    }
  );

  public createContract = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const contract = await RequestContract.create(req.body);

      res.status(201).json({
        status: 'success',
        data: {
          contract
        }
      });
    }
  );

  public updateContractbyId = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const _id = req.params.id;
      const newData = req.body;
      const contract = await RequestContract.findByIdAndUpdate(_id, newData, {
        new: true
      });

      res.status(200).json({
        status: 'success',
        data: {
          contract
        }
      });
    }
  );
  public deleteContractbyId = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const _id = req.params.id;

      const contract = await RequestContract.findByIdAndDelete(_id);

      res.status(200).json({
        status: 'success'
      });
    }
  );
  public getContractById = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const _id = req.params.id;

      const contract = await RequestContract.findById(_id);

      res.status(200).json({
        status: 'success',
        data: {
          contract
        }
      });
    }
  );

  public getContractByUserId = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const userID = req.params.userID;

      const contract = await RequestContract.find({ userID });
      console.log(contract);
      res.status(200).json({
        status: 'success',
        data: {
          contract
        }
      });
    }
  );
  public getContractByBuildingId = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const buildingID = req.params.buildingID;
      console.log(buildingID);
      const contract = await RequestContract.find({ buildingID });
      console.log(contract);
      res.status(200).json({
        status: 'success',
        data: {
          contract
        }
      });
    }
  );
}

export default new ContractController();
