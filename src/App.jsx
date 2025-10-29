import AppRoutes from "./component/AppRoutes";
import { VideoProvider } from "./context/VideoContext"; // Import VideoProvider
import { LiveProvider } from "./context/LiveContext";
import "./App.css";

function App() {
  return (
    <LiveProvider>
      <VideoProvider> {/* Wrap AppRoutes with VideoProvider */}
        <AppRoutes />
      </VideoProvider>
    </LiveProvider>
  );
}

export default App;