const moment =require('moment')
module.exports={
    upperCase(item) { return item.charAt(0).toUpperCase() + item.slice(1);},
    increase(a,i){return a+i},
    quantityy(item){return item.reduce((total,i)=>{return total+i.quantity},0) },
    newLine(a){if(a) return a.replace(/\n/g, "<br />");},
    discount(a,b) {return (100-a/b*100).toFixed(0)},
    nameDisplay(a){ if(!a) {return null;} let arr=a.split(' '); return arr[arr.length-1]},
    hidden(a){if(!a) {return ''} return a.charAt(0)+a.charAt(1)+'****'+a.slice(6);},
    momentFormat(a){ return moment(a).format('LL');},
    checkedBox(a,b){ if(a.includes(b)) {return 'checked' } },
    compareValue(a,b){if(a==b){return true}; return false}
}