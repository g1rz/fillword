let $field = document.getElementById('game');


$field.onmousedown = function(e) {

    console.log('mousedown');

    let word = '';

    move(e);
    document.onmousemove = function(e) {
        move(e);
    };
    

    $field.onmouseup = function() {
        document.onmousemove = null;
        $field.onmouseup = null;

        console.log('word - ', word);

        clearFieldFromActive();
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
