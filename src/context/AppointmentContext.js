import React, { createContext, useState, useContext, useEffect } from 'react';

const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const [appointmentArray, setAppointmentArray] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const URL = "http://localhost:8080/api/v1/appointment/search";
  const INITIAL_SEARCH = {
    patientFirstName: "",
    patientLastName: "",
    providerFirstName: "",
    providerLastName: "",
    ascending: true,
    afterDate: "",
    beforeDate: ""
}

  const fetchAppointments = async (searchCriteria) => {

    const requestObject = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(searchCriteria)
    };

    const fetchData = async (link, request) => {
        const response = await fetch(link, request);

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }

        return response.json();
      };

    try {
        const data = await fetchData(URL, requestObject) 
        setAppointmentArray(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments(INITIAL_SEARCH);
  }, []);

  return (
    <AppointmentContext.Provider value={{ appointmentArray, setAppointmentArray, loading, fetchAppointments }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointmentContext = () => useContext(AppointmentContext);