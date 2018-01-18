
drumMachine = {};
let timer;
let duration = 250;
let playOnce = 0;

const airhorn = document.getElementById('airhorn');
const kickSound = document.getElementById('kickSound');
const snareSound = document.getElementById('snareSound');
const clapSound = document.getElementById('clapSound');
const hihatSound = document.getElementById('hihatSound');


drumMachine.beats =  {
    drum1:  [false, false, false, false, false, false, false, false],
    drum2:  [false, false, false, false, false, false, false, false],
    drum3:  [false, false, false, false, false, false, false, false],
    drum4:  [false, false, false, false, false, false, false, false]
}

// starts when play button, class '.play' is clicked
drumMachine.startPlay = () => {
    let counter = 0;
    let beatHops = $('.counter li');

    if (counter < beatHops.length && playOnce < 1 ) {
        $('.play').addClass('btnActive');
        timer = setInterval(() => {
            let  hop = $(beatHops[counter]);

            if (drumMachine.beats.drum1[counter] === true) {
                kickSound.currentTime = 0;
                kickSound.play();
                $('#heartBeat').addClass('heartBeat')
            } 
            else if(drumMachine.beats.drum2[counter] === true) {
                snareSound.currentTime = 0;
                snareSound.play();
                $('#heartBeat').addClass('heartBeat')                
            } 
            else if(drumMachine.beats.drum3[counter] === true) {
                clapSound.currentTime = 0;
                clapSound.play();
                $('#heartBeat').addClass('heartBeat')                
            } 
            else if(drumMachine.beats.drum4[counter] === true) {
                hihatSound.currentTime = 0;
                hihatSound.play();
                $('#heartBeat').addClass('heartBeat')
            } 
            
            hop.addClass('marker');
            setTimeout(function() {
                hop.removeClass('marker');
                $('#heartBeat').removeClass('heartBeat');
            }, duration - 20);
            
            counter++;            
            if ( counter > beatHops.length -1) {
                counter = 0; 
            }   
        }, duration);
    };    
}

drumMachine.beatSelected = () => {
    
    $('input[type=checkbox]').on('change', function() { 
    let drumType = $(this).parents('ul.drumList').data('drum');
    let index = $(this).parents('li').index();
    
    $(this).next().toggleClass('beatSelected');

    // will listen for checkbox state - if checked will update drum array value to true - if it is false it will update false        
        if ($(this).is(':checked')) {
            drumMachine.beats[drumType][index] = true;
        } else {
            drumMachine.beats[drumType][index] = false;
        }   
    });
}

drumMachine.controls = () => {
    $('.play').on('click', function() {
        clearInterval(timer);
        playOnce = 0;
        drumMachine.startPlay();
        playOnce++
    });
    
    $('.stop').on('click', function() {
        $('.play').removeClass('btnActive');
        clearInterval(timer);
        counter = 0;
        playOnce = 0;
    });

    $('.reset').on('click', function() {
        location.reload(true);
    });
    
    $('.speed').on('change', function() {
        duration = $(this).val();
        if(playOnce === 1) {
            clearInterval(timer);
            playOnce = 0;
            drumMachine.startPlay();
            playOnce++;
        }
    });
}

drumMachine.soundEffect = () => {
    $('.airhorn').on('click', function (){
        airhorn.currentTime = 0;
        airhorn.play();
    })
}

drumMachine.init = () => {
    drumMachine.beatSelected();
    drumMachine.controls();
    drumMachine.soundEffect(); 
};

$(() => drumMachine.init());
