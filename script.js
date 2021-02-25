
// inputs
var part1 = "k12ww 7s49v ,?286?mv 27rq s33od4 6fh77k r4og2 hu+";
var part2 = "yd23 un394 hti58 j934+0 67htr9 8?173h t23r96 rj8s3 y73x";

console.log(decipher(part1, 3) + decipher(part2, 5));

//  clean the input
function cleanText (input) {
    var output;
    output = input.replace(/[0-9]/g, '');
    output = output.replaceAll(' ', '');
    output = output.replaceAll(',', ':');
    output = output.replaceAll('+', '.');
    output = output.replaceAll('?', '/');
    return output;
}

// decipher
function decipher (input, shift) {
    input = cleanText(input);
    var output = "";
    var charCode;
    for (var i=0; i < input.length; i++) {
        if ((/[a-zA-Z]/).test(input[i])) {
            charCode = (input[i].charCodeAt()) - shift;
            output += String.fromCharCode(charCode);
        } else {
            output += input[i];
        }
    }
    return output;
}

// 