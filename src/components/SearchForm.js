import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAppointments from '../hooks/useAppointments';

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

    function handleChange(evt) {

        setSearchCriteria(previous => {
            const next = { ...previous };
            next[evt.target.name] = evt.target.value;
            return next;
        });

    }

    function handleSubmit(evt) {
        evt.preventDefault();
 
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(search)
        }

        fetch("http://localhost:8080/api/v1/appointment/search", config)
            .then(response => {
                if (response.ok) {
                    navigate("/appointments");
                } else {
                    return response.json();
                }
            })
            .then(errs => {
                if (errs) {
                    return Promise.reject(errs);
                }
            })
            .catch(errs => {
                if (errs.length) {
                    setErrors(errs);
                } else {
                    setErrors([errs]);
                }
            });
        
    }

    return (
        <>
            <h1 className="display-6">Create an Appointment</h1>
            {errors && errors.length > 0 && <div className="alert alert-danger">
                <ul className="mb-0">
                    {errors.map(err => <li key={err}>{err}</li>)}
                </ul>
            </div>}
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col">
                        <label className="form-label" htmlFor="patientFirstName">Patient First Name</label>
                        <input id="patientFirstName" name="patientFirstName" type="text" className="form-control" required
                            onChange={handleChange} value={search.patientFirstName} />
                    </div>
                    <div className="col">
                        <label className="form-label" htmlFor="patientLastName">Patient Last Name</label>
                        <input id="patientLastName" name="patientLastName" type="text" className="form-control"
                            onChange={handleChange} value={search.patientLastName} />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="providerFirstName">Provider First Name</label>
                    <input id="providerFirstName" name="providerFirstName" type="text" className="form-control" required
                        onChange={handleChange} value={search.providerFirstName} />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="providerLastName">Provider Last Name</label>
                    <input id="providerLastName" name="providerLastName" type="text" className="form-control" required
                        onChange={handleChange} value={search.providerLastName} />
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <label className="form-label" htmlFor="ascending">Ascending</label>
                        <input id="ascending" name="ascending" type="form-check-input" className="form-control"
                            onChange={handleChange} value={search.ascending} />
                    </div>
                    <div className="col">
                        <label className="form-label" htmlFor="afterDate">After Date</label>
                        <input id="afterDate" name="afterDate" type="date" className="form-control" required
                            onChange={handleChange} value={search.afterDate} />
                    </div>
                    <div className="col">
                        <label className="form-label" htmlFor="beforeDate">Before Date</label>
                        <input id="beforeDate" name="beforeDate" type="date" className="form-control" required
                            onChange={handleChange} value={search.beforeDate} />
                    </div>
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-info me-2">Search</button>
                    <Link className="btn btn-warning" to="/appointments">Cancel</Link>
                </div>
            </form>
        </>
    );
}

export default SearchForm;