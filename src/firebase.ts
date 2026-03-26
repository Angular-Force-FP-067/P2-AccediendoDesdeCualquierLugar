// src/firebase.ts
// Este archivo contiene la configuración de Firebase para referencia.
// NO inicialices la app aquí: AngularFire ya inicializa Firebase usando
// `provideFirebaseApp` en `src/app/app.config.ts`. Inicializar aquí provoca
// que Firebase/Firestore se creen fuera del contexto de inyección de Angular
// y genera warnings como "Calling Firebase APIs outside of an Injection context".

import { environment } from './environments/environment';

export const firebaseConfig = environment.firebase;