import AppRoutes from "./routes/AppRoutes";
import AIAssistant from "./components/ai-assisstant/AIAssistant";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
        <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "12px",
            padding: "14px 18px",
            fontSize: "14px",
          },
        }}
      />
      <AppRoutes />
      <AIAssistant />
    </>
  );
}

export default App;