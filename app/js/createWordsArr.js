const words = [
    'этикетка',
    'город',
    'заявка',
    'приват',
    'документ',
    'терминал2'
];


const countChars = words.reduce((sum, item) => sum += item.length, 0);

console.log(countChars, getSizeArray(countChars));



function getSizeArray(countItems) {
    const size = {
        x: 0,
        y: 0
    };

    const squareArr = Math.ceil( Math.sqrt( countItems ) );

    size.x = squareArr;
    size.y = squareArr;

    if ( squareArr * squareArr - countItems >= squareArr ) {
        size.y = squareArr - 1;
    }

    return size;
}