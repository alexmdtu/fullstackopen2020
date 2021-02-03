/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { uuid } from 'uuidv4';
import { NewPatient, Gender, Entry, HealthCheckRating } from './types';

export const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseString(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation),
    entries: parseEntries(object.entries)
  };
};

export const toNewEntry = (object: any): Entry => {
  const baseEntry = {
    id: uuid(),
    description: parseString(object.description),
    date: parseDate(object.date),
    specialist: parseString(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
  };

  switch (object.type) {
    case 'HealthCheck':
      return {
        ...baseEntry,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      };
    case 'Hospital':
      return {
        ...baseEntry,
        type: 'Hospital',
        discharge: {
          date: parseDate(object.dischargeDate),
          criteria: parseDate(object.dischargeCriteria)
        }
      };
    case 'OccupationalHealthcare':
      return {
        ...baseEntry,
        type: 'OccupationalHealthcare',
        employerName: parseString(object.employerName),
        sickLeave: {
          startDate: parseDate(object.sickLeaveStartDate),
          endDate: parseDate(object.sickLeaveEndDate)
        }
      };
    default:
      throw new Error('Incorrect or missing entry type ' + object.type);
  }
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isStrings = (st: any[]): st is string[] => {
  let result = true;
  st.map(s => {
    if (!isString(s)) {
      result = false;
    }
  });
  return result;
};

const parseString = (st: any): string => {
  if (!st || !isString(st)) {
    throw new Error('Incorrect or missing string: ' + st);
  }

  return st;
};

const parseDiagnosisCodes = (st: any): string[] => {
  if (st === undefined) {
    return [];
  }

  if (!st || !isStrings(st)) {
    throw new Error('Incorrect or missing strings ' + st);
  }
  return st;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender ' + gender);
  }
  return gender;
};

const isEntry = (entry: any): entry is Entry => {
  return entry !== undefined;
};

const isEntries = (entries: any[]): entries is Entry[] => {
  let result = true;
  entries.map(e => {
    if (!isEntry(e)) {
      result = false;
    }
  });
  return result;
};

const parseEntries = (entries: any): Entry[] => {
  if (!entries || !isEntries(entries)) {
    throw new Error('Incorrect or missing entries ' + entries);
  }
  return entries;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (!isHealthCheckRating(rating)) {
    throw new Error('Incorrect or missing health check rating ' + rating);
  }
  return rating;
};