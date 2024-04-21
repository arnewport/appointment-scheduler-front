import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const INITIAL_APPOINTMENT = {
    patientFirstName: "",
    patientLastName: "",
    providerFirstName: "",
    providerLastName: "",
    date: "",
    startTime: "",
    endTime: ""
}

function CreateForm() {

    const [appointment, setAppointment] = useState(INITIAL_APPOINTMENT);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    function handleChange(evt) {

        setAppointment(previous => {
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
            body: JSON.stringify(appointment)
        }

        fetch("http://localhost:8080/api/v1/appointment/create", config)
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
                            onChange={handleChange} value={appointment.patientFirstName} />
                    </div>
                    <div className="col">
                        <label className="form-label" htmlFor="patientLastName">Patient Last Name</label>
                        <input id="patientLastName" name="patientLastName" type="text" className="form-control"
                            onChange={handleChange} value={appointment.patientLastName} />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="providerFirstName">Provider First Name</label>
                    <input id="providerFirstName" name="providerFirstName" type="text" className="form-control" required
                        onChange={handleChange} value={appointment.providerFirstName} />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="providerLastName">Provider Last Name</label>
                    <input id="providerLastName" name="providerLastName" type="text" className="form-control" required
                        onChange={handleChange} value={appointment.providerLastName} />
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <label className="form-label" htmlFor="date">Date</label>
                        <input id="date" name="date" type="date" className="form-control" required
                            onChange={handleChange} value={appointment.date} />
                    </div>
                    <div className="col">
                        <label className="form-label" htmlFor="startTime">Start Time</label>
                        <input id="startTime" name="startTime" type="number" className="form-control"
                            onChange={handleChange} value={appointment.startTime} />
                    </div>
                    <div className="col">
                        <label className="form-label" htmlFor="endTime">End Time</label>
                        <input id="endTime" name="endTime" type="number" className="form-control"
                            onChange={handleChange} value={appointment.endTime} />
                    </div>
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-info me-2">Save</button>
                    <Link className="btn btn-warning" to="/appointments">Cancel</Link>
                </div>
            </form>
        </>
    );
}

export default CreateForm;