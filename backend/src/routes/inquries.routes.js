import express from 'express';
import Enquiry from '../models/inqury.model.js';
import { addInqury, deleteInqury, getInquries, getInquryById, updateInqury } from '../controllers/inqury.controller.js';
const inquriesRoutes = express.Router();


inquriesRoutes.post('/', addInqury);
inquriesRoutes.get('/', getInquries);
inquriesRoutes.get('/:id', getInquryById);
inquriesRoutes.put('/:id', updateInqury);
inquriesRoutes.delete('/:id', deleteInqury);

export default inquriesRoutes;
