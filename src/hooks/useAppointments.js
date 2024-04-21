import { useEffect, useState } from "react";

// NOTES TO SELF
// I am repurposing this hook that used to merge static, unchanging data from two different sources
// Now, I'm trying to make it shift through up to 100 search results stored in an array
// these are two rather different things, but it helps to look at what I did rather than start from nothing

// position will operate off of array index position instead of object id... ensure this handles empty arrays and what not well
// this won't be done in the hook either, I think
// the pokemon hook hits the API whenever the page is flipped; I want to hit the API once and sort through the results until another search is made





export default function useAppointments() {

  // variables
//   const LIMIT = 10;
  const URL = "http://localhost:8080/api/v1/appointment/search";
  const defaultSearchCriteria = {
    patientFirstName: "",
    patientLastName: "",
    providerFirstName: "",
    providerLastName: "",
    ascending: true,
    afterDate: null,
    beforeDate: null
};

  // state
  const [loading, setLoading] = useState(true);
  const [searchCriteria, setSearchCriteria] = useState(defaultSearchCriteria);
  const [appointmentArray, setAppointmentArray] = useState([]);

  // fetch data
  useEffect(() => {
    const fetchAppointments = async (searchCriteria) => {

        const request = {
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
        const data = await fetchData(URL, request) 
        setAppointmentArray(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments(searchCriteria);
  }, [searchCriteria]);

  // return data to components
  return [appointmentArray, loading];
}