import { Types } from "mongoose";
import { AvailabilityStatus, IVehicle } from "../user/user.interface";

// Driver interface definition (focused on driver management only)
export interface IDriver {
  userId: Types.ObjectId;
  licenseNumber: string;
  vehicleInfo: IVehicle;
  completedRides?: Types.ObjectId[];
  availability?: AvailabilityStatus;
}
