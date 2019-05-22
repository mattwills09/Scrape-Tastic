# Scrape-tastic

For this project, we were tasked with using our new found skills of scraping a web page, giving the ability for the user to see the headlines, add and edit comments, and then the links and comments be saved to a mongo database.  The inclusions and required packages used in this project were express, express handlebars, mongoose, cheerio and axios.  Also used were javascript, jquery and html to bring the page together.

When the user loads the site, the first page they are brought to is an index page with no articles, links or comments.  Then moving to the url/scrape page will initialize the scrape from a coding site "codinghorror.com".  Moving back to the index page, the user has the option to follow the link to the article, also add a comment that will be saved to the link, and then be able to update or delete the comment.  Both the articles and comments are saved to a Robo database as well.

![scrape-tastic-after-scrape](assets/img/scrape-tastic-after-scrape.jpg)

![scrape-tastic-add-edit-comment](assets/img/scrape-tastic-add-edit-comment.jpg)

The bugs encountered during this project were mainly with the hosting on heroku, also adding mongoLab so it can be hosted properly.  Going through the homework instructions and chatting with Bryan I was able to add the correct code to the server.js file, but the hosting still would not run properly.  I will have to talk to Bryan or someone tomorrow morning to see if this can be fixed.  The other bugs that I came across during the project was deleting the comments after posted, but was able to get the comments removed after looking back at past exercises.  Otherwise, the site is able to function properly to scrape headlines and links from the outside page, render them on the index page, and give the user the ability to add, edit and remove comments.  Screenshots below will also show the 'headlines' and 'comments' route of where they are saved.

![scrape-tastic-headlines](assets/img/scrape-tastic-headlines.jpg)

![scrape-tastic-comments](assets/img/scrape-tastic-comments.jpg)

