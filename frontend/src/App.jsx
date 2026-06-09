import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import AddCustomer from './pages/AddCustomer';
import BookHotel from './pages/BookHotel';
import BookPackage from './pages/BookPackage';
import CheckPackage from './pages/CheckPackage';
import DeleteCustomer from './pages/DeleteCustomer';
import Destinations from './pages/Destinations';
import CheckHotels from './pages/CheckHotels';
import ForgotPassword from './pages/ForgotPassword';
import Loading from './pages/Loading';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UpdateCustomer from './pages/UpdateCustomer';
import ViewBookedHotel from './pages/ViewBookedHotel';
import ViewCustomer from './pages/ViewCustomer';
import ViewPackage from './pages/ViewPackage';
import Payments from './pages/Payments';
import PaytmPortal from './pages/PaytmPortal';
import About from './pages/About';
import Splash from './pages/Splash';

function App() {
  // Application starts on the animated Splash screen
  const [view, setView] = useState('splash');
  
  // State handles the logged-in session user globally
  const [sessionUser, setSessionUser] = useState(''); 

  // Central Router Module
  const renderContentView = () => {
    switch (view) {
      case 'addCustomer':
        return <AddCustomer username={sessionUser} onBack={() => setView('home')} />;
      case 'updateCustomer':
        return <UpdateCustomer username={sessionUser} onBack={() => setView('home')} />;
      case 'viewCustomer':
        return <ViewCustomer username={sessionUser} onBack={() => setView('home')} />;
      case 'deleteCustomer':
        return <DeleteCustomer username={sessionUser} setView={setView} />;
      case 'checkPackage':
        return <CheckPackage onBack={() => setView('home')} />;
      case 'bookPackage':
        return <BookPackage username={sessionUser} onBack={() => setView('home')} />;
      case 'viewPackage':
        return <ViewPackage username={sessionUser} onBack={() => setView('home')} />;
      case 'checkHotels':
        return <CheckHotels onBack={() => setView('home')} />;
      case 'destinations':
        return <Destinations onBack={() => setView('home')} />;
      case 'bookHotel':
        return <BookHotel username={sessionUser} onBack={() => setView('home')} />;
      case 'viewBookedHotels':
        return <ViewBookedHotel username={sessionUser} onBack={() => setView('home')} />;
      case 'payments':
        return <Payments onBack={() => setView('home')} setView={setView} />;
      case 'paytmPortal':
        return <PaytmPortal onBack={() => setView('payments')} />;
      case 'forgotPassword':
        return <ForgotPassword setView={setView} />;
      case 'about':
        return <About onBack={() => setView('home')} />;
      default:
        return null;
    }
  };

  // 1. Startup Splash Screen Gate Channel
  if (view === 'splash') {
    return <Splash onSplashComplete={() => setView('login')} />;
  }

  // 2. Credentials Verification Gate Channels
  if (view === 'login') {
    return <Login setView={setView} setSessionUser={setSessionUser} />;
  }
  if (view === 'signup') {
    return <Signup setView={setView} />;
  }
  if (view === 'forgotPassword') {
    return <ForgotPassword setView={setView} />;
  }

  // 2. Progress Bar Splash Sequence
  if (view === 'loading') {
    return <Loading username={sessionUser} onLoadingComplete={() => setView('home')} />;
  }

  // 3. Main Dashboard layout housing the sidebar navigation and viewports
  return (
    <Dashboard username={sessionUser} currentView={view} setView={setView}>
      {view !== 'home' && (
        <div className="animate-fade-in" style={{ height: '100%' }}>
          {renderContentView()}
        </div>
      )}
    </Dashboard>
  );
}

export default App;