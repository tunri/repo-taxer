type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends
    ((k: infer I) => void) ? I : never

/*
* Hereda todos los campos de la interface/type y permite Renombrar multiples campos de la interface o type
* Ejemplo
* interface A = { nombre: string; Edad:number; Genero:string; .... }
* interface B = PickRenameMulti<A, {
* "nombre" : "name",
* "Edad"   : "age",
* "Genero" : "gender",
* }>;
* B = { name:string; age:number, gender:string ....}
*/
export type PickRenameMulti<T, R extends
    { [K in keyof R]: K extends keyof T ? PropertyKey : "Error: key not in T" }
    > = Omit<T, keyof R> & UnionToIntersection<
        { [P in keyof R & keyof T]: { [PP in R[P]]: T[P] } }[keyof R & keyof T]
    >


/*
* Hereda todos los campos de la interface/type y permite Renombrar un campo de la interface o type (Solo 1)
* Ejemplo
* interface A = { nombre: string; .... }
* interface B = PickRename<A, "nombre", "name" >;
* B = { name:string; ....}
*/
export type PickRename<T, K extends keyof T, R extends PropertyKey> = Omit<T, K> & { [P in R]: T[K] }
