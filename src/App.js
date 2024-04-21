import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppointmentTable from './components/AppointmentTable';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <Nav />
      <main className="container">
        <Routes>
          <Route path="/appointments" element={<AppointmentTable />} />
          <Route path="/search" element={<SearchForm />} />
          {/* <Route path="/create" element={<CreateForm />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
