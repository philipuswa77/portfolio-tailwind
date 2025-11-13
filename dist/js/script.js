// hamburger-line
const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('#nav-menu');

hamburger.addEventListener('click', function()
{
    hamburger.classList.toggle('hamburger-active');
    navMenu.classList.toggle('hidden');
});

// navbar fixed
window.onscroll = function()
{
    const header = document.querySelector('#header');
    const fixedNav = header.offsetTop;

    // console.log($(window).width());

    if(window.pageYOffset > fixedNav)
    {
        header.classList.add('navbar-fixed');
    }
    else
    {
        header.classList.remove('navbar-fixed');
    }
}

// dark mode
const sun = document.querySelector('#sun');
const moon = document.querySelector('#moon');
const body = document.querySelector('#body');
const logoConnect = document.querySelector('#logo-connect');

sun.addEventListener('click', function() {
    sun.classList.add('opacity-0', 'pointer-events-none'); //hide sun
    moon.classList.remove('opacity-0', 'pointer-events-none'); //show moon
    body.classList.remove('bg-primary-darkmode');
    root.style.setProperty('--color-navbar', "oklch(27.9% 0.041 260.031)");
    root.style.setProperty('--color-navbar-blur', "oklch(96.7% 0.003 264.542 / 0.7)");
    root.style.setProperty('--color-navbar-small', "#FFFFFF");
    root.style.setProperty('--color-hamburger', "#000000");
    root.style.setProperty('--color-secondary', "oklch(55.4% 0.046 257.417)");
    root.style.setProperty('--color-title', "#000000");
    logoConnect.classList.remove('text-white');
});

moon.addEventListener('click', function() {
    sun.classList.remove('opacity-0', 'pointer-events-none'); //show sun
    moon.classList.add('opacity-0', 'pointer-events-none'); //hide moon
    body.classList.add('bg-primary-darkmode');
    root.style.setProperty('--color-navbar', "#FFFFFF");
    root.style.setProperty('--color-navbar-blur', "oklch(0.3014 0.0297 254.69 / 0.7)");
    root.style.setProperty('--color-navbar-small', "#242F3D");
    root.style.setProperty('--color-hamburger', "#FFFFFF");
    root.style.setProperty('--color-secondary', "#E2E8F0");
    root.style.setProperty('--color-title', "#FFFFFF");
    logoConnect.classList.add('text-white');
});

// music
const root = document.querySelector(':root');
const illit = document.querySelector('#illit');
const previous = document.querySelector('#previous');
const playPause = document.querySelector('#playPause');
const next = document.querySelector('#next');
const playSvg = document.querySelector('#play-svg');
const pauseSvg = document.querySelector('#pause-svg');

// let playlist = [
//     "dist/audio/Magnetic-ILLIT.mp3", //0
//     "dist/audio/Lucky_Girl_Syndrome-ILLIT.mp3", //1
//     "dist/audio/Almond_Chocolate-ILLIT.mp3", //2
//     "dist/audio/Do_the_Dance-ILLIT.mp3", //3
//     "dist/audio/jellyous-ILLIT.mp3", //4
//     "dist/audio/Topping-ILLIT.mp3", //5
//     "dist/audio/Toki_Yo_Tomare-ILLIT.mp3" //6
// ];

let playlist = [];
playlist.push({
    group: "superRealMe",
    path: "dist/audio/Magnetic-ILLIT.mp3"
});
playlist.push({
    group: "superRealMe",
    path: "dist/audio/Lucky_Girl_Syndrome-ILLIT.mp3"
});
playlist.push({
    group: "almondChocolate",
    path: "dist/audio/Almond_Chocolate-ILLIT.mp3"
});
playlist.push({
    group: "bomb",
    path: "dist/audio/Do_the_Dance-ILLIT.mp3"
});
playlist.push({
    group: "bomb",
    path: "dist/audio/jellyous-ILLIT.mp3"
});
playlist.push({
    group: "tokiYoTomare",
    path: "dist/audio/Topping-ILLIT.mp3"
});
playlist.push({
    group: "tokiYoTomare",
    path: "dist/audio/Toki_Yo_Tomare-ILLIT.mp3"
});

let index = 0;
let count = 0;

//get the first song
const audio = new Audio();
audio.src = playlist[index].path;

illit.addEventListener('click', function()
{
    count++;
    if(count == 7)
    {
        illit.classList.toggle('hidden');
        previous.classList.toggle('hidden');
        next.classList.toggle('hidden');
        playSvg.classList.remove('hidden'); //display play
        pauseSvg.classList.add('hidden'); //hide pause
    }
});

playPause.addEventListener('click', function()
{
    if(audio.paused) 
    {
        audio.play();
        playSvg.classList.add('hidden'); //hide play
        pauseSvg.classList.remove('hidden'); //display pause
    }
    else 
    {
        audio.pause();
        playSvg.classList.remove('hidden'); //display play
        pauseSvg.classList.add('hidden'); //hide pause
    }
});

function changePlayerColor(_index)
{
    if(playlist[_index].group == "superRealMe")
    {
        root.style.setProperty('--color-music', "#DCB4FA");
    }
    else if(playlist[_index].group == "almondChocolate")
    {
        root.style.setProperty('--color-music', "#E18A9B");
    }
    else if(playlist[_index].group == "bomb")
    {
        root.style.setProperty('--color-music', "#92BBEF");
    }
    else if(playlist[_index].group == "tokiYoTomare")
    {
        root.style.setProperty('--color-music', "#FFFDE4");
    }
}

// pause.addEventListener('click', function()
// {
//     audio.pause();
// });

previous.addEventListener('click', function()
{
    index--;
    if (index < 0) {
        index = playlist.length - 1;
    }
    audio.src = playlist[index].path;
    audio.play();

    playSvg.classList.add('hidden'); //hide play
    pauseSvg.classList.remove('hidden'); //display pause

    changePlayerColor(index);
});

next.addEventListener('click', function()
{
    index++;
    if (index >= playlist.length) {
        index = 0;
    }
    audio.src = playlist[index].path;
    audio.play();

    playSvg.classList.add('hidden'); //hide play
    pauseSvg.classList.remove('hidden'); //display pause

    changePlayerColor(index);
});

//Auto-play next song when current one ends
audio.addEventListener('ended', () => {
    index++;
    if (index >= playlist.length) {
        index = 0;
    }
    audio.src = playlist[index].path;
    audio.play();

    changePlayerColor(index);
});