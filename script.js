console.log("hey!");

// inputs
var part1 = "k12ww 7s49v ,?286?mv 27rq s33od4 6fh77k r4og2 hu+";
var part2 = "yd23 un394 hti58 j934+0 67htr9 8?173h t23r96 rj8s3 y73x";

cleanText(part1);

//  clean the input
function cleanText (input) {
    var output;

    output = input.replace(/[\s\d]/, '');

    console.log(output);
}