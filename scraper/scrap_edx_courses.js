var scraper = require('scraper');
var service_edx = "https://www.edx.org";
//var service_coursera = "https://www.coursera.org";

scrapService(service_edx);

function scrapService(service){
	scraper(
		{
	       'uri': service+'/courses'
	           , 'headers': {
	               'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.56 Safari/537.17'
	           }
	    }

		, function(err, $) {
	    if (err) {throw err}
	    //console.log($("body").html());
	    var courses = [];
	    $('.courses-listing-item').each(function() {
	    	var course = {};
	    	course.img = service + $(this).find('.cover-image > img').attr('src');
	    	course.date = $(this).find('.start-date').text().trim();
	    	course.link = service + $(this).find('.course > a').attr('href');
	    	course.name = $(this).find('.course-preview > hgroup > h2').text().trim();
	    	course.desc = $(this).find('.desc > p').text().trim();
	    	course.university = $(this).find('.university:first').text().trim();
	    	course.provider = 'edx';
	        courses.push(course);
	    });
		console.log(courses);
		console.log(courses.length+" courses scraped");
	});
}
var coursera_data_url = "https://www.coursera.org/maestro/api/topic/list2";
/*
unis, array con
{
  "home_link": "http:\/\/online.stanford.edu\/",
  "favicon": "https:\/\/coursera-university-assets.s3.amazonaws.com\/dc\/581cda352d067023dcdcc0d9efd36e\/favicon-stanford.ico",
  "id": 1,
  "short_name": "stanford",
  "name": "Stanford University"
}

topics es un objeto, con atributos
"2": {
  "insts": [
    1244
  ],
  "short_name": "ml",
  "language": "en",
  "self_service_course_id": null,
  "small_icon_hover": "https:\/\/s3.amazonaws.com\/coursera\/topics\/ml\/small-icon.hover.png",
  "order_idx": 0,
  "cats": [
    16,
    17
  ],
  "unis": [
    1
  ],
  "id": 2,
  "name": "Machine Learning"
}

cats: array de //categories
{
  "id": 25,
  "short_name": "energy",
  "name": "Energy & Earth Sciences"
}
 insts: instructores, array con objetos
 {
  "first_name": "Daphne",
  "last_name": "Koller",
  "middle_name": "",
  "short_name": null,
  "profile_id": 223,
  "id": 1257
},

courses: array again
{
  "start_month": 4,
  "status": 0,
  "start_year": 2012,
  "signature_track_open_time": null,
  "start_day": 23,
  "duration_string": "10 weeks",
  "topic_id": 2,
  "signature_track_close_time": null,
  "eligible_for_signature_track": false,
  "id": 16
}


*/
// function scrapCoursera(service){
// 	scraper(
// 		{
// 	       'uri': service+'/courses'
// 	           , 'headers': {
// 	               'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.56 Safari/537.17'
// 	           }
// 	    }

// 		, function(err, $) {
// 	    if (err) {throw err}
// 	    console.log($("body").html());
// 	    var courses = [];
// 	    $('.coursera-catalog-course-listing-box"').each(function() {
// 	    	var course = {};
// 	    	// course.img = service + $(this).find('.cover-image > img').attr('src');
// 	    	// course.date = $(this).find('.start-date').text().trim();
// 	    	// course.link = service + $(this).find('.course > a').attr('href');
// 	    	// course.name = $(this).find('.course-preview > hgroup > h2').text().trim();
// 	    	// course.desc = $(this).find('.desc > p').text().trim();
// 	    	// course.provider = 'edx';
// 	        courses.push(course);
// 	    });
// 		console.log(courses);
// 	});
// } 