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

var posts = [{}];

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

    for(var i=1; i<posts.length; i++) {
        var post = posts[i];
        postsSection.innerHTML += 
        `<div class="post" id="post-${post.id}">
            <h3 class="post-title"> Post Number ${post.id} </h3>
            <button class="post-button" id="${post.id}"> OPEN </button>
        </div>`;
    }
}

var modal = document.getElementById("postModal");
var span = document.getElementsByClassName("close")[0];

document.addEventListener('click', function(e) {
    if(e.target && e.target.className == 'post-button') {
        var id = e.target.id;
        posts[id]['comments'].forEach(comment => {
            document.getElementById("emails-list").innerHTML += `<p> ${comment.email} </p>`;
        })
        modal.style.display = "block"
    }
})

span.onclick = function() {
    modal.style.display = "none";
    document.getElementById("emails-list").innerHTML = "";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById("emails-list").innerHTML = "";
    }
}

// get url
var cleanPart1 = cleanText(part1);
var cleanPart2 = cleanText(part2);
var url = decipher(cleanPart1, 3) + decipher(cleanPart2, 5);

// display
displayData(url);