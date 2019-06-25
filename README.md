# Scrape-Tastic Site
___

For this project, we were tasked with using our new found skills of scraping a web page (in a very minimal and nice way), and then giving the user the ability to see the scraped article headlines, click to add and edit comments, and then saving both the links and comments to a Mongo database.  The inclusions and required packages used in this project were Express JS, Express Handlebars, MongooseDB, Cheerio and Axios.  Also used were JavaScript, jQuery and HTML to bring the page together on the front end.

When the user loads the site, the first page they are brought to is a basic index page with no articles, links or comments.  Then when the user navigates to the site address'/scrape', that will initialize the scrape from a coding/humor site "www.codinghorror.com".  Moving back to the index page, the user will see the articles from the site, and then have the option to follow the link to the article, add a comment that will be saved to the link and the database, and then be able to update or delete the saved comment.  All of these, articles and comments, are saved to a database that was accessed with Robo3T DB as well.
___
![scrape-tastic-after-scrape](assets/img/scrape-tastic-after-scrape.jpg)
___
![scrape-tastic-add-edit-comment](assets/img/scrape-tastic-add-edit-comment.jpg)
___

The bugs encountered during this project were mainly with the hosting on heroku, and adding mongoLab to the hosted heroku site so it can be hosted and linked to the database properly.  Going through the homework instructions and chatting with Bryan I was able to add the correct code to the server.js file, and adding an 'or' statement for the DB hosting allowed the site to work publicly and also locally if necessary.  The other bugs that I came across during the project was deleting the comments after posted, but was able to get the comments removed after looking back at past completed exercises.  Otherwise, the site is able to function properly to scrape headlines and links from the outside page, render them on the index page, and give the user the ability to add, edit and remove comments.  Screenshots below will also show the 'headlines' and 'comments' route of where they are saved.
___
![scrape-tastic-headlines](assets/img/scrape-tastic-headlines.jpg)
___
![scrape-tastic-comments](assets/img/scrape-tastic-comments.jpg)

___

Update for Heroku deployment issues:

After class and reading updated instructions for the project to be successfully deployed to heroku, below were the changes found:

-- Needed to install the 'dotenv' package, and require it in the server.js file.

-- Had to update the mongoose.connect code in the server.js file.

-- Also, in the command prompt, the heroku addons:create mongoLab, as well as the heroku config:get MONGODB_URI had to be ran and created.  The mongoLab URL link was already provided last night after speaking with Bryan, and that was inserted into the .env file after the mongoLab addon was installed.  However, the config:get still needed to be ran.  Screenshots will be provided below of the deployed link, and the hosted link will be resubmitted.
___
![scrape-tastic-heroku-link](assets/img/scrape-tastic-heroku-link.jpg)
