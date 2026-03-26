import { Injectable, Injector, runInInjectionContext } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Player } from '../models/players';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private collectionName = 'players'; // la colección creada por Cèlia se llama 'players'

  constructor(private firestore: Firestore, private injector: Injector) {}

  // Ejecutamos las llamadas a AngularFire dentro del contexto de inyección
  // para evitar los warnings "Calling Firebase APIs outside of an Injection context".
  getItems(): Observable<Player[]> {
    return runInInjectionContext(this.injector, () => {
      const coll = collection(this.firestore, this.collectionName);
      return collectionData(coll, { idField: 'id' }) as Observable<Player[]>;
    });
  }

  getItemById(id: string): Observable<Player | undefined> {
    return runInInjectionContext(this.injector, () => {
      const d = doc(this.firestore, `${this.collectionName}/${id}`);
      return docData(d, { idField: 'id' }) as Observable<Player | undefined>;
    });
  }

  addItem(item: Omit<Player, 'id'>): Promise<any> {
    return runInInjectionContext(this.injector, () => {
      const coll = collection(this.firestore, this.collectionName);
      return addDoc(coll, item);
    });
  }

  updateItem(id: string, item: Partial<Player>): Promise<void> {
    return runInInjectionContext(this.injector, () => {
      const d = doc(this.firestore, `${this.collectionName}/${id}`);
      return updateDoc(d, item as any);
    });
  }

  deleteItem(id: string): Promise<void> {
    return runInInjectionContext(this.injector, () => {
      const d = doc(this.firestore, `${this.collectionName}/${id}`);
      return deleteDoc(d);
    });
  }
}
