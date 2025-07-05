import { 
    BrowserRouter, 
    Route,
    Routes
} from "react-router-dom";

import MediasList from "./components/MediasList/MediasList";

function App() {
  return (
      <BrowserRouter>
        {/* <TopNav/> */}
        <Routes>
            <Route path="/" element={<h1>Начало</h1>} />
            <Route path="/download" element={<h1>Изтегли</h1>} />
            <Route path="/frequent" element={<h1>Често срещани лъжи</h1>} />
            <Route path="/opinions" element={<h1>Мнения</h1>} />
            <Route path="/medias" element={<MediasList/>}></Route>
            <Route path="/about" element={<h1>За нас</h1>}></Route>
            {/* <Route path="/medias/{media-name}" element={<h1>Детайли за медия</h1>}></Route> */}
        </Routes>
      </BrowserRouter>
  );
}

export default App;
