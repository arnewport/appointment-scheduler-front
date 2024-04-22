import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppointmentProvider } from './context/AppointmentContext';
import AppointmentTable from './components/AppointmentTable';
import Nav from './components/Nav';
import NotFound from './components/NotFound';
import CreateForm from './components/CreateForm';
import SearchForm from './components/SearchForm';

function App() {
  return (
    <Router>
      <AppointmentProvider>
        <Nav />
        <main className="container">
          <Routes>          
              <Route path="/" element={<AppointmentTable />} />
              <Route path="/searching" element={<SearchForm />} />
              <Route path="/create" element={<CreateForm />} />
              <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </AppointmentProvider>
    </Router>
  );
}

export default App;
