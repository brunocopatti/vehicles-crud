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

export type { Vehicle, VehicleAddData };
