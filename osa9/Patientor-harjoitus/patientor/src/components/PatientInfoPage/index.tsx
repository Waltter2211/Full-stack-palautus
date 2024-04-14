import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import { Patient } from '../../types';

type Params = {
    id: string;
};

const PatientInfoPage = () => {
    const [patient, setPatient] = useState<Patient[]>([]);
    const { id } = useParams<Params>();
    useEffect(() => {
        const fetchPatient = async () => {
            const patientData = await patientService.getOne(id!);
            setPatient(patient.concat({ ...patientData }));
        };
        
        void fetchPatient();
    }, []);
  return (
    <div>
        {patient.map(details => {
            return (
                <div key={details.id}>
                    <h2>{details.name} {details.gender}</h2>
                    <p>ssh: {details.ssn}</p>
                    <p>occupation: {details.occupation}</p>
                </div>
            );
        })}
    </div>
  );
};

export default PatientInfoPage;