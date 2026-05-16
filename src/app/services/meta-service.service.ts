import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Meta } from '../models/meta.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetaServiceService {

  // Inyectamos el servicio de Firestore en el constructor
  constructor(private firestore: AngularFirestore) { }

  // 1. Operación de Lectura
  getMetas(): Observable<Meta[]> {
    // Apuntamos a la colección 'metas'
    // valueChanges({ idField: 'id' }) extrae los datos y nos inyecta el ID único del documento en nuestra propiedad 'id'
    return this.firestore.collection<Meta>('metas').valueChanges({ idField: 'id' });
  }

  // 2. Operación de Agregar (Creación)
  addMeta(meta: Meta) {
    // add() crea un nuevo documento con un ID autogenerado por Firestore
    return this.firestore.collection('metas').add(meta);
  }

  // 3. Operación de Eliminación
  deleteMeta(metaId: string) {
    // Buscamos el documento específico por su ID y lo destruimos
    return this.firestore.collection('metas').doc(metaId).delete();
  }
}
