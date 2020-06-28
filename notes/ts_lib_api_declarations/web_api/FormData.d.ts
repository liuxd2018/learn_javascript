/** Provides a way to easily construct a set of key/value pairs representing form fields and their values, 
 * which can then be easily sent using the XMLHttpRequest.send() method. It uses the same format a form would use 
 * if the encoding type were set to "multipart/form-data". */
 interface FormData {
    append(name: string, value: string | Blob, fileName?: string): void;
    delete(name: string): void;
    get(name: string): FormDataEntryValue | null;
    getAll(name: string): FormDataEntryValue[];
    has(name: string): boolean;
    set(name: string, value: string | Blob, fileName?: string): void;
    forEach(callbackfn: (value: FormDataEntryValue, key: string, parent: FormData) => void, thisArg?: any): void;
}

declare var FormData: {
    prototype: FormData;
    new(form?: HTMLFormElement): FormData;
};