import patients from '../data/patients';
import { Patient, NewPatient, PublicPatient, Entry } from '../types';
import { uuid } from 'uuidv4';

const getPatientEntries = (): Patient[] => {
  return patients;
};

const getNonSensitivePatientEntries = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const findPatient = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (entry: Entry, id: string): Patient | undefined => {
  console.log(entry);
  console.log(id);
  const patient = patients.find(p => p.id === id);
  if (!patient) {
    return;
  }
  patient?.entries.push(entry);

  return patient;
};

export default {
  getPatientEntries,
  getNonSensitivePatientEntries,
  addPatient,
  findPatient,
  addEntry
};