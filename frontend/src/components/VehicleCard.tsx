import { apiUrl } from '../constants';
import defaultPicture from '../assets/default-vehicle.webp';
import type { Vehicle } from '../types/vehicle';

function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const pictureUrl = vehicle.pictureUrl
    ? `${apiUrl}${vehicle.pictureUrl}`
    : defaultPicture;

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
    </div>
  );
}

export default VehicleCard;
