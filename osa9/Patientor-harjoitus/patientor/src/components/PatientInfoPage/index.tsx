import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import { Diagnose, Entry, Patient } from '../../types';
import getDiagnoses from '../../services/diagnoses';
import HospitalEntry from '../EntryComponents/HospitalEntry';
import OccupationalHealthCareEntry from '../EntryComponents/OccupationalHealthCareEntry';
import HealthCheckEntry from '../EntryComponents/HealthCheckEntry';

type Params = {
    id: string;
};

const PatientInfoPage = () => {
    const [patient, setPatient] = useState<Patient[]>([]);
    const [diagnoses, setDiagnoses] = useState<Diagnose[]>([]);
    const { id } = useParams<Params>();
    useEffect(() => {
        const fetchPatient = async () => {
            const patientData = await patientService.getOne(id!);
            setPatient(patient.concat({ ...patientData }));
        };
        
        void fetchPatient();
    }, []);

    useEffect(() => {
        const fetchDiagnoses = async () => {
            const diagnoses = await getDiagnoses();
            setDiagnoses(diagnoses);
        };

        void fetchDiagnoses();
    }, []);

    const EntryDetails: React.FC<Entry> = (entry) => {
        switch (entry.type) {
            case "Hospital":
                return <HospitalEntry type={entry.type} discharge={entry.discharge} date={entry.date} description={entry.description} specialist={entry.specialist} />;
            case "OccupationalHealthcare":
                return <OccupationalHealthCareEntry type={entry.type} employerName={entry.employerName} sickLeave={entry.sickLeave} specialist={entry.specialist} date={entry.date} description={entry.description} />;
            case "HealthCheck":
                return <HealthCheckEntry type={entry.type} specialist={entry.specialist} healthCheckRating={entry.healthCheckRating} date={entry.date} description={entry.description} />;
            default:
                return assertNever(entry);
        }
    };

    function assertNever(shouldBeNever: never) {
        throw new Error("Was not never: " + shouldBeNever);
    }

  return (
    <div>
        {patient.map(details => {
            return (
                <div key={details.id}>
                    <h2>{details.name} {details.gender}</h2>
                    <p>ssh: {details.ssn}</p>
                    <p>occupation: {details.occupation}</p>
                    <h3>entries</h3>
                    {details.entries.map(entry => {
                        return (
                        <div key={entry.id}>
                            <EntryDetails type={entry.type} id={entry.id} description={entry.description} specialist={entry.specialist} date={entry.date} healthCheckRating={entry.healthCheckRating} sickLeave={entry.sickLeave} discharge={entry.discharge} employerName={entry.employerName}  />
                        </div>
                        );
                    })}
                    
                </div>
            );
        })}
    </div>
  );
};

export default PatientInfoPage;