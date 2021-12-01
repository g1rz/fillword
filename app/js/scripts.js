const $field = document.getElementById('game');
const $fieldItems = document.querySelectorAll('.field__item');


$field.onmousedown = function(e) {

    console.log('mousedown');

    let word = '';

    $fieldItems.forEach(function($item) {
        $item.onmouseover = function(e) {
            removeBorder(e, this);
        };
        
        $item.onmouseout = function(e) {
            removeBorder(e, this);
        };
    });

    move(e);
    document.onmousemove = function(e) {
        move(e);
    };
    

    $field.onmouseup = function() {
        document.onmousemove = null;
        $field.onmouseup = null;

        console.log('word - ', word);

        clearFieldFromActive();
        clearRemovedBorders();
    };



    function move(e) {
        $target = e.target.closest('.field__item') || e.composedPath()[1];//e.target;
        // console.log(e.composedPath()[1]);

        let isGameField = e.target.closest('#game');

        if (isGameField) {

            if ($target.classList.contains('field__item--empty')) {
                document.onmousemove = null;
                $field.onmouseup = null;
                clearFieldFromActive();
                clearRemovedBorders();

                return false;
            }
        
            if ($target.classList.contains('field__item') && !$target.classList.contains('field__item--active')) {
                word += $target.textContent.trim() || $target.innerText.trim();
            }
        
            if ($target.classList.contains('field__item')) {
                $target.classList.add('field__item--active');
            }
        
        } else {
            document.onmousemove = null;
                $field.onmouseup = null;
                clearFieldFromActive();
                clearRemovedBorders();

                return false;
        }
    }

    function clearFieldFromActive() {
        document.querySelectorAll('.field__item--active').forEach(function(el) {
            el.classList.remove('field__item--active');

            if ( checkWord(word) ) {
                el.classList.add('field__item--empty');
            }
        });
    }

    function clearRemovedBorders() {
        $fieldItems.forEach(function($item) {

            $item.onmouseover = null;
            
            $item.onmouseout = null;

            $item.classList.remove('rm-top');
            $item.classList.remove('rm-bottom');
            $item.classList.remove('rm-left');
            $item.classList.remove('rm-right');
        });
    }
    
}

function removeBorder(event, element) {
    const side = closestEdge(event, element);

    element.classList.add('rm-' + side);
}


function checkWord(word) {
    // const listWords = [
    //     'этикетка',
    //     'город',
    //     'заявка',
    //     'приват',
    //     'документ',
    //     'терминал'
    // ];
    // console.log(words);
    if ( words.includes(word) ) {
        console.log('check ok');
        return true;
    }

    console.log('check no');
    return false;
}


function closestEdge(event, element) {
    const elemBounding  = element.getBoundingClientRect();
    const x = event.pageX;
    const y = event.pageY;
    const elTop = elemBounding.top;
    const elBottom = elemBounding.bottom;
    const elLeft = elemBounding.left;
    const elRight = elemBounding.right;

    const elTopDist = Math.abs(elTop - y);
    const elBottomDist = Math.abs(elBottom - y);
    const elLeftDist = Math.abs(elLeft - x);
    const elRightDist = Math.abs(elRight - x);

    const elMinDist = Math.min(elTopDist, elBottomDist, elLeftDist, elRightDist);

    switch(elMinDist) {
        case elTopDist:
            return 'top';
        case elBottomDist: 
            return 'bottom';
        case elLeftDist: 
            return 'left';
        case elRightDist: 
            return 'right';
    }
}