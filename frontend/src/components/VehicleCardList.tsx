import { useQuery } from '@tanstack/react-query';
import type { Vehicle } from '../types/vehicle';
import { getVehicles } from '../api/vehicles';
import VehicleCard from './VehicleCard';

function VehicleCardList() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['vehicles'],
    queryFn: getVehicles,
  });

  const vehicles: Vehicle[] = data || [];

  if (isLoading) {
    return <p>Carregando veículos...</p>;
  }

  if (isError) {
    return (
      <p className="text-red-400">Erro ao carregar veículos: {error.message}</p>
    );
  }

  return (
    <div className="flex gap-4">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle._id} vehicle={vehicle} />
      ))}
    </div>
  );
}

export default VehicleCardList;
