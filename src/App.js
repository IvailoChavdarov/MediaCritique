import { 
    BrowserRouter, 
    Route,
    Routes
} from "react-router-dom";
import TopNav from './components/TopNav/TopNav';

import MediasPage from "./components/MediasPage/MediasPage";
import HomePage from "./components/HomePage/HomePage";
import OpinionsPage from "./components/OpinionsPage/OpinionsPage";
import ArticleDetailsPage from "./components/ArticleDetailsPage/ArticleDetailsPage";

function App() {
  return (
      <BrowserRouter>
        <TopNav/>
        <Routes>
            <Route path="/" element={<HomePage/>} /* Design idea: https://www.stayfocusd.com https://www.joinhoney.com https://nordvpn.com/ *//>
            <Route path="/download" element={<h1 className="text-center">Изтегли</h1>} /* Design idea: https://codepen.io/alexandro_lebrucho/pen/zxxOyYQ *//>
            <Route path="/frequent" element={<h1>Често срещани лъжи</h1>} />
            <Route path="/opinions" element={<OpinionsPage/>} />
            <Route path="/opinions/:compoundId" element={<ArticleDetailsPage />} />
            <Route path="/medias" element={<MediasPage/>}></Route>
            <Route path="/about" element={<h1>За нас</h1>}></Route>
            {/* <Route path="/medias/{media-name}" element={<h1>Детайли за медия</h1>}></Route> */}
        </Routes>
      </BrowserRouter>
  );
}

export default App;
