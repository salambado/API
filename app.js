window.fbAsyncInit = function() {
    FB.init({
        appId: '1758384644965008', // ใส่ App ID ของคุณที่นี่
        cookie: true,
        xfbml: true,
        version: 'v10.0'
    });     
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// ฟังก์ชันสำหรับโพสต์ความคิดเห็น
function postComment() {
    var comment = document.getElementById('commentText').value;
    FB.api(
        '/me/feed',
        'POST',
        { message: comment },
        function(response) {
            if (response && !response.error) {
                alert('Comment posted successfully');
            } else {
                alert('Error occurred: ' + response.error.message);
            }
        }
    );
}

document.getElementById("commentForm").addEventListener("submit", function(event){
    event.preventDefault();
    FB.login(function(response) {
        if (response.authResponse) {
            postComment();
        } else {
            alert('User cancelled login or did not fully authorize.');
        }
    }, {scope: 'publish_actions'});
});