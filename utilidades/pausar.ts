export default function pausar(miliseconds: number){
return new Promise((resolve)=> setTimeout(resolve, miliseconds));
}