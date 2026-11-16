import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { DATA_DATABASE_ID, dataFirebaseConfig } from './config';

// App separado do Firebase Analytics (que fica no projeto portifolio-tamy): este guarda as visitas
const dataApp = initializeApp(dataFirebaseConfig, 'data');

export const db = getFirestore(dataApp, DATA_DATABASE_ID);
