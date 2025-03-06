import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts/contacts.service';
import { addressTypeValues, phoneTypeValues } from '../contacts/contact.model';
import { restrictedWords } from '../validators/restricted-words.validator';

@Component({
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  phoneTypes = phoneTypeValues;
  addressTypes = addressTypeValues;
  // "".nonNullable" makes all property type set to not be null,
  // except explicitly typed ones like: dateOfBirth and favoritesRanking.
  contactForm = this.fb.nonNullable.group({
    id: '',
    icon: '',
    personal: false,
    firstName: ['', [Validators.required, Validators.minLength(3)]], // or array of validators
    lastName: '',
    dateOfBirth: <Date | null>null,
    favoritesRanking: <number | null>null,
    phone: this.fb.nonNullable.group({
      phoneNumber: '',
      phoneType: '',
    }),
    address: this.fb.nonNullable.group({
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required],
      addressType: '',
    }),
    notes: ['', restrictedWords(['foo', 'bar'])],
  });


  constructor(
    private route: ActivatedRoute,
    private contactsService: ContactsService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return;

    this.contactsService.getContact(contactId).subscribe((contact) => {
      if (!contact) return;

      // Following approach remove all unnecessary code like example
      // in "edit-contact.component-old".
      this.contactForm.setValue(contact);

      // Following code is when we don't want to inicialize all values in the
      // fields in our form module, instead of that we want to initialize only
      // "firstName" and "lastName".
      // const names = {firstName: contact.firstName, lastName: contact.lastName}
      // "patchValues()" allows you to set values on few properties on form model.
      // this.contactForm.patchValue(names);
    })
  }

  get firstName() {
    return this.contactForm.controls.firstName;
  }
  get notes() {
    return this.contactForm.controls.notes;
  }

  saveContact() {
    console.log(this.contactForm.value);

    this.contactsService.saveContact(this.contactForm.getRawValue()).subscribe({
      next: () => this.router.navigate(['/contacts'])
    });
  }
}
