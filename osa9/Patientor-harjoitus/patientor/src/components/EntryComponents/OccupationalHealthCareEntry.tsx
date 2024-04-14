interface OccupationalHealthcareEntryPropsDetails {
  type: "OccupationalHealthcare";
    employerName: string;
    specialist: string;
    description: string;
    date: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    }
}

/* type OccupationalHealthcareEntryProps = OccupationalHealthcareEntryPropsDetails[]; */

function OccupationalHealthCareEntry(props: OccupationalHealthcareEntryPropsDetails) {
  return (
    <div style={{border: '1px solid black'}}>
      <p>{props.date} {props.employerName}</p>
      <p>{props.description}</p>
      <p>{props.specialist}</p>
      <p>{props.sickLeave?.startDate} - {props.sickLeave?.endDate}</p>
    </div>
  );
}

export default OccupationalHealthCareEntry;