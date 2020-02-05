import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Contact } from '../models/Contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private db: AngularFirestore) {}

  submitMessage(formData: Contact) {
    return this.db.collection('messages').add({
      formData
    });
  }
}
