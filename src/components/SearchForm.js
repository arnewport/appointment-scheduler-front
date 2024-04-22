import{ useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppointmentContext } from '../context/AppointmentContext';

const INITIAL_SEARCH = {
    patientFirstName: "",
    patientLastName: "",
    providerFirstName: "",
    providerLastName: "",
    ascending: true,
    afterDate: "",
    beforeDate: ""
}

function SearchForm() {

    const [searchCriteria, setSearchCriteria] = useState(INITIAL_SEARCH);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const { fetchAppointments } = useAppointmentContext();


    function handleChange(evt) {

        setSearchCriteria(previous => {
            const next = { ...previous };
            next[evt.target.name] = evt.target.value;
            return next;
        });

    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            await fetchAppointments(searchCriteria);
            navigate("/");
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    }


    return (
        <>
            <h1 className="display-6">Create an Appointment</h1>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col">
                        <label className="form-label" htmlFor="patientFirstName">Patient First Name</label>
                        <input id="patientFirstName" name="patientFirstName" type="text" className="form-control"
                            onChange={handleChange} value={searchCriteria.patientFirstName} />
                    </div>
                    <div className="col">
                        <label className="form-label" htmlFor="patientLastName">Patient Last Name</label>
                        <input id="patientLastName" name="patientLastName" type="text" className="form-control"
                            onChange={handleChange} value={searchCriteria.patientLastName} />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="providerFirstName">Provider First Name</label>
                    <input id="providerFirstName" name="providerFirstName" type="text" className="form-control"
                        onChange={handleChange} value={searchCriteria.providerFirstName} />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="providerLastName">Provider Last Name</label>
                    <input id="providerLastName" name="providerLastName" type="text" className="form-control"
                        onChange={handleChange} value={searchCriteria.providerLastName} />
                </div>
                <div className="row mb-3">
                <div className="col">
                    <div className="form-check">
                            <input 
                                id="ascending" 
                                name="ascending" 
                                type="checkbox"
                                className="form-check-input" 
                                onChange={handleChange} 
                                checked={searchCriteria.ascending}
                            />
                            <label className="form-check-label" htmlFor="ascending">Ascending</label>
                        </div>
                    </div>
                    <div className="col">
                        <label className="form-label" htmlFor="afterDate">After Date</label>
                        <input id="afterDate" name="afterDate" type="date" className="form-control"
                            onChange={handleChange} value={searchCriteria.afterDate} />
                    </div>
                    <div className="col">
                        <label className="form-label" htmlFor="beforeDate">Before Date</label>
                        <input id="beforeDate" name="beforeDate" type="date" className="form-control"
                            onChange={handleChange} value={searchCriteria.beforeDate} />
                    </div>
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-info me-2">Search</button>
                    <Link className="btn btn-warning" to="/">Cancel</Link>
                </div>
            </form>
        </>
    );
}

export default SearchForm;