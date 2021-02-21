
import {airports} from './data';


let gg = new Set(airports.map(air=>{return air.code}));
var price = Math.floor((Math.random() * 1000) + 1);
console.log(gg);

export const schedule=
[
{
    from : gg[90],
    to:  gg[99],
    prices: price,
}
]