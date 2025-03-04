// import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ContactsService } from '../contacts/contacts.service';

// @Component({
//   templateUrl: './edit-contact.component.html',
//   styleUrls: ['./edit-contact.component.css']
// })
// export class EditContactComponent implements OnInit {
//   // Following commented code is how to do it on individual way.
//   // firstName = new FormControl('Pavel');
//   // firstName = new FormControl();
//   // lastName = new FormControl();
//   // dateOfBirth = new FormControl();
//   // favoritesRanking = new FormControl();

//   // Following code is how to do it with FormGroup() way.
//   contactForm = new FormGroup({
//     id: new FormControl(),
//     firstName: new FormControl(),
//     lastName: new FormControl(),
//     dateOfBirth: new FormControl(),
//     favoritesRanking: new FormControl(),
//     phone: new FormGroup({
//       phoneNumber: new FormControl(),
//       phoneType: new FormControl(),
//     }),
//     address: new FormGroup({
//       streetAddress: new FormControl(),
//       city: new FormControl(),
//       state: new FormControl(),
//       postalCode: new FormControl(),
//       addressType: new FormControl(),
//     })
//   });


//   constructor(
//     private route: ActivatedRoute,
//     private contactsService: ContactsService,
//     private router: Router
//   ) { }

//   ngOnInit() {
//     const contactId = this.route.snapshot.params['id'];
//     if (!contactId) return;

//     this.contactsService.getContact(contactId).subscribe((contact) => {
//       if (!contact) return;

//       // Following commented code is how to do it on individual way.
//       // this.firstName.setValue(contact.firstName);
//       // this.lastName.setValue(contact.lastName);
//       // this.dateOfBirth.setValue(contact.dateOfBirth);
//       // this.favoritesRanking.setValue(contact.favoritesRanking);

//       this.contactForm.controls.id.setValue(contact.id);
//       this.contactForm.controls.firstName.setValue(contact.firstName);
//       this.contactForm.controls.lastName.setValue(contact.lastName);
//       this.contactForm.controls.dateOfBirth.setValue(contact.dateOfBirth);
//       this.contactForm.controls.favoritesRanking.setValue(contact.favoritesRanking);
//       // Here is how we will make nested FormGroup for phone in our contactForm.
//       this.contactForm.controls.phone.controls.phoneNumber.setValue(contact.phone.phoneNumber);
//       this.contactForm.controls.phone.controls.phoneType.setValue(contact.phone.phoneType);
//       // Here is how we will make nested FormGroup for address in our contactForm.
//       this.contactForm.controls.address.controls.streetAddress.setValue(contact.address.streetAddress);
//       this.contactForm.controls.address.controls.city.setValue(contact.address.city);
//       this.contactForm.controls.address.controls.state.setValue(contact.address.state);
//       this.contactForm.controls.address.controls.postalCode.setValue(contact.address.postalCode);
//       this.contactForm.controls.address.controls.addressType.setValue(contact.address.addressType);
//     })
//   }

//   saveContact() {
//     // Following commented code is how to do it on individual way.
//     // console.log(this.firstName.value);

//     // Following code is how to do it with FormGroup() way.
//     // console.log(this.contactForm.controls.firstName.value);
//     console.log(this.contactForm.value);
//     // getRawValue() will always return all controlled form property
//     // values, even if the control is disabled.
//     // this.contactsService.saveContact(this.contactForm.value);
//     this.contactsService.saveContact(this.contactForm.getRawValue()).subscribe({
//       next: () => this.router.navigate(['/contacts'])
//     });
//   }
// }
