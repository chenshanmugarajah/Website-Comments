
// inputs
var part1 = "k12ww 7s49v ,?286?mv 27rq s33od4 6fh77k r4og2 hu+";
var part2 = "yd23 un394 hti58 j934+0 67htr9 8?173h t23r96 rj8s3 y73x";

//  clean the input
const cleanText = (input) => {
    var output;
    output = input.replace(/[0-9]/g, '');
    output = output.replaceAll(' ', '');
    output = output.replaceAll(',', ':');
    output = output.replaceAll('+', '.');
    output = output.replaceAll('?', '/');
    return output;
}

// decipher
const decipher = (input, shift) => {
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

// get data with REST
const gatherData = async (url) => {
    url = "https://jsonplaceholder.typicode.com/comments";
    const response = await fetch(url);
    return await response.json();
}

const displayData = async (url) => {
    var postsBox = document.querySelector('.posts');
    var postsComments = await gatherData(url);
    var posts = [];
    postsComments.forEach(comment => {
        if(!posts.includes(comment.postId)) { 
            posts.push(comment.postId);
            postsBox.innerHTML += `<div class= "post-${comment.postId}"><h2> This is post ${comment.postId}</h2><\div>`;
        };
        var postDiv = document.querySelector('.post-' + comment.postId);
        postDiv.innerHTML += `
            <h3> ${comment.name} by ${comment.email} </h3>
            <p> ${comment.body} </p>
        `;
    });
}

// get url
var url = decipher(part1, 3) + decipher(part2, 5);

displayData(url);

console.log(url);