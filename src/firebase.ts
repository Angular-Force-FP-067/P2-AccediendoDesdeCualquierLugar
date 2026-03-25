// src/firebase.ts
import { initializeApp } from '@angular/fire/app';
import { getFirestore } from '@angular/fire/firestore';
import { environment } from './environments/environment'; // Para tener los APIS, TOKEN, etc...

const app = initializeApp(environment.firebase);
export const db = getFirestore(app);