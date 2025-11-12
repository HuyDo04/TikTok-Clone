import AppRoutes from "./component/AppRoutes";
import { VideoProvider } from "./context/VideoContext"; // Import VideoProvider
import { LiveProvider } from "./context/LiveContext";
import routes from "./routes/index.jsx"; // Import file routes chính xác
import "./App.css";

function App() {
  return (
    <LiveProvider>
      <VideoProvider> {/* Wrap AppRoutes with VideoProvider */}
        <AppRoutes routes={routes} />
      </VideoProvider>
    </LiveProvider>
  );
}

export default App;