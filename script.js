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


var posts = [];

// get data with REST
const getData = async (url) => {
    const response = await fetch(url);
    var postsComments = await response.json();

    postsComments.forEach(comment => {

        if (posts[comment.postId] == null) {
            posts.push({
                id: comment.postId,
                comments: [{
                    commentId: comment.id,
                    name: comment.name,
                    email: comment.email,
                    body: comment.body
                }]
            })
        } else {
            posts[comment.postId]['comments'].push({
                commentId: comment.id,
                name: comment.name,
                email: comment.email,
                body: comment.body
            })
        }  

    });

}

// display data in front end
const displayData = async (url) => {
    await getData(url);
    var postsSection = document.querySelector('.posts');

    posts.forEach(post => {
        postsSection.innerHTML += 
        `<div class="post" id="post-${post.id}">
            <h4> ${post.id} </h4>
            <h3> This is the title for post ${post.id} </h3>
            <button> OPEN </button>
        </div>`;
    })
}

// get url
var cleanPart1 = cleanText(part1);
var cleanPart2 = cleanText(part2);
var url = decipher(cleanPart1, 3) + decipher(cleanPart2, 5);

// display
displayData(url);