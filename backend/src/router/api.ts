import express from 'express';
import { deleteStadioniId, deleteStadioniIdKluboId, getStadioni, getStadioniId, getStadioniIdAdresa, getStadioniIdKluboId, getStadioniIdKlubovi, getStadioniIdLokacija, postStadioni, putStadioniId, putStadioniIdAdresa, putStadioniIdKlubovi, putStadioniIdLokacija } from '../controllers/apiStadioni';
import { getKlubovi, getKluboviId, getKluboviIdAdresa } from '../controllers/apiKlubovi';

const api = express.Router();

api.get('/stadioni', getStadioni);
api.post('/stadioni', postStadioni);

api.get('/stadioni/:stadionId', getStadioniId);
api.put('/stadioni/:stadionId', putStadioniId);
api.delete('/stadioni/:stadionId', deleteStadioniId);

api.get('/stadioni/:stadionId/adresa', getStadioniIdAdresa);
api.put('/stadioni/:stadionId/adresa', putStadioniIdAdresa);

api.get('/stadioni/:stadionId/lokacija', getStadioniIdLokacija);
api.put('/stadioni/:stadionId/lokacija', putStadioniIdLokacija);

api.get('/stadioni/:stadionId/klubovi', getStadioniIdKlubovi);
api.put('/stadioni/:stadionId/klubovi', putStadioniIdKlubovi);
// api.patch('/stadioni/:stadionId/klubovi', patchStadioniIdKlubovi);

api.get('/stadioni/:stadionId/klubovi/:klubId', getStadioniIdKluboId);
api.delete('/stadioni/:stadionId/klubovi/:klubId', deleteStadioniIdKluboId);

api.get('/klubovi', getKlubovi);
api.get('/klubovi/:klubId', getKluboviId);
api.get('/klubovi/:klubId/adresa', getKluboviIdAdresa);

export default api;