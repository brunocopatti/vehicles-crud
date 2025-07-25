import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateVehicle, uploadVehiclePicture } from '../api/vehicles';
import type { Vehicle } from '../types/vehicle';

const vehicleSchema = z.object({
  licensePlate: z.string().min(1, 'Placa obrigatória'),
  brand: z.string().min(1, 'Marca obrigatória'),
  model: z.string().min(1, 'Modelo obrigatório'),
  year: z
    .number({ error: 'Ano inválido' })
    .min(1900)
    .max(new Date().getFullYear() + 1),
  picture: z
    .any()
    .transform((files: FileList) => files?.[0])
    .refine((file) => !file || file instanceof File, {
      message: 'Arquivo inválido',
    })
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
      message: 'A imagem deve ter no máximo 5MB',
    })
    .optional(),
});

type VehicleFormData = z.infer<typeof vehicleSchema>;

type Props = {
  vehicle: Vehicle;
  onClose: () => void;
};

export default function VehicleEditModal({ vehicle, onClose }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      licensePlate: vehicle.licensePlate,
      brand: vehicle.brand,
      model: vehicle.model,
      year: vehicle.year,
    },
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (formData: VehicleFormData) => {
      const picture = formData.picture;
      const dataWithoutPicture = {
        licensePlate: formData.licensePlate,
        brand: formData.brand,
        model: formData.model,
        year: formData.year,
      };

      await updateVehicle(vehicle._id, dataWithoutPicture);

      if (picture) {
        await uploadVehiclePicture(vehicle._id, picture);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      onClose();
    },
  });

  const onSubmit = (data: VehicleFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="fixed inset-0 bg-black/25 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          Editando {vehicle.licensePlate}
        </h2>
        <form
          onSubmit={handleSubmit((data) => {
            onSubmit(data);
            onClose();
          })}
          className="space-y-4"
        >
          <div>
            <input
              type="text"
              placeholder="Placa"
              {...register('licensePlate')}
              className="w-full border p-2 rounded"
            />
            {errors.licensePlate && (
              <p className="text-red-500 text-sm">
                {errors.licensePlate.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Marca"
              {...register('brand')}
              className="w-full border p-2 rounded"
            />
            {errors.brand && (
              <p className="text-red-500 text-sm">{errors.brand.message}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Modelo"
              {...register('model')}
              className="w-full border p-2 rounded"
            />
            {errors.model && (
              <p className="text-red-500 text-sm">{errors.model.message}</p>
            )}
          </div>

          <div>
            <input
              type="number"
              placeholder="Ano"
              {...register('year', { valueAsNumber: true })}
              className="w-full border p-2 rounded"
            />
            {errors.year && (
              <p className="text-red-500 text-sm">{errors.year.message}</p>
            )}
          </div>

          <div>
            <input
              type="file"
              accept="image/*"
              {...register('picture')}
              className="w-full border p-2 rounded"
            />
            {errors.picture && (
              <p className="text-red-500 text-sm">{errors.picture.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Editar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
