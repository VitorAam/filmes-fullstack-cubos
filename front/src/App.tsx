import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import MovieListPage from './pages/MovieList';
import MovieDetailsPage from './pages/MovieDetails';
import { AuthContext } from './context/AuthContext';
import { Layout } from './components/Layout';
import { useContext } from 'react';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isLogged } = useContext(AuthContext);
  return isLogged ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />} >
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<RegisterPage />} />
          <Route
            path="/filmes"
            element={
              <PrivateRoute>
                <MovieListPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/filmes/:id"
            element={
              <PrivateRoute>
                <MovieDetailsPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
