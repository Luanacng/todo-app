export interface Todo {
    id?: string, //opcional
    titulo: string,
    descricao?: string, //opcional
    dataParaFinalizar: any,
    finalizado: boolean
}