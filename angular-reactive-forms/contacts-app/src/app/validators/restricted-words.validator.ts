import { AbstractControl, ValidationErrors } from "@angular/forms";

// Function will take a control as a parameter which is of type "AbstractControl"
// which means the validator fn can be applied to either a formControl or formGroup.
export function restrictedWords(words: string[]) {
    return (control: AbstractControl): ValidationErrors | null => {
        const invalidWords = words
            .map(w => control.value.includes(w) ? w : null)
            .filter(w => w !== null);
        return invalidWords.length > 0
            ? { restrictedWords: invalidWords.join(', ') }
            : null;
    }
}