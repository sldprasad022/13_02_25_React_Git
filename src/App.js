import './App.css';
import BrandingSignInPage from './component/SignIn';
import Todo from './component/Todo';
import DashboardLayoutBranding from './layouts/Header';

function App() {
  return (
    <div className="App">
      <DashboardLayoutBranding />
      <BrandingSignInPage />
      <Todo />
    </div>
  );
}

export default App;
