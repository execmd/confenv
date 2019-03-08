declare namespace Confenv {
    function reload(): void;
    function read(file: string): any; // return type??
    function getAll() : object;
    function get(key: string) : string|object|void;
    function getInt(key: string) : number;
    function getFloat(key: string) : number;
    function getBool(key: string) : boolean;
    function getArray(key: string, separator?: string): string[];
}

export default Confenv;
