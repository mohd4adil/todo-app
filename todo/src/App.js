import './App.css';
// import LoginButton from './components/LoginButton';
import LoginPage from './pages/LoginPage';
import TodoHome from './pages/TodoHome'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoutes';
import SignUpPage from './pages/SignUpPage';


function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
    <div className="App">
      <Routes>
          <Route path='/login' element = {<LoginPage/>} />
          <Route path='/signup' element = {<SignUpPage/>} />
          <Route path = '/' element = {
            <ProtectedRoute>
            <TodoHome/>
            </ProtectedRoute>
            } />
      </Routes>
    </div>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
