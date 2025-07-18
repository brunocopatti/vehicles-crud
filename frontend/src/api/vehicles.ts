import axios from 'axios';
import type { Vehicle, VehicleAddData } from '../types/vehicle';
import { apiUrl } from '../constants';

const api = axios.create({
  baseURL: apiUrl,
});

export const getVehicles = async (): Promise<Vehicle[]> => {
  const res = await api.get('/vehicles');
  return res.data;
};

export const addVehicle = async (
  vehicleData: VehicleAddData,
): Promise<Vehicle> => {
  const res = await api.post('/vehicles', vehicleData);
  return res.data;
};
