import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts/contacts.service';
import { addressTypeValues, phoneTypeValues } from '../contacts/contact.model';
import { restrictedWords } from '../validators/restricted-words.validator';
import { debounceTime, distinctUntilChanged } from 'rxjs';

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
    phones: this.fb.array([this.createPhoneGroup()]),
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
    if (!contactId)  {
      // Set validations to new contact form also.
      this.subscribeToAddressChanges();
      return;
    };

    this.contactsService.getContact(contactId).subscribe((contact) => {
      if (!contact) return;

      for (let i = 1; i < contact.phones.length; i++) {
        this.addPhone();
      }

      // Following approach remove all unnecessary code like example
      // in "edit-contact.component-old".
      this.contactForm.setValue(contact);

      // Following code is when we don't want to inicialize all values in the
      // fields in our form module, instead of that we want to initialize only
      // "firstName" and "lastName".
      // const names = {firstName: contact.firstName, lastName: contact.lastName}
      // "patchValues()" allows you to set values on few properties on form model.
      // this.contactForm.patchValue(names);

      this.subscribeToAddressChanges();
    })
  }

  // Adding reactive transformations.
  subscribeToAddressChanges() {
    const addressGroup = this.contactForm.controls.address;
    addressGroup.valueChanges
    .pipe(distinctUntilChanged(this.stringifyCompare))
    .subscribe(() => {
      for (const controlName in addressGroup.controls) {
        addressGroup.get(controlName)?.removeValidators([Validators.required]);
        addressGroup.get(controlName)?.updateValueAndValidity();
      }
    });
    addressGroup.valueChanges
    .pipe(debounceTime(2000), distinctUntilChanged(this.stringifyCompare))
    .subscribe(() => {
      for (const controlName in addressGroup.controls) {
        addressGroup.get(controlName)?.addValidators([Validators.required]);
        addressGroup.get(controlName)?.updateValueAndValidity();
      }
    });
  }

  stringifyCompare(a: any, b: any) {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  createPhoneGroup() {
    const phoneGroup = this.fb.nonNullable.group({
      phoneNumber: '',
      phoneType: '',
      preferred: false,
    })

    // Subscribing to value changes on formControls.
    // On similar way we can subscribe to formGoups and formArrays.
    phoneGroup.controls.preferred.valueChanges
    .pipe(distinctUntilChanged(this.stringifyCompare))
    .subscribe(value => {
      if (value)
        phoneGroup.controls.phoneNumber.addValidators([Validators.required]);
      else
        phoneGroup.controls.phoneNumber.removeValidators([Validators.required]);
      phoneGroup.controls.phoneNumber.updateValueAndValidity();
    });

    return phoneGroup
  }

  // With formArrays we can dynamicly add elements to a form.
  addPhone() {
    this.contactForm.controls.phones.push(this.createPhoneGroup());
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
