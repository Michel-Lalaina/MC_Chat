import ArchitectureTree from "./components/ArchitectureTree";
import ChatPage from "./pages/ChatPage";

function App() {

  return (
<>
    <div className="p-6"> ICI ny point d ' entrer App <h1 className="text-green-700"> Groupe Michel et Carole </h1> 
    <ArchitectureTree/>
    </div>
    <div className="p-4">
      <ChatPage/>
    </div>
</>
  );
}

export default App;