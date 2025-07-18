import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import VehicleCardList from './components/VehicleCardList';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100 p-6">
        <VehicleCardList />
      </div>
    </QueryClientProvider>
  );
}
