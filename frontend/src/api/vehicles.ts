import axios from 'axios';
import type { Vehicle } from '../types/vehicle';
import { apiUrl } from '../constants';

const api = axios.create({
  baseURL: apiUrl,
});

export const getVehicles = async (): Promise<Vehicle[]> => {
  const res = await api.get('/vehicles');
  return res.data;
};
