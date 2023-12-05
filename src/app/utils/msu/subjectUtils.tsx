export interface ISubjectColor {
    color:string
    iconColor:string
    bgColor:string
}
export function getSubjectColor(code:string): ISubjectColor{
    const factCode = code.substring(0,2);
    const subFactCode = code.substring(2,4);
    
    return {color: "text-black", iconColor: "text-pink-300", bgColor: "bg-pink-300"}
}