// src/firebase.ts
import { initializeApp } from '@angular/fire/app';
import { getFirestore } from '@angular/fire/firestore';
import { environment } from './environments/environments'; // Para tener los APIS, TOKEN, etc...

const app = initializeApp(environment.firebase);
export const db = getFirestore(app);