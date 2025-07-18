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

export const deleteVehicle = async (id: string): Promise<Vehicle> => {
  const res = await api.delete(`/vehicles/${id}`);
  return res.data;
};

export const updateVehicle = async (
  id: string,
  vehicleData: Partial<Vehicle>,
): Promise<Vehicle> => {
  const res = await api.patch(`/vehicles/${id}`, vehicleData);
  return res.data;
};

export const uploadVehiclePicture = async (
  id: string,
  file: File,
): Promise<Vehicle> => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await api.post(`/vehicles/${id}/picture`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data;
};
