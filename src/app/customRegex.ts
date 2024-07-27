import { FormControl, Validators } from "@angular/forms";

export const capitalRegexValidator = Validators.pattern('^([A-Z]*[A-Z]){3}$');
export const nameValidator = Validators.pattern('^[a-zA-Z0-9& ]*[a-zA-Z0-9&]$');
export const password = Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}');
export const fullNameValidator = Validators.pattern('^[a-zA-Z ]*[a-zA-Z]$');
export const phoneCode = Validators.pattern('[- +][0-9]+');
export const checkWhiteSpace = Validators.pattern('^\w+( +\w+)*$');
export function noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
}

