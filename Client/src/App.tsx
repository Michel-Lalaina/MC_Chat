// import ArchitectureTree from "./components/ArchitectureTree";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";

function App() {

  return (
<>
    <div className="p-6 ">
      <h1 className="text-green-700"> Groupe Michel et Carole </h1> 
    {/* <ArchitectureTree/> */}
    <div className="flex">
    <LoginPage/>
    <ChatPage/>
    </div>
    </div>

</>
  );
}

export default App;