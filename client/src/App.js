import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Error from './pages/Error';
import { authenticatedUser } from './utils/authenticatedUser.js';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const ProtectedRoute = (props) => {
  if (authenticatedUser().user) {
    return props.children;
  } else {
    return <Navigate to='/login' />;
  }
};

export default App;
