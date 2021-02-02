/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender, Entry } from './types';

const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseString(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation),
    entries: parseEntries(object.entries)
  };
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (st: any): string => {
  if (!st || !isString(st)) {
    throw new Error('Incorrect or missing string: ' + st);
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

export default toNewPatient;