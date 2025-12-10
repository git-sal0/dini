import './App.css';
import { Route,Routes,useLocation} from 'react-router-dom';
import Acceuil from './Acceuil';
import Navbar from './navbar';
import LogIn from './Login';
import SignIn from './Signin';
import AjouterTrajet from './AjouterTrajet';
import SearchResults from './SearchResults';
import PaymentPage from './PaymentPage2';
import DriverProfile2 from './DriverProfile2';
import { LanguageProvider } from './LanguageContext';
import Details from './details';



function App() {
  const location = useLocation();

  // Pages where navbar should have a background
  const pagesWithBg = ["/Login", "/Signin", "/AjouterTrajet"];

  const showBg = pagesWithBg.includes(location.pathname);

  return (
    <LanguageProvider>
      <div>
        <Navbar background={showBg} />

        <Routes>
          <Route path='/' element={<Acceuil/>} />
          <Route path='/Acceuil' element={<Acceuil/>} />
          <Route path='/Login' element={<LogIn/>} />
          <Route path='/Signin' element={<SignIn/>} />
          <Route path='/AjouterTrajet' element={<AjouterTrajet/>} />
          <Route path='/SearchResults' element={<SearchResults/>} />
          <Route path='/PaymentPage2' element={<PaymentPage/>} />
          <Route path='/DriverProfile2' element={<DriverProfile2/>} />
          <Route path='/details' element={<Details/>} />
        </Routes>
      </div>
    </LanguageProvider>
  );
}

export default App;
