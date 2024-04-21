import { useState } from "react";
import useAppointments from '../hooks/usePokemonLinks';

function AppointmentTable() {

    const [position, setPosition] = useState(1);
    const [appointmentArray, loading] = useAppointments(position);

    if (loading) {
        return null;
    }

    return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr className="text-center">
                        <th>Appointment ID</th>
                        <th>Patient</th>
                        <th>Provider</th>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                    </tr>
                </thead>
                <tbody>
                    {appointmentArray
                    .map(a => (
                        <tr key={a.id} className="align-middle text-center">
                            <td>{a.id}</td>
                            <td>{a.patientFirstName + " " + a.patientLastName}</td>
                            <td>{"Dr. " + a.providerFirstName + " " + a.providerLastName}</td>
                            <td>{a.date}</td>
                            <td>{a.startTime}</td>
                            <td>{a.endTime}</td>
                        </tr>
                    ))}
                </tbody>
            </table >
            <div className="position-fixed bottom-0 end-0 p-3">
                <button className="btn btn-primary me-2" onClick={() => {setPosition(alterPosition(position, -10))}}>{'<'}</button>
                <button className="btn btn-primary" onClick={() => {setPosition(alterPosition(position, 10))}}>{'>'}</button>
            </div>
        </div>
    );

}