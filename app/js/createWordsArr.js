const words = [
    'этикетка',
    'город',
    'заявка',
    'приват',
    'документ',
    'терминал'
];

const colors = [
    '#28f141',
    '#285cf1',
    '#d328f1',
    '#f12897',
    '#cfc868',
    '#68cfc6'
];


const countChars = words.reduce((sum, item) => sum += item.length, 0);

const sizeArr = getSizeArray(countChars);


// Игровое поле
let gameArr = Array.from( Array(sizeArr.y), () => new Array(sizeArr.x).fill(0) );

// массив для наглядности со свободными соседними ячейками - удалить
let neighborsArr = Array.from( Array(sizeArr.y), () => new Array(sizeArr.x) );

// массив объектов со свободными соседними ячейками и координатами
let neighborsArrObj = Array.from( Array(sizeArr.y), () => new Array(sizeArr.x) );

for (let y = 0; y < sizeArr.y; y++) {

    for (let x = 0; x < sizeArr.x; x++) {
        let freeNeighbors = 0;

        if ( (x === 0 && y === 0) || (x === sizeArr.x - 1 && y === 0) || (x === 0 && y === sizeArr.y - 1) || (x === sizeArr.x - 1 && y === sizeArr.y - 1) ) {
            freeNeighbors = 2;
        } else if ( (x > 0 && x < sizeArr.x - 1 && y === 0) || (x === 0 && y > 0 && y < sizeArr.y - 1) || (x === sizeArr.x - 1 && y > 0 && y < sizeArr.y - 1) || (x > 0 && x < sizeArr.x - 1 && y === sizeArr.y - 1) ) {
            freeNeighbors = 3;
        } else {
            freeNeighbors = 4;
        }

        const obj = {
            x: x,
            y: y,
            isEmty: true,
            freeNeighbors: freeNeighbors
        };

        neighborsArrObj[y][x] = obj;
        neighborsArr[y][x] = obj.freeNeighbors;
    }
}

// console.log(countChars, sizeArr);
console.log(gameArr);

let wordObj = {
    chars: Array.from('этикетка').reverse(),
    color: colors.pop(),
    x: 0,
    y: 0,
    direction: ''
};


console.log(wordObj);

let i = 1;
while (wordObj.chars.length > 0) {
    const char = wordObj.chars.pop();

    if (wordObj.direction === '') {
        wordObj.x = getRandomInt(0, sizeArr.x - 1); // 0 
        wordObj.y = getRandomInt(0, sizeArr.y - 1); // 3

        
    } else {
        switch(wordObj.direction) {
            case 'top':
                wordObj.y = wordObj.y - 1;
                break;
            case 'right':
                wordObj.x = wordObj.x + 1;
                break;
            case 'bottom':
                wordObj.y = wordObj.y + 1;
                break;
            case 'left':
                wordObj.x = wordObj.x - 1;
        }
        
    }
    gameArr[wordObj.y][wordObj.x] = char;

    

    console.log('----------');
    console.log('stage - ', i++);
    console.log(wordObj, char);
    wordObj.direction = findDirection(wordObj.x, wordObj.y, gameArr);

    neighborsArrObj[wordObj.y][wordObj.x].isEmty = false;
    if ( wordObj.y - 1 >= 0 ) {
        --neighborsArrObj[wordObj.y - 1][wordObj.x].freeNeighbors;

        if (!neighborsArrObj[wordObj.y - 1][wordObj.x].isEmty) {
            neighborsArr[wordObj.y - 1][wordObj.x] = 0;
        } else {
            neighborsArr[wordObj.y - 1][wordObj.x] = neighborsArrObj[wordObj.y - 1][wordObj.x].freeNeighbors;
        }
        
    }
    if ( wordObj.y + 1 < sizeArr.y ) {
        --neighborsArrObj[wordObj.y + 1][wordObj.x].freeNeighbors;

        if (!neighborsArrObj[wordObj.y + 1][wordObj.x].isEmty) {
            neighborsArr[wordObj.y + 1][wordObj.x] = 0;
        } else {
            neighborsArr[wordObj.y + 1][wordObj.x] = neighborsArrObj[wordObj.y + 1][wordObj.x].freeNeighbors;
        }

    }
    if ( wordObj.x - 1 >= 0 ) {
        --neighborsArrObj[wordObj.y][wordObj.x - 1].freeNeighbors;

        if (!neighborsArrObj[wordObj.y][wordObj.x - 1].isEmty) {
            neighborsArr[wordObj.y][wordObj.x - 1] = 0;
        } else {
            neighborsArr[wordObj.y][wordObj.x - 1] = neighborsArrObj[wordObj.y][wordObj.x - 1].freeNeighbors;
        }
        
    }
    if ( wordObj.x + 1 < sizeArr.x ) {
        --neighborsArrObj[wordObj.y][wordObj.x + 1].freeNeighbors;

        if (!neighborsArrObj[wordObj.y][wordObj.x + 1].isEmty) {
            neighborsArr[wordObj.y][wordObj.x + 1] = 0;
        } else {
            neighborsArr[wordObj.y][wordObj.x + 1] = neighborsArrObj[wordObj.y][wordObj.x + 1].freeNeighbors;
        }
    }

    if (!neighborsArrObj[wordObj.y][wordObj.x].isEmty) {
        neighborsArr[wordObj.y][wordObj.x] = 0;
    }

    
    
    // console.log(gameArr);
}
console.log(gameArr);
console.log(neighborsArr);
    console.log(neighborsArrObj);
drawField(gameArr);


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

function findDirection(x, y, game) {
    let arrDirs = [];
    let arrDirsFuture = [];

    if ( (y - 1 >= 0) && !game[y - 1][x] ) {
        arrDirs.push('top');
    }
    if ( (x + 1 <= game[0].length - 1) && !game[y][x + 1] ) {
        arrDirs.push('right');
    }
    if ( (y + 1 <= game.length - 1) && !game[y + 1][x] ) {
        arrDirs.push('bottom');
    }
    if ( (x - 1 >= 0) && !game[y][x - 1] ) {
        arrDirs.push('left')
    }

    arrDirs.forEach(dir => {
        let countDirs = 0;
        if (dir === 'top') {
            countDirs = findDirectionsCount(x , y - 1 , game);
        }
        if (dir === 'right') {
            countDirs = findDirectionsCount(x + 1 , y , game);
        }
        if (dir === 'left') {
            countDirs = findDirectionsCount(x - 1 , y , game);
        }
        if (dir === 'bottom') {
            countDirs = findDirectionsCount(x , y + 1 , game);
        }

        arrDirsFuture.push({
            dir: dir,
            countDirs: countDirs
        });
    });

    let minCountDirs = arrDirsFuture[0].countDirs;

    arrDirsFuture.map(item => {
        if (item.countDirs <= minCountDirs) {
            minCountDirs = item.countDirs;
        } 
    });
    arrDirsFuture = arrDirsFuture.filter(item => item.countDirs <= minCountDirs);

    return shuffle(arrDirsFuture)[0].dir;
}


function findDirectionsCount(x, y, game) {
    let arrDirs = [];

    if ( (y - 1 >= 0) && !game[y - 1][x] ) {
        arrDirs.push('top');
    }
    if ( (x + 1 <= game[0].length - 1) && !game[y][x + 1] ) {
        arrDirs.push('right');
    }
    if ( (y + 1 <= game.length - 1) && !game[y + 1][x] ) {
        arrDirs.push('bottom');
    }
    if ( (x - 1 >= 0) && !game[y][x - 1] ) {
        arrDirs.push('left')
    }

    return arrDirs.length;
}



function  getRandomInt(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = getRandomInt(0, i);
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function drawField(gameArr) {
    console.log('draw');
    const $field = document.getElementById('game');

    for ( let y = 0; y < gameArr.length; y++ ) {
        const $fieldRow = document.createElement('div');
        $fieldRow.classList.add('field__row');

        for ( let x = 0; x < gameArr[0].length; x++ ) {
    
            const $fieldItem = createElement('div', 'field__item'),
                  $fieldItemSpan =  createElement('span', '', gameArr[y][x]),
                  $borders = createElement('div', 'borders'),
                  $border_top = createElement('div', 'borders__border borders__border--top'),
                  $border_right = createElement('div', 'borders__border borders__border--right'),
                  $border_bottom = createElement('div', 'borders__border borders__border--bottom'),
                  $border_left = createElement('div', 'borders__border borders__border--left');

            if ( !gameArr[y][x] ) {
                $fieldItem.classList.add('field__item--empty');
            }

            $fieldItem.appendChild($fieldItemSpan);

            $borders.appendChild($border_top);
            $borders.appendChild($border_right);
            $borders.appendChild($border_bottom);
            $borders.appendChild($border_left);

            $fieldItem.appendChild($borders);

            $fieldRow.appendChild($fieldItem);
        }
        $field.appendChild($fieldRow);
    }
}


// classNames - строка классов, классы разделены пробелами
function createElement(tag, classNames = '', innerText = '') {
    const $element = document.createElement(tag);

    if (classNames) 
        $element.classList.add(...classNames.split(' '));
    
    if (innerText)
        $element.innerText = innerText;

    return $element;
}