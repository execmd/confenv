declare namespace Confenv {
    export function reload(): void;
    export function read(file: string): any; // return type??
    export function getAll() : object;
    export function get(key: string) : string|object|void;
    export function getInt(key: string) : number;
    export function getFloat(key: string) : number;
    export function getBool(key: string) : boolean;
    export function getArray(key: string, separator?: string): string[];
}

