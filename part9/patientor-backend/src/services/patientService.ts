import patients from '../data/patients';
import { Patient, NonSensitivePatientEntry } from '../types';

const getPatientEntries = (): Patient[] => {
  return patients;
};

const getNonSensitivePatientEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export default {
  getPatientEntries,
  getNonSensitivePatientEntries
};