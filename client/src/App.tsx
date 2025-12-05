import UserContextProvider from './context/UserContext';
import AppRoutes from './routes/appRoutes';

const App: React.FC = () => {

  return (
    <UserContextProvider>
      <AppRoutes />
    </UserContextProvider>
  );
};

export default App;
