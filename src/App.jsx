import AppRoutes from "./component/AppRoutes";
import { VideoProvider } from "./context/VideoContext"; // Import VideoProvider
import "./App.css";

function App() {
  return (
    <VideoProvider> {/* Wrap AppRoutes with VideoProvider */}
      <AppRoutes />
    </VideoProvider>
  );
}

export default App;