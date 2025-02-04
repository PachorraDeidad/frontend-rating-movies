import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from './context/AuthContext';
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <div className="mt-20 w-full min-h-[calc(100vh-80px)] bg-[#141517]">
        <AppRoutes />
      </div>
    </AuthProvider>
  );
}

export default App;
