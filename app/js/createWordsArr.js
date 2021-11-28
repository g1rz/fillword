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

let gameArr = Array.from( Array(sizeArr.y), () => new Array(sizeArr.x).fill(0) );

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
        wordObj.x = getRandomInt(0, sizeArr.x - 1); 
        wordObj.y = getRandomInt(0, sizeArr.y - 1);

        
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

    wordObj.direction = findDirection(wordObj.x, wordObj.y, gameArr);

    console.log(wordObj);
    
    gameArr[wordObj.y][wordObj.x] = char;
}

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

    return shuffle(arrDirs)[0];
}

function getDirectionsList(x, y, game, wordLength) {
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

    return arrDirs[0];
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
            console.log('y - ', y, ' x - ', x);
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
        console.log($fieldRow);
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