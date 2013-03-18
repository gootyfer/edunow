var phantom = require('phantom');
var service = "https://www.coursera.org";

phantom.create(function(ph) {
  return ph.createPage(function(page) {
    return page.open(service+'/courses', function(status) {
      console.log("opened site? ", status);         
            page.onConsoleMessage = function (msg) {
                console.log("console!!:"+msg);
            };
            page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function() {
                //jQuery Loaded.
                //Wait for a bit for AJAX content to load on the page. Here, we are waiting 5 seconds.
                page.scrollPosition = { top: 100000, left: 0 };
                setTimeout(function() {
                    return page.evaluate(function() {
                        //console.log("hey:"+document.title);
                        //console.log($('body').html());
                        var service = "https://www.coursera.org";
                        var courses = [];
                        $('.coursera-catalog-course-listing-box').each(function() {
                            var course = {};
                            course.img = $(this).find('.coursera-catalog-listing-thumbnail').attr('src');
                            var link = $(this).find('.coursera-catalog-listing-courselink');
                            course.name = link.text().trim();
                            course.link = service + link.attr('href');
                            course.provider = 'coursera';
                            course.university = $(this).find('.coursera-catalog-listing-university').text().trim();
                            course.instructor = $(this).find('.coursera-catalog-listing-instructor > span').text().trim();

                            course.date = $(this).find('.coursera-catalog-listing-secondary-item:first').text().trim();
                            course.duration = $(this).find('.coursera-catalog-listing-secondary-item:nth-of-type(2)').text().trim();
                            //course.date = date_duration[0].text().trim();
                            //course.duration = date_duration[1].text().trim();

                            courses.push(course);
                        });
                        return courses;
                        
                    }, function(result) {
                        //TODO: add service to the urls (img,link)
                        console.log(result);
                        console.log(result.length+" courses scraped");
                        ph.exit();
                    });
                }, 5000);
 
            });
    });
  });
});