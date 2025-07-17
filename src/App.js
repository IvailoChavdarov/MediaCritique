import { 
    BrowserRouter, 
    Route,
    Routes
} from "react-router-dom";
import TopNav from './components/TopNav/TopNav';
import MediasPage from "./components/MediasPage/MediasPage";
import HomePage from "./components/HomePage/HomePage";
import OpinionsPage from "./components/OpinionsPage/OpinionsPage";
import ArticleDetailsPage from "./components/OpinionDetailsPage/OpinionDetailsPage";
import MediaDetailsPage from "./components/MediaDetailsPage/MediaDetailsPage";
import FrequentLiesPage from "./components/FrequentLiesPage/FrequentLiesPage";
import FrequentLieDetailsPage from "./components/FrequentLieDetailsPage/FrequentLieDetailsPage";

function App() {
  return (
      <BrowserRouter>
        <TopNav/>
        <Routes>
            <Route path="/" element={<HomePage/>} /* Design idea: https://www.stayfocusd.com https://www.joinhoney.com https://nordvpn.com/ *//>
            <Route path="/download" element={<h1 className="text-center">Изтегли</h1>} /* Design idea: https://codepen.io/alexandro_lebrucho/pen/zxxOyYQ *//>
            <Route path="/lies" element={<FrequentLiesPage/>} />
            <Route path="/lies/:compoundId" element={<FrequentLieDetailsPage />} />
            <Route path="/opinions" element={<OpinionsPage/>} />
            <Route path="/opinions/:compoundId" element={<ArticleDetailsPage />} />
            <Route path="/medias" element={<MediasPage/>}></Route>
            <Route path="/medias/:compoundId" element={<MediaDetailsPage />} />
            <Route path="/about" element={<h1>За нас</h1>}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
