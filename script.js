console.log('Gra');

function playAgain(){
	$('.end').hide();
}

function newChallenge(id){
	var base = ['l. parzysta', 'l. nieparzysta', 'l. pierwsza', 'kwadrat', 'sześcian', 'zero', 'potęga 2', 'silnia'];
	var tooltip = ['-2, 0, 2, 4', '-1, 1, 3, 5', '2, 3, 5, 7', '0, 1, 4, 9', '0, 1, 8, 27', '0', '0, 1, 2, 4, 8', '1, 2, 6, 24'];
	var output = Math.floor((Math.random() * base.length) + 0);
	$('#c'+id).text(base[output]);
	$('#c'+id).attr('tooltip', tooltip[output]);
	return base[output];
}

function newOperator(id, result){
	var base = ['+', '-', '*'];
	if (result < -10 || result === 0){ base[1] = '+'; }
	var output = base[Math.floor((Math.random() * base.length) + 0)];
	$('#o'+id).text(output);
	return output;
}

function newNumber(id){
	var output = Math.floor((Math.random() * 5) + 0);
	if (result > 100){ output = Math.floor((Math.random() * 2) + 0); }
	$('#n'+id).text(output);
	return output;
}

function even(number) {
	return number % 2 == 0;
}

function prime(number) {
	var base = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];
	var output;
	if (base.indexOf(number) === -1){
		output = false;
	}	else {output = true;}
   return output;
}

function square(number) {
	var base = [0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256, 289, 324, 361, 400, 441, 484, 529, 576, 625, 676, 729, 784, 841, 900, 961];
	var output;
	if (base.indexOf(number) === -1){
		output = false;
	}	else {output = true;}
   return output;
}

function cube(number) {
	var base = [0, 1, 8, 27, 64, 125, 216, 343, 512, 729, 1000];
	var output;
	if (base.indexOf(number) === -1){
		output = false;
	}	else {output = true;}
   return output;
}

function binary(number) {
	var base = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024];
	var output;
	if (base.indexOf(number) === -1){
		output = false;
	}	else {output = true;}
   return output;
}

function factorial(number){
	var base = [1, 2, 6, 24, 120, 720, 5040, 40320];
	var output;
	if (base.indexOf(number) === -1){
		output = false;
	}	else {output = true;}
	 return output;
}

$(document).ready(function(){
	(function play(){
	if ($('#endscore').text() === ''){
		$('.end').hide();
	}
	var highscore = Number (localStorage.getItem('highscore') || 0);
	$('#highscore').empty().append(highscore);
	var rounds = 7;
	$('#rounds').empty().append(rounds);
	var points = 0;
	$('#score').empty().append(points);
	var result = 0;
	$('#result').empty().append(result);

	var c = [], n = [], o = [], cb = [];
	c[0] = newChallenge(0);
	c[1] = newChallenge(1);
	c[2] = newChallenge(2);
	o[0] = newOperator(0, 0);
	o[1] = newOperator(1, 0);
	o[2] = newOperator(2, 0);
	n[0] = newNumber(0);
	n[1] = newNumber(1);
	n[2] = newNumber(2);

	function addOperator() {
		var id = this.id.replace('o', '');
		$('#operator > button').removeClass('selected')
		$(this).addClass('selected');
		$('#oper').empty().append(o[id]);
	}

	function addNumber() {
		var id = this.id.replace('n', '');
		$('#number > button').removeClass('selected')
		$(this).addClass('selected');
		$('#numb').empty().append(n[id]);
	}

	function challengeCount(name, pointsBase) {
		var output = [0,''];
		var challengelength = $('#challenges > div:contains('+name+')').length;
		if (challengelength !== 0){
			$('#challenges > div:contains('+name+')').each( function() {
				var id = $(this).attr('id').replace('c', '');
				cb[id] = 1;
			});
			output[0] = pointsBase*challengelength;
			if (challengelength > 1){
				output[1] = '<span>'+name+' (+'+pointsBase+' x'+challengelength+')</span>';
			} else {
				output[1] = '<span>'+name+' (+'+pointsBase+')</span>';
			}
		}
		return output;
	}

function makeMove() {
	if (rounds > 0){
	var result = $('#result').text();
	var oper = $('#oper').text();
	var numb = $('#numb').text();
	if ($('#oper').text() !== '' && $('#numb').text() !== '')
		{
			var output = 0, challenges = '';
			result = Number (result);
			numb = Number (numb);

			switch (oper) {
				case '+':
					output = (result+numb);
					break;
				case '-':
					output = (result-numb);
					break;
				case '*':
					output = (result*numb);
					break;
			}

			// Waga punktowa wyzwań ['parzysta', 'nieparzysta', 'pierwsza', 'kwadrat', 'szescian', 'potęga 2', 'silnia', 'zero'];
			var baseP = [3, 3, 6, 6, 6, 4, 4, 3]
			var challengetag ='';
			cb = [0, 0, 0];

			if ( even(output) ) {
				challengetag = challengeCount('l. parzysta', baseP[0]);
				points += challengetag[0];
				challenges += challengetag[1];
			}	else {
				challengetag = challengeCount('l. nieparzysta', baseP[1]);
				points += challengetag[0];
				challenges += challengetag[1];
			}

			if ( prime(output) ) {
				challengetag = challengeCount('l. pierwsza', baseP[2]);
				points += challengetag[0];
				challenges += challengetag[1];
			}

			if ( square(output) ) {
				challengetag = challengeCount('kwadrat', baseP[3]);
				points += challengetag[0];
				challenges += challengetag[1];
			}

			if ( cube(output) ) {
				challengetag = challengeCount('sześcian', baseP[4]);
				points += challengetag[0];
				challenges += challengetag[1];
			}

			if ( binary(output) ) {
				challengetag = challengeCount('potęga 2', baseP[5]);
				points += challengetag[0];
				challenges += challengetag[1];
			}

			if ( factorial(output) ) {
				challengetag = challengeCount('silnia', baseP[6]);
				points += challengetag[0];
				challenges += challengetag[1];
			}

			if (output === 0) {
				challengetag = challengeCount('zero', baseP[7]);
				points += challengetag[0];
				challenges += challengetag[1];
			}

			if (cb[0] === 1) {c[0] = newChallenge(0);}
			if (cb[1] === 1) {c[1] = newChallenge(1);}
			if (cb[2] === 1) {c[2] = newChallenge(2);}
			if (3 === (cb[0]+cb[1]+cb[2])) {
				points += 5;
				challenges += '<span class="combo">COMBO! (+5)</span>';
			}

			$('.log').find('p:last-child').remove().end().find('p:last-child').remove();
			$('.log').prepend('<p><strong>'+result+'</strong> '+oper+' '+numb+' = <strong>'+output+'</strong></p><p class="challenge">'+challenges+'</p>');
			$('#result').empty().append(output);
			$('#score').empty().append(points);
			if (points > highscore){
				$('#highscore').empty().append(points);
				localStorage.setItem('highscore', points);
			}
			rounds--;
			$('#rounds').empty().append(rounds);
			if (rounds === 0){
				$('#endscore').empty().append(points);
				$('.end').show();
				play();
			}


			$('#operator > button.selected').each( function() {
				var id = $(this).attr('id').replace('o', '');
				o[id] = newOperator(id, result);
				$(this).removeClass('selected');
				$('#oper').empty();
			});

			$('#number > button.selected').each( function() {
				var id = $(this).attr('id').replace('n', '');
				n[id] = newNumber(id);
				$(this).removeClass('selected');
				$('#numb').empty();
			});
		}
		}
	}

  /* Wybór działania */
  $('#operator > button').click(addOperator);
	$('#number > button').click(addNumber);
	$('#confirm').click(makeMove);
	$('#again').click(playAgain);
	})();
});
