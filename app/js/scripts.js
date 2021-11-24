const $field = document.getElementById('game');
const $fieldItems = document.querySelectorAll('.field__item');


$field.onmousedown = function(e) {

    console.log('mousedown');

    let word = '';

    $fieldItems.forEach(function($item) {
        $item.onmouseover = function(e) {
            console.log('mouseovser - ', closestEdge(e, this));
            // console.log(this);
            // this.classList.add('field__item--rb');

            removeBorder(e, this);
        };
        
        $item.onmouseout = function(e) {
            console.log('mouseout - ', closestEdge(e, this));
            // console.log(this);
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

        $fieldItems.forEach(function($item) {

            $item.onmouseover = null;
            
            $item.onmouseout = null;

            $item.classList.remove('rm-top');
            $item.classList.remove('rm-bottom');
            $item.classList.remove('rm-left');
            $item.classList.remove('rm-right');
        });
    };


    function move(e) {
        $target = e.composedPath()[1];//e.target;
        // console.log(e.composedPath()[1]);

        if ($target.classList.contains('field__item--empty')) {
            document.onmousemove = null;
            $field.onmouseup = null;
            clearFieldFromActive();
            return false;
        }
    
        if ($target.classList.contains('field__item') && !$target.classList.contains('field__item--active')) {
            word += $target.textContent.trim() || $target.innerText.trim();
        }
    
        if ($target.classList.contains('field__item')) {
            $target.classList.add('field__item--active');
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
    
}

function removeBorder(event, element) {
    const side = closestEdge(event, element);

    element.classList.add('rm-' + side);
}


function checkWord(word) {
    const listWords = [
        'дин',
        'вжёк',
        'йоу'
    ];

    if ( listWords.includes(word) ) {
        return true;
    }

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