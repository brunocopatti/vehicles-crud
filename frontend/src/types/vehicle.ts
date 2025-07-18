type Vehicle = {
  _id: string;
  __v: number;
  brand: string;
  model: string;
  licensePlate: string;
  year: number;
  pictureUrl?: string;
  createdAt: string;
  updatedAt: string;
};

type VehicleAddData = Omit<
  Vehicle,
  '_id' | 'createdAt' | 'updatedAt' | '__v' | 'pictureUrl'
>;

type VehicleUpdateData = Partial<
  Omit<Vehicle, '_id' | 'createdAt' | 'updatedAt' | '__v'>
>;

export type { Vehicle, VehicleAddData, VehicleUpdateData };
