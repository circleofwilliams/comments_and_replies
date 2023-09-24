This is an api project to try and imitate a comment and reply usecase.

It is assumed that the comments will be stored in a different collection from the post collection, the replies for each comment is then added on the comment document as a list of array.

each comments has a key that links to the post it belongs to, as a post can have more comment than a comment can have a reply thus this method of implementation was used.