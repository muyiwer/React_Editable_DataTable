export interface Table{
   Column: Array<Column>
   Row: (number | string)[][];
}
export interface Props{
    data : Table
    tableTitle?: string
    height: number 
    rowSize: number 
    scrollTable: boolean
    paginate: boolean | true
    handleChange:(event:React.ChangeEvent<HTMLSelectElement>)  => void
}

 class Column {
    name?: string
    width: number = 100
    align: string = "left"
    IsEditable: boolean = false
}
class Row{
    value: []
    constructor() {
        this.value = []
      }
}

export class OrderCategory{
    category?: string
    constructor (category: string){
        this.category = category
    }
}
export class PageNumbers{
    value:number = 0
    active: boolean = false
    show: boolean = false
}


