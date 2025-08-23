import { 
    BrowserRouter, 
    Route,
    Routes,
    useLocation
} from "react-router-dom";
import TopNav from './components/TopNav/TopNav';
import MediasPage from "./pages/MediasPage/MediasPage";
import HomePage from "./pages/HomePage/HomePage";
import OpinionsPage from "./pages/OpinionsPage/OpinionsPage";
import ArticleDetailsPage from "./pages/OpinionDetailsPage/OpinionDetailsPage";
import MediaDetailsPage from "./pages/MediaDetailsPage/MediaDetailsPage";
import FrequentLiesPage from "./pages/FrequentLiesPage/FrequentLiesPage";
import FrequentLieDetailsPage from "./pages/FrequentLieDetailsPage/FrequentLieDetailsPage";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import ReportPage from "./pages/ReportPage/ReportPage";
import Footer from "./components/Footer/Footer";
import { PrivateRoute } from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";
import ManageUsersPage from "./cms/ManageUsersPage/ManageUsersPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import AdministrationTemplate from "./cms/AdministrationTemplate/AdministrationTemplate";
import MessagesMailboxPage from "./cms/MessagesMailboxPage/MessagesMailboxPage";
import ReportsMailboxPage from "./cms/ReportsMailboxPage/ReportsMailboxPage";
import AddOpinionPage from "./cms/AddOpinionPage/AddOpinionPage";
import AddFrequentLiePage from "./cms/AddFrequentLiePage/AddFrequentLiePage";
import UpdateOpinionPage from "./cms/UpdateOpinionPage/UpdateOpinionPage";
import UpdateFrequentLiePage from "./cms/UpdateFrequentLiePage/UpdateFrequentLiePage";
import EditorsOpinionsListPage from "./cms/EditorsOpinionsListPage/EditorsOpinionsListPage";
import EditorFrequentLiesListPage from "./cms/EditorsFrequentLiesListPage/EditorsFrequentLiesListPage";
import EditorsMediasListPage from "./cms/EditorsMediasListPage/EditorsMediasListPage";
import AddMediaPage from "./cms/AddMediaPage/AddMediaPage";
import UpdateMediaPage from "./cms/UpdateMediaPage/UpdateMediaPage";
import AddFacebookPage from "./cms/AddFacebookPage/AddFacebookPage";
import EditorsFacebooksListPage from "./cms/EditorsFacebooksListPage/EditorsFacebooksListPage";
import UpdateFacebookPage from "./cms/UpdateFacebookPage/UpdateFacebookPage";
import DownloadPage from "./pages/DownloadPage/DownloadPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import { useEffect } from "react";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage/PrivacyPolicyPage";

function App() {
  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }

  return (
        <BrowserRouter>
          <ScrollToTop/>
          <TopNav/>
          <Routes>
              <Route path="/" element={<HomePage/>} /* Design idea: https://www.stayfocusd.com https://www.joinhoney.com https://nordvpn.com/ *//>
              <Route path="/download" element={<DownloadPage/>} /* Design idea: https://codepen.io/alexandro_lebrucho/pen/zxxOyYQ *//>
              <Route path="/lies" element={<FrequentLiesPage/>} />
              <Route path="/lies/:compoundId" element={<FrequentLieDetailsPage />} />
              <Route path="/opinions" element={<OpinionsPage/>} />
              <Route path="/opinions/:compoundId" element={<ArticleDetailsPage />} />
              <Route path="/medias" element={<MediasPage/>}></Route>
              <Route path="/medias/:compoundId" element={<MediaDetailsPage />} />
              <Route path="/about" element={<AboutPage/>}></Route>
              <Route path="/report" element={<ReportPage/>}></Route>
              <Route path="/policy" element={<PrivacyPolicyPage/>}></Route>
              <Route path="/login" element={<LoginPage/>}></Route>
              <Route element={<PrivateRoute/>}>
                <Route element={<AdministrationTemplate/>}>
                  <Route path="/dashboard" element={<h1>Dashboard</h1>} />
                  <Route path="/cms/facebooks" element={<EditorsFacebooksListPage/>} />
                  <Route path="/cms/add/facebooks" element={<AddFacebookPage/>} />
                  <Route path="/cms/edit/facebooks/:id" element={<UpdateFacebookPage/>} />
                  <Route path="/cms/opinions" element={<EditorsOpinionsListPage/>} />
                  <Route path="/cms/add/opinions" element={<AddOpinionPage/>} />
                  <Route path="/cms/edit/opinions/:id" element={<UpdateOpinionPage/>} />
                  <Route path="/cms/frequent-lies" element={<EditorFrequentLiesListPage/>} />
                  <Route path="/cms/add/frequent-lies" element={<AddFrequentLiePage/>} />
                  <Route path="/cms/edit/frequent-lies/:id" element={<UpdateFrequentLiePage/>} />
                  <Route path="/cms/medias" element={<EditorsMediasListPage/>} />
                  <Route path="/cms/add/medias" element={<AddMediaPage/>} />
                  <Route path="/cms/edit/medias/:id" element={<UpdateMediaPage/>} />
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
