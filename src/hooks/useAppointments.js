// import { useEffect, useState } from "react";

// export default function useAppointments(criteria) {

//   // variables
//   const URL = "http://localhost:8080/api/v1/appointment/search";

//   // state
//   const [loading, setLoading] = useState(true);
//   const [searchCriteria, setSearchCriteria] = useState(criteria);
//   const [appointmentArray, setAppointmentArray] = useState([]);

//   // fetch data
//   useEffect(() => {
//     const fetchAppointments = async () => {

//         const request = {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(searchCriteria)
//         };

//       const fetchData = async (link, request) => {
//         const response = await fetch(link, request);

//         if (!response.ok) {
//           throw new Error(`Failed to fetch data: ${response.status}`);
//         }

//         return response.json();
//       };

//       try {
//         const data = await fetchData(URL, request) 
//         setAppointmentArray(data);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAppointments();
// }, []);

//   // return data to components
//   return [appointmentArray, loading, setSearchCriteria];
// }