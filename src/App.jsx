
import { Routes, Route } from 'react-router-dom';
import SignInSide from './Components/SignInSide'; 
import AllProject from './Components/AllProject';
import DetailsProject from './Components/DetailsProject';
import AddProject from './Components/AddProject';
function App() {
  return (
    <Routes>
      <Route path="/" element={<SignInSide />} />
      <Route path="/AllProject" element={<AllProject />} />
      <Route path="/AddProject" element={<AddProject />} />
      <Route path="/DetailsProject" element={<DetailsProject />} />
      <Route path="/project/:id" element={<DetailsProject />} />
      
    
    </Routes>
  );
}

export default App;
