import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiUrl } from '../constants';
import defaultPicture from '../assets/default-vehicle.webp';
import type { Vehicle } from '../types/vehicle';
import { deleteVehicle } from '../api/vehicles';

function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const pictureUrl = vehicle.pictureUrl
    ? `${apiUrl}${vehicle.pictureUrl}`
    : defaultPicture;

  const queryClient = useQueryClient();

  const deleteVehicleMutation = useMutation({
    mutationFn: async (id: string) => {
      await deleteVehicle(id);
      return id;
    },
    onSuccess: (deletedId) => {
      // Atualiza o cache removendo o veículo deletado
      queryClient.setQueryData<Vehicle[]>(
        ['vehicles'],
        (old) => old?.filter((v) => v._id !== deletedId) ?? [],
      );
    },
  });

  const handleDelete = () => {
    if (confirm(`Deseja realmente deletar ${vehicle.licensePlate}?`)) {
      deleteVehicleMutation.mutate(vehicle._id);
    }
  };

  return (
    <div className="max-w-md bg-white shadow-lg rounded-2xl p-4 mt-4">
      <img
        src={pictureUrl}
        alt={`${vehicle.brand} ${vehicle.model}`}
        className="w-full h-60 object-cover rounded-xl mb-4"
      />
      <h2 className="text-xl font-semibold">
        {vehicle.brand} {vehicle.model}
      </h2>
      <p className="text-gray-600">
        Placa: <strong>{vehicle.licensePlate}</strong>
      </p>
      <p className="text-gray-600">Ano: {vehicle.year}</p>
      <p className="text-gray-400 text-sm mt-2">
        Criado em: {new Date(vehicle.createdAt).toLocaleString()}
      </p>
      <p className="text-gray-400 text-sm">
        Atualizado em: {new Date(vehicle.updatedAt).toLocaleString()}
      </p>

      <button
        onClick={handleDelete}
        className="mt-4 text-sm text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
        disabled={deleteVehicleMutation.isPending}
      >
        {deleteVehicleMutation.isPending ? 'Deletando...' : 'Deletar'}
      </button>
    </div>
  );
}

export default VehicleCard;
