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
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import ReportPage from "./components/ReportPage/ReportPage";
import Footer from "./components/Footer/Footer";
import { PrivateRoute } from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";
import ManageUsersPage from "./components/ManageUsersPage/ManageUsersPage";
import LoginPage from "./components/LoginPage/LoginPage";
import AdministrationTemplate from "./components/AdministrationTemplate/AdministrationTemplate";
import MessagesMailboxPage from "./components/MessagesMailboxPage/MessagesMailboxPage";
import ReportsMailboxPage from "./components/ReportsMailboxPage/ReportsMailboxPage";

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
              <Route path="/report" element={<ReportPage/>}></Route>
              <Route path="/login" element={<LoginPage/>}></Route>
              <Route element={<PrivateRoute/>}>
                <Route element={<AdministrationTemplate/>}>
                  <Route path="/cms/dashboard" element={<h1>Dashboard</h1>} />
                  <Route path="/cms/opinions" element={<h1>Opinions</h1>} />
                  <Route path="/cms/add/opinions" element={<h1>Add opinion</h1>} />
                  <Route path="/cms/edit/opinions" element={<h1>Edit opinion</h1>} />
                  <Route path="/cms/frequent-lies" element={<h1>Frequent lies</h1>} />
                  <Route path="/cms/add/frequent-lies" element={<h1>Add frequent lie</h1>} />
                  <Route path="/cms/edit/frequent-lies" element={<h1>Edit frequent lie</h1>} />
                  <Route path="/cms/medias" element={<h1>Medias</h1>} />
                  <Route path="/cms/add/medias" element={<h1>Add media</h1>} />
                  <Route path="/cms/edit/medias" element={<h1>Edit media</h1>} />
                  <Route path="/cms/messages" element={<MessagesMailboxPage/>} />
                  <Route path="/cms/reports" element={<ReportsMailboxPage/>} />
                  <Route element={<AdminRoute />}>
                    <Route path="/editors" element={<ManageUsersPage />} />
                  </Route>
                </Route>
              </Route>
              <Route path='*' element={<NotFoundPage />} />
          </Routes>
          <Footer/>
        </BrowserRouter>
      
  );
}

export default App;
