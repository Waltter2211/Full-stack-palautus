import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import { Diagnose, Entry, HealthCheckRating, NewEntry, Patient } from '../../types';
import { getDiagnoses, addEntry } from '../../services/diagnoses';
import HospitalEntry from '../EntryComponents/HospitalEntry';
import OccupationalHealthCareEntry from '../EntryComponents/OccupationalHealthCareEntry';
import HealthCheckEntry from '../EntryComponents/HealthCheckEntry';

type Params = {
    id: string;
};

const PatientInfoPage = () => {
    const [patient, setPatient] = useState<Patient[]>([]);
    const [diagnoses, setDiagnoses] = useState<Diagnose[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [healthCheckRating, setHealthCheckRating] = useState(0);
    const [diagnosesCodes, setDiagnosesCodes] = useState('');
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

    const handleSubmit = () => {
        const newObj: NewEntry = {
            description: description,
            date: date,
            specialist: specialist,
            healthCheckRating: healthCheckRating,
            diagnosisCodes: [...diagnosesCodes],
            type: "HealthCheck",
        };
        addEntry(id!, newObj);
    };

  return (
    <div>
        {patient.map(details => {
            return (
                <div key={details.id}>
                    <h2>{details.name} {details.gender}</h2>
                    <p>ssh: {details.ssn}</p>
                    <p>occupation: {details.occupation}</p>
                    {showForm === true? <div><form onSubmit={handleSubmit}>
                        <h3>New HealthCheck entry</h3>
                        <p>Description</p>
                        <input type='text' value={description} onChange={(event) => setDescription(event.target.value)} />
                        <p>Date</p>
                        <input type='text' value={date} onChange={(event) => setDate(event.target.value)} />
                        <p>Specialist</p>
                        <input type='text' value={specialist} onChange={(event) => setSpecialist(event.target.value)} />
                        <p>Healthcheck rating</p>
                        <input type='text' value={healthCheckRating} onChange={(event) => setHealthCheckRating(event.target.value)} />
                        <p>Diagnosis codes</p>
                        <input type='text' value={diagnosesCodes} onChange={(event) => setDiagnosesCodes(event.target.value)} />
                        <button>Add</button>
                    </form> <button onClick={() => setShowForm(false)}>Close</button></div> : <button onClick={() => setShowForm(true)}>Add new entry</button>}
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