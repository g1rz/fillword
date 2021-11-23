var gulp = require('gulp'), // Подключаем Gulp
    sass = require('gulp-sass'), //Подключаем Sass пакет,
    browserSync = require('browser-sync'), // Подключаем Browser Sync
    concat = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
    cssnano = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    rename = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    del = require('del'), // Подключаем библиотеку для удаления файлов и папок
    imagemin = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    pngquant = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
    cache = require('gulp-cache'), // Подключаем библиотеку кеширования
    autoprefixer = require('gulp-autoprefixer'), // Подключаем библиотеку для автоматического добавления префиксов
    svgSprite = require('gulp-svg-sprite'), // Подключаем библиотеку для создания svg-спрайта
    spritesmith = require('gulp.spritesmith'), // Подключаем библиотеку для создания png-спрайта
    sourcemaps = require('gulp-sourcemaps'),
    pug = require('gulp-pug');

gulp.task('sass', function() { // Создаем таск Sass
    return gulp.src('app/sass/**/*.sass') // Берем источник
        .pipe(sourcemaps.init())
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({ stream: true })); // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('pug', function() {
    return gulp.src("app/pug/*.pug")
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest("app"))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
    return gulp.src([ // Берем все необходимые библиотеки
            'app/libs/jquery/dist/jquery.min.js', // Берем jQuery
            'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js', // Берем Magnific Popup
            // 'app/libs/slick.js/slick/slick.min.js', // Берем Slick slider
            //'app/libs/jquery.inputmask/dist/jquery.inputmask.min.js',
            // 'app/libs/inputmask/dist/inputmask.min.js',
            'app/libs/jquery-mask-plugin/src/jquery.mask.js',
            'app/libs/fancybox/dist/jquery.fancybox.min.js',
            'app/libs/owl.carousel/dist/owl.carousel.js',
        ])
        .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
});

gulp.task('svgSprite', function() {
    return gulp.src('app/img/sprite-svg/*.svg') // svg файлы для спрайта
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: "../sprite.svg" // имя спрайт файла
                }
            },
        }))
        .pipe(gulp.dest('app/img/'));
});

gulp.task('imgSprite', function() {
    var spriteData =
        gulp.src('app/img/sprite-img/*.*') // путь, откуда берем картинки для спрайта
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.sass',
            cssFormat: 'sass',
            imgPath: '../img/sprite.png'
        }));

    spriteData.img.pipe(gulp.dest('app/img/')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('app/sass/')); // путь, куда сохраняем стили
});

gulp.task('css-libs', ['sass'], function() {
    return gulp.src('app/css/libs.css') // Выбираем файл для минификации
        .pipe(cssnano()) // Сжимаем
        .pipe(rename({ suffix: '.min' })) // Добавляем суффикс .min
        .pipe(gulp.dest('app/css')); // Выгружаем в папку app/css
});

gulp.task('watch', ['browser-sync', 'css-libs', 'scripts', 'svgSprite', 'imgSprite', 'pug'], function() {
    gulp.watch('app/sass/**/*.sass', ['sass']); // Наблюдение за sass файлами в папке sass

    gulp.watch('app/pug/**/*.pug', ['pug']);
    gulp.watch('app/img/sprite-svg/*.svg', ['svgSprite']);
    gulp.watch('app/img/sprite-img/*.*', ['imgSprite']);
    gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('app/js/**/*.js', browserSync.reload); // Наблюдение за JS файлами в папке js
});

gulp.task('clean', function() {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('img', function() {
    return gulp.src('app/img/**/*') // Берем все изображения из app
        .pipe(cache(imagemin({ // Сжимаем их с наилучшими настройками с учетом кеширования
            interlaced: true,
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});

gulp.task('build', ['clean', 'img', 'sass', 'scripts', 'svgSprite', 'imgSprite'], function() {

    var buildCss = gulp.src([ // Переносим библиотеки в продакшен
            'app/css/**/*.css'
        ])
        .pipe(gulp.dest('dist/css'));

    var buildCssMap = gulp.src([ // Переносим библиотеки в продакшен
            'app/css/**/*.css.map'
        ])
        .pipe(gulp.dest('dist/css'));

    var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
        .pipe(gulp.dest('dist/fonts'));

    var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
        .pipe(gulp.dest('dist/js'));

    var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
        .pipe(gulp.dest('dist'));

    var buildPhp = gulp.src('app/*.php')
        .pipe(gulp.dest('dist'));
});

gulp.task('clear', function() {
    return cache.clearAll();
});

gulp.task('default', ['watch']);