const words = [
    'этикетка',
    'город',
    'заявка',
    'приват',
    'документ',
    'терминал'
];


const countChars = words.reduce((sum, item) => sum += item.length, 0);

const sizeArr = getSizeArray(countChars);

let gameArr = Array.from( Array(sizeArr.y), () => new Array(sizeArr.x).fill(0) );

// console.log(countChars, sizeArr);
console.log(gameArr);

let wordObj = {
    chars: Array.from('этикетка').reverse(),
    x: 0,
    y: 0,
    direction: 'right'
};

wordObj.x = Math.floor(Math.random() * (sizeArr.x + 1));
wordObj.y = Math.floor(Math.random() * (sizeArr.y + 1));

console.log(wordObj);

while (wordObj.chars.length > 0) {
    const char = wordObj.chars.pop();
    
    gameArr[wordObj.y][wordObj.x] = char;

    console.log(gameArr);
    break
}


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