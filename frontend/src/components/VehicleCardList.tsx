import { useQuery } from '@tanstack/react-query';
import type { Vehicle } from '../types/vehicle';
import { getVehicles } from '../api/vehicles';
import VehicleCard from './VehicleCard';
import VehicleAddModal from './VehicleAddModal';
import { useState } from 'react';

function VehicleCardList() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['vehicles'],
    queryFn: getVehicles,
  });

  const vehicles: Vehicle[] = data || [];
  const [showModal, setShowModal] = useState(false);

  if (isLoading) {
    return <p>Carregando veículos...</p>;
  }

  if (isError) {
    return (
      <p className="text-red-400">Erro ao carregar veículos: {error.message}</p>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Lista de Veículos</h2>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          + Adicionar
        </button>
      </div>

      <div className="flex gap-4">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle._id} vehicle={vehicle} />
        ))}
      </div>

      {showModal && <VehicleAddModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default VehicleCardList;
