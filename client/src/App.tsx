import AppRoutes from './routes/appRoutes';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const App: React.FC = () => {

  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
      </QueryClientProvider>
    </>
  );
};

export default App;
