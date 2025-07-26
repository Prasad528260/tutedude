import "./App.css";
import BottomNav from "./components/Orders/BottomNav";
import Orders from "./components/Orders/Orders";

function App() {
  return (
    <div className="app-container">
      <Orders />
      <BottomNav />
    </div>
  );
}

export default App;
