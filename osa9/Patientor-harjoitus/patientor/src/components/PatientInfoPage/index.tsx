import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import { Diagnose, Patient } from '../../types';
import getDiagnoses from '../../services/diagnoses';

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
                            <p>{entry.date} {entry.description}</p>
                            <ul>
                            {entry.diagnosisCodes?.map((code, index) => {
                                const foundDiagnose = diagnoses.filter(diagnose => diagnose.code === code);
                                return (
                                    <li key={index}>{code} {foundDiagnose[0].name}</li>
                                );
                            })}
                            </ul>
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