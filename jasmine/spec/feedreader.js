/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 * I followed https://jasmine.github.io/2.0/introduction.html (could not find an intro for 3.0) and https://jasmine.github.io/tutorials/async for additional information on Jasmine syntax. /
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */

    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('allFeeds variable has been defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
   
    


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('Feed URL are defined and not empty', function() {
            allFeeds.forEach(function (feed){
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe(0);                
            });
        });    
       
  


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('Feed NAME is defined and not empty', function() {
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe(0);                
            });
            
        
        }); 
    });

    


    /* TODO: Write a new test suite named "The menu" */

    
    describe('The menu', function() {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
      
      
        let myBody = document.body;
        /* I have changed "var" to "let" in app.js throughout the Udacity starter code (ES6!) */


      it('check if menu is hidden as default', function(){
            expect(myBody.classList.contains('menu-hidden')).toBeTruthy();
      });
    

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */


         it('toggle menu visibility on icon click', function() {
            let myMenu = document.querySelector('a.menu-icon-link')
            myMenu.click(); // show menu
            expect(myBody.classList.contains('menu-hidden')).toBeFalsy();
            myMenu.click();
            expect(myBody.classList.contains('menu-hidden')).toBeTruthy(); //hide menu 
         });
  
    });

    

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function(){

    /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

         beforeEach(function(done) {
            loadFeed(0, function() { // checks if function is active
              done();
            });
          });

          it('check if feed loaded an entry',function(done){ /* we check if there is at least one entry element in the feed container */
            let entry = document.querySelectorAll('.container .feed .entry').children;
            expect(entry).not.toBe(0);
            done();
        });
    
  
    });
  
    /*Since Jasmine 2.0, if the function passed to Jasmine took an argument (traditionally called done),
    * Jasmine will pass a function to be invoked when asynchronous work has been completed.*/
        
            
         /* TODO: Write a new test suite named "New Feed Selection" */

         describe('New Feed Selection', function(){
            let contentFeed = document.querySelector('.feed').innerHTML;
      
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
    /*Since Jasmine 2.1, the done function passed as a callback can also be used to fail the spec by using done.fail(), 
    *optionally passing a message or an Error object. */
                 
        beforeEach(function (done) {
            loadFeed(0, function(){
      
                loadFeed(1, function(){
                    done();
                });
            });
      
        });

     /*Jasmine supports 3 ways of managing asynchronous work: callbacks, Promises, and the async keyword. If Jasmine doesn’t detect one of these, it will assume that the works is synchronous and move on to the next thing in the queue 
     * as soon as the function returns. All of these mechanisms work for beforeEach, afterEach, beforeAll, afterAll, and it. */ 
      
    it("check if loaded content feed updated", function(done) {
      let newContentFeed = document.querySelector(".feed").innerHTML;
      expect(contentFeed).not.toBe(newContentFeed); // makes sure the new feed is incongruent with the previous feed
      done();

    });
});


}());

/* In my studies I came along the concept of `.not.toEqual(jasmine.objectContaining({url:''}));` which has not been discussed in the Udacity lessons.
 * This might also be a next learning step I would like to do. */
