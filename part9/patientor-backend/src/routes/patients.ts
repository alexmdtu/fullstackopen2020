import express from 'express';
import patientService from '../services/patientService';
import { toNewEntry, toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientEntries());
});

router.get('/:id', (req, res) => {
  res.send(patientService.findPatient(req.params.id));
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatient(req.body);
    const newPatient = patientService.addPatient(newPatientEntry);
    res.json(newPatient);
  } catch (e) {
    const error = e as Error;
    res.status(400).send(error.message);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const newPatient = patientService.addEntry(newEntry, req.params.id);
    res.json(newPatient);
  } catch (e) {
    const error = e as Error;
    res.status(400).send(error.message);
  }
});

export default router;