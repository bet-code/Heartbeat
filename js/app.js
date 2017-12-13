
drumMachine = {};
let timer;
let playOnce = 0;

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
        timer = setInterval(() => { 
            let  hop = $(beatHops[counter]);
            if (drumMachine.beats.drum1[counter] === true) {
                document.getElementById('kickSound').play();
                $('#heartBeat').addClass('heartBeat')
            } 
            else if(drumMachine.beats.drum2[counter] === true) {
                document.getElementById('snareSound').play();
                $('#heartBeat').addClass('heartBeat')                
            } 
            else if(drumMachine.beats.drum3[counter] === true) {
                document.getElementById('clapSound').play();
                $('#heartBeat').addClass('heartBeat')                
            } 
            else if(drumMachine.beats.drum4[counter] === true) {
                document.getElementById('hihatSound').play();
                $('#heartBeat').addClass('heartBeat')
            } 
            
            hop.addClass('marker');
            //remove the .marker class after .5 seconds it is added
            setTimeout(function() {
                hop.removeClass('marker');
                $('#heartBeat').removeClass('heartBeat');
            }, 200); 
            counter++;            
            if ( counter > beatHops.length -1) {
                counter = 0; 
            }   
        }, 250);
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
    $('.play').on('click', () => {
        drumMachine.startPlay();
        playOnce++
    });
    
    $('.stop').on('click', () => {
        clearInterval(timer);
        counter = 0;
        playOnce = 0;
    });

    $('.reset').on('click', () => {
        location.reload(true);
    })
}

drumMachine.init = () => {
    drumMachine.beatSelected();
    drumMachine.controls();    
};

$(() => drumMachine.init());
