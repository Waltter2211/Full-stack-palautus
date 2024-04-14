import { HealthCheckRating } from "../../types";

interface HealthCheckRatingPropsDetails {
  type: "HealthCheck";
  date: string;
  description: string
  healthCheckRating: HealthCheckRating;
  specialist: string;
}

/* type HealthCheckRatingProps = HealthCheckRatingPropsDetails[]; */

function HealthCheckEntry(props: HealthCheckRatingPropsDetails) {
  return (
    <div style={{border: '1px solid black'}}>
      <p>{props.date}</p>
      <p>{props.description}</p>
      <p>{props.healthCheckRating}</p>
      <p>{props.specialist}</p>
    </div>
  );
}

export default HealthCheckEntry;