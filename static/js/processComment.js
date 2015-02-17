// Wait until all of the HTML and CSS is loaded on the page, before executing this JavaScript code
$(document).ready(function() {

    function get_csrf_token(){
        return $("input[name='csrfmiddlewaretoken']").val();
    }
    // Listen to when a user clicks on the 'Post' button to submit a comment
    $('#comments .comment-form button').on('click', function(eve) {

        var author  = $("#comments input").val(),          // Grab the author's name from the input form
        comment = $("#comments textarea").val(),       // Grab the comment that the author wrote
            data = {author: author, text: comment};    // Store author's name and the comment in a JavaScript object
           

        /*
         * Send a Post request via Ajax so that the page doesn't need to refresh,
         * and send that data as a JSON object to the python script. The python
         * script will process that data and store it in a database.
         */
        $.ajax({
            type: "POST",                                  // Make Post requst
            url: "/upload_comment/",        // Send Post request to the django.py script
            data: data,                    // Convert the data in the JavaScript object into a JSON object, before sending 
            //dataType: "json",                              // Set Post request header 'dataType' to json 
            success: function(data) {                      // If request is successful, do something the data from the response
            }
        });


        // Create a HTML li element, with the class set to 'comment-item'
        var commentItem = $('<li class="comment-item" />');  

        /*
         * Create a HTML p element with class 'author' and append it to the comment-item.
         * Find that p element, and append the author's name inside of it.
        */ 
        commentItem.append('<p class="author">').find('.author').append(author); 

        /*
         * Create a HTML p element with class 'comment' and append it to the comment-item.
         * Find that p element, and append the author's comment inside of it.
        */  
        commentItem.append('<p class="comment">').find('.comment').append(comment);

        // Prepend the entire comment item to the list of comments.
        $('.comment-list').prepend(commentItem);

    });
    
});