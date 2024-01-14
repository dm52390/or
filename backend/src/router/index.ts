import express from 'express';
import { getFilteredData } from '../controllers/search';
import { downloadFilteredDataCSV, downloadFilteredDataJSON } from '../controllers/download';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../openapi.json';

const router = express.Router();

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));

router.get('/search', getFilteredData);
router.get('/download/csv', downloadFilteredDataCSV);
router.get('/download/json', downloadFilteredDataJSON);
router.get('/metadata', downloadFilteredDataJSON);

export default router;