import { Injectable } from '@angular/core';
import { Contact } from '../models/Contact';
import { AngularFirestore } from '@angular/fire/firestore';

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
