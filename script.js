// inputs
var part1 = "k12ww 7s49v ,?286?mv 27rq s33od4 6fh77k r4og2 hu+";
var part2 = "yd23 un394 hti58 j934+0 67htr9 8?173h t23r96 rj8s3 y73x";

//  clean the input
const cleanText = (input) => {
    var output = "";
    output = input.replace(/[0-9]/g, '');
    output = output.replaceAll(' ', '');
    output = output.replaceAll(',', ':');
    output = output.replaceAll('+', '.');
    output = output.replaceAll('?', '/');
    return output;
}

// decipher
const decipher = (input, shift) => {
    var output = "";
    var charCode;
    for (var i=0; i < input.length; i++) {
        if ((/[a-zA-Z]/).test(input[i])) {
            charCode = (input[i].charCodeAt()) - shift;
            if (charCode < 97) {
                charCode += 26;
            }
            var letter = String.fromCharCode(charCode);
            output += letter;
        } else {
            output += input[i];
        }
    }
    return output;
}

// get data with REST
const getData = async (url) => {
    const response = await fetch(url);
    return await response.json();
}

// display data in front end
const displayData = async (url) => {
    var postsBox = document.querySelector('.posts');
    var postsComments = await getData(url);
    var posts = [];

    postsComments.forEach(comment => {
        if(!posts.includes(comment.postId)) { 
            posts.push(comment.postId);
            postsBox.innerHTML += `<div class= "post-${comment.postId}"><h2> This is post ${comment.postId}</h2><\div>`;
        };

        var postDiv = document.querySelector('.post-' + comment.postId);
        postDiv.innerHTML += `<h4>${comment.email}</h4>`;

        console.log(comment.email);
    });
}

// get url
var cleanPart1 = cleanText(part1);
var cleanPart2 = cleanText(part2);
var url = decipher(cleanPart1, 3) + decipher(cleanPart2, 5);

// display
displayData(url);