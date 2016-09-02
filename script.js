console.log('Gra');

function playAgain(){
	$('.end').hide();
}

function newBonus(id){
	var base = ['l. parzysta', 'l. nieparzysta', 'l. pierwsza', 'kwadrat', 'sześcian', 'zero', 'potęga 2'];
	var output = base[Math.floor((Math.random() * base.length) + 0)];
	$('#b'+id).text(output);
	return output;
}

function newOperator(id, result){
	var base = ['+', '-', '*'];
	if (result > 100){ base[2] = '-'; }
	var output = base[Math.floor((Math.random() * base.length) + 0)];
	$('#o'+id).text(output);
	return output;
}

function newNumber(id){
	var output = Math.floor((Math.random() * 5) + 1);
	$('#n'+id).text(output);
	return output;
}

function even(number) {
	return number % 2 == 0;
}

function odd(number) {
	return Math.abs(number % 2) == 1;
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
	var base = [1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256, 289, 324, 361, 400, 441, 484, 529, 576, 625, 676, 729, 784, 841, 900, 961];
	var output;
	if (base.indexOf(number) === -1){
		output = false;
	}	else {output = true;}
   return output;
}

function cube(number) {
	var base = [1, 8, 27, 64, 125, 216, 343, 512, 729, 1000];
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

	b = [], n = [], o = [];
	b[0] = newBonus(0);
	b[1] = newBonus(1);
	b[2] = newBonus(2);
	o[0] = newOperator(0, 0);
	o[1] = newOperator(1, 0);
	o[2] = newOperator(2, 0);
	n[0] = newNumber(0);
	n[1] = newNumber(1);
	n[2] = newNumber(2);

	function addOperator() {
		var id = this.id.replace('o', '');
		$('#operator > div').removeClass('selected')
		$(this).addClass('selected');
		$('#oper').empty().append(o[id]);
	}

	function addNumber() {
		var id = this.id.replace('n', '');
		$('#number > div').removeClass('selected')
		$(this).addClass('selected');
		$('#numb').empty().append(n[id]);
	}

	function bonusCount(name, pointsBase) {
		var output = [0,''];
		var bonuslength = $('#bonuses > div:contains('+name+')').length;
		if (bonuslength !== 0){
			$('#bonuses > div:contains('+name+')').each( function() {
				var id = $(this).attr('id').replace('b', '');
				b[id] = newBonus(id);
			});
			output[0] = pointsBase*bonuslength;
			output[1] = ' '+name;
		}
		return output;
	}

function makeMove() {
	if (rounds > 0){
	var result = $('#result').text();
	var oper = $('#oper').text();
	var numb = $('#numb').text();
	if ($('#oper').text() !== '?' && $('#numb').text() !== '?')
		{
			var output = 0, bonuses = '';
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

			// Waga punktowa bonusów ['parzysta', 'nieparzysta', 'pierwsza', 'kwadrat', 'szescian', 'potęga 2', 'zero'];
			var baseP = [3, 3, 6, 6, 6, 4, 3]
			var bonustag ='';

			if ( even(output) ) {
				bonustag = bonusCount('l. parzysta', baseP[0]);
				points += bonustag[0];
				bonuses += bonustag[1];
			}	else if ( odd(output) ) {
				bonustag = bonusCount('l. nieparzysta', baseP[1]);
				points += bonustag[0];
				bonuses += bonustag[1];
			}

			if ( prime(output) ) {
				bonustag = bonusCount('l. pierwsza', baseP[2]);
				points += bonustag[0];
				bonuses += bonustag[1];
			}

			if ( square(output) ) {
				bonustag = bonusCount('kwadrat', baseP[3]);
				points += bonustag[0];
				bonuses += bonustag[1];
			}

			if ( cube(output) ) {
				bonustag = bonusCount('sześcian', baseP[4]);
				points += bonustag[0];
				bonuses += bonustag[1];
			}
			if ( binary(output) ) {
				bonustag = bonusCount('potęga 2', baseP[5]);
				points += bonustag[0];
				bonuses += bonustag[1];
			}

			if (output === 0){
				bonustag = bonusCount('zero', baseP[6]);
				points += bonustag[0];
				bonuses += bonustag[1];
			}

			$('.head > p:first-child').remove();
			$('.head > div').before('<p><strong>'+result+'</strong> '+oper+' '+numb+' = <strong>'+output+'</strong><span class="bonus">'+bonuses+'</span></p>');
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


			$('#operator > div.selected').each( function() {
				var id = $(this).attr('id').replace('o', '');
				o[id] = newOperator(id, result);
				$(this).removeClass('selected');
				$('#oper').empty().append('?');
			});

			$('#number > div.selected').each( function() {
				var id = $(this).attr('id').replace('n', '');
				n[id] = newNumber(id);
				$(this).removeClass('selected');
				$('#numb').empty().append('?');
			});
		}
		}
	}

  /* Wybór działania */
  $('#operator > div').click(addOperator);
	$('#number > div').click(addNumber);
	$('#confirm').click(makeMove);
	$('#again').click(playAgain);
	})();
});
