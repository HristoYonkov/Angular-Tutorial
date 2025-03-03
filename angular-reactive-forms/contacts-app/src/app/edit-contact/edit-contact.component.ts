import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContactsService } from '../contacts/contacts.service';

@Component({
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  // Following commented code is how to do it on individual way.
  // firstName = new FormControl('Pavel');
  // firstName = new FormControl();
  // lastName = new FormControl();
  // dateOfBirth = new FormControl();
  // favoritesRanking = new FormControl();

  // Following code is how to do it with FormGroup() way.
  contactForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    dateOfBirth: new FormControl(),
    favoritesRanking: new FormControl(),
  });


  constructor(private route: ActivatedRoute, private contactsService: ContactsService) { }

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return;

    this.contactsService.getContact(contactId).subscribe((contact) => {
      if (!contact) return;

      // this.firstName.setValue(contact.firstName);
      // this.lastName.setValue(contact.lastName);
      // this.dateOfBirth.setValue(contact.dateOfBirth);
      // this.favoritesRanking.setValue(contact.favoritesRanking);

      this.contactForm.controls.firstName.setValue(contact.firstName);
      this.contactForm.controls.lastName.setValue(contact.lastName);
      this.contactForm.controls.dateOfBirth.setValue(contact.dateOfBirth);
      this.contactForm.controls.favoritesRanking.setValue(contact.favoritesRanking);
    })
  }

  saveContact() {
    // console.log(this.firstName.value);
    console.log(this.contactForm.controls.firstName.value);
  }
}
