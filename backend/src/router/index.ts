import express from 'express';
import { getAllData, getFilteredData } from '../controllers/search';
import { downloadFilteredDataCSV, downloadFilteredDataJSON } from '../controllers/download';

const router = express.Router();

router.get('/search', getFilteredData);
router.get('/download/csv', downloadFilteredDataCSV);
router.get('/download/json', downloadFilteredDataJSON);
router.get('/metadata', downloadFilteredDataJSON);

export default router;