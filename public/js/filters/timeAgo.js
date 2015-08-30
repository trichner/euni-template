app.filter('timeAgo', function() {
    function parse(input) {
        if (input instanceof Date){
            return input;
        } else if (angular.isNumber(input)) {
            return new Date(input);
        } else if (/^\d+$/.test(input)) {
            return new Date(parseInt(input, 10));
        } else {
            var s = (input || '').trim();
            s = s.replace(/\.\d+/, ''); // remove milliseconds
            s = s.replace(/-/, '/').replace(/-/, '/');
            s = s.replace(/T/, ' ').replace(/Z/, ' UTC');
            s = s.replace(/([\+\-]\d\d)\:?(\d\d)/, ' $1$2'); // -04:00 -> -0400
            return new Date(s);
        }
    }

    function timeNow(){
        return Date.now();
    }

    function assembleWords(num,unit,postfix){
        var floored = Math.floor(num);
        unit = floored > 1 ? unit + 's' : unit;
        return '' + floored + ' ' + unit + ' ' + postfix;
    }

    function inWords(diff){
        var inMinutes = diff/(1000.0*60);
        var inHours   = inMinutes/60;
        var inDays   = inHours/24;
        var inWeeks  = inDays/7;
        var inMonths = inDays/30;
        var inYears  = inDays/365;

        var words;
        if(inYears>=1){
            words = assembleWords(inYears,'year','ago')
        }else if(inMonths>=1){
            words = assembleWords(inMonths,'month','ago')
        }else if(inWeeks>=1){
            words = assembleWords(inWeeks,'week','ago')
        }else if(inDays>=1){
            words = assembleWords(inDays,'day','ago')
        }else if(inHours>=1){
            words = 'hours ago';
        }else{
            words = 'moments ago';
        }
        return words;
    }

    return function(input) {
        input = input || '';
        var diff = timeNow() - parse(input).getTime();
        return inWords(diff);
    };
});