import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle, VehicleDocument } from './schemas/vehicle.schema';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectModel(Vehicle.name)
    private readonly vehicleModel: Model<VehicleDocument>,
  ) {}

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const createdVehicle = new this.vehicleModel(createVehicleDto);
    return createdVehicle.save();
  }

  async findAll(): Promise<Vehicle[]> {
    return this.vehicleModel.find().exec();
  }

  async findOne(id: string): Promise<Vehicle> {
    const vehicle = await this.vehicleModel.findById(id).exec();
    if (!vehicle) {
      throw new NotFoundException(`Vehicle with id ${id} not found`);
    }
    return vehicle;
  }

  async update(
    id: string,
    updateVehicleDto: UpdateVehicleDto,
  ): Promise<Vehicle> {
    const updated = await this.vehicleModel
      .findByIdAndUpdate(id, updateVehicleDto, {
        new: true,
        runValidators: true,
      })
      .exec();
    if (!updated) {
      throw new NotFoundException(`Vehicle with id ${id} not found`);
    }
    return updated;
  }

  async remove(id: string): Promise<Vehicle> {
    const deleted = await this.vehicleModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Vehicle with id ${id} not found`);
    }
    return deleted;
  }
}
