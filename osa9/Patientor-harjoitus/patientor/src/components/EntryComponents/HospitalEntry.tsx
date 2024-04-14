type HospitalEntryPropsDetails = {
  type: "Hospital";
  date: string;
  description: string;
  specialist: string;
  discharge: {
    date: string;
    criteria: string;
  }
};

/* type HospitalEntryProps = HospitalEntryPropsDetails[]; */

function HospitalEntry(props: HospitalEntryPropsDetails) {
    
  return (
    <div style={{border: '1px solid black'}}>
      <p>{props.date}</p>
      <p>{props.description}</p>
      <p>{props.specialist}</p>
      <p>{props.discharge.criteria} {props.discharge.date}</p>
    </div>
  );
}

export default HospitalEntry;