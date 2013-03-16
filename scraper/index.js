var scraper = require('scraper');
var service_edx = "https://www.edx.org";


scrapService(service_edx);

//scrapCourseDates(service_edx, '/courses/BerkeleyX/CS169.2x/2013_Spring/info', 'edx');

function scrapService(service, callback){
	scraper(
		{
	       'uri': service+'/dashboard'
	           , 'headers': {
	               'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.56 Safari/537.17'
	               ,'Cookie': 'AWSELB=39F95FB7021EA33CF55B6DD002383D35A3615C24FE240D89537BBFA8CBDCF10CF1F07BE7E6CF89A50712E3ED592C85F004E69553F0717BB266A03A334BC670A0D60F098317; video_speed=1.0; hide_captions=true; sessionid=0e5d7caa0717261b82fe8aac7bc2d188; csrftoken=6PJPS9c8AzAXnLBnPF4twMpkihVtZAjZ; __utma=201676869.1807490548.1358768758.1361437051.1363436036.9; __utmb=201676869.6.10.1363436036; __utmc=201676869; __utmz=201676869.1358768758.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)'
	           }
	    }

		, function(err, jQuery) {
	    if (err) {throw err}
	    	//console.log(jQuery("body").html());
	    var courses = [];
	    jQuery('.my-course').each(function() {
	    	var course = {};
	    	//console.log("patata");
	    	//console.log(jQuery(this).text().trim()+'\n');
	    	course.img = jQuery(this).find('.cover > img').attr('src');
	    	//console.log("img:"+course.img);
	    	var date_info = jQuery(this).find('.date-block').text().trim();
	    	
	    	course.status = date_info.split("-")[0].trim();
	    	course.date = date_info.split("-")[1].trim();

	    	//console.log("status:"+course.status);
	    	//console.log("date:"+course.date);

	    	course.link = jQuery(this).find('h3 > a').attr('href');
	    	//console.log("link:"+course.link);
	    	course.name = jQuery(this).find('h3 > a').text().trim();
	    	//console.log("course:"+course.name);
	    	console.log("\n");
	        //console.log("my course is "+course+" date is "+date_info+" and link is "+link);
	        courses.push(course);
	        console.log(course);

	    });
		scrapCourses(service, courses, callback);
	});
}

function scrapCourses(service, courses, callback){
	var allTasks = [];
	var currentCourses = 0;
	var scrapedCourses = 0;
	courses.forEach(function(course){
		if(course.status == "Course Started"){
			currentCourses++;
        	console.log("course started: "+course.name);
        	//currentCourses.push(course);
        	scrapCourseDates(service, course, allTasks, function(){

        	});
        }
	});
}

function scrapCourseDates(service, course, tasks, callback){
	console.log('service:'+service+', url:'+url+', name:'+course.name);
	var url = course.link;
	var url2 = url.substr(0, url.lastIndexOf('/')+1);
	console.log('url2:'+url2);

	var courseDate = new Date(course.date);

	var request = require('request'),
    jsdom = require('jsdom');

	request({ 
		'uri': service+url2+'progress',
		'headers': {
	               'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.56 Safari/537.17'
	               ,'Cookie': 'AWSELB=39F95FB7021EA33CF55B6DD002383D35A3615C24FE240D89537BBFA8CBDCF10CF1F07BE7E6CF89A50712E3ED592C85F004E69553F0717BB266A03A334BC670A0D60F098317; video_speed=1.0; hide_captions=true; sessionid=0e5d7caa0717261b82fe8aac7bc2d188; csrftoken=6PJPS9c8AzAXnLBnPF4twMpkihVtZAjZ; __utma=201676869.1807490548.1358768758.1361437051.1363436036.9; __utmb=201676869.6.10.1363436036; __utmc=201676869; __utmz=201676869.1358768758.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)'
	           }

	 }, function (error, response, body) {
	 	//if(error) console.log(error);
	  if (error && response.statusCode !== 200) {
	    console.log('Error when contacting google.com')
	  }
	  
	  jsdom.env({
	    html: body,
	    scripts: [
	      'http://code.jquery.com/jquery-1.5.min.js'
	    ]
	  }, function (err, window) {
	    var $ = window.jQuery;
	    //var tasks = [];
	    var week = 1;
	    $('.chapters > li').each(function(){
	    	$(this).find('.sections > li').each(function(){
	    		var task = {};
	    		var task_link = $(this).find('h3 >a');
	    		task.task = task_link.text().trim();
	    		task.link = service + task_link.attr('href')
	    		task.deadline = $(this).find('p').text().trim();
	    		task.course = course.name;
	    		task.provider = 'edx';
	    		task.type = 'assignment';
	    		if(task.task.indexOf('Lecture')!=-1){
	    			task.type = 'lecture';
	    		}else if(task.task.indexOf('Homework')!=-1){
					task.type = 'homework';
	    		}
	    		if(task.deadline && task.deadline.split('due')[1]){
	    			task.deadline = task.deadline.split('due')[1].trim();
	    		}else{
	    			task.deadline = new Date();
	    			task.deadline.setTime(courseDate.getTime()+7*24*60*60*1000*week);
	    			task.deadline = task.deadline.toDateString();
	    			//task.deadline = 'week '+week;
	    		}
	    		
	    		tasks.push(task);
	    		console.log(task);
	    	});
	    	week++;
	    });
	    callback();
	    // jQuery is now loaded on the jsdom window created from 'agent.body'
	    //console.log($('body').html());
	 //    $('.due_dates > li').each(function() {
		// 	var ass = $(this).find('.assignment').text().trim();
		// 	console.log("ass:"+ass);
		// 	var due = $(this).find('.due_date').text().trim();
		// 	console.log("due:"+due);
		// });

	  });
	});

	
}





// var request = require("request");

// request({

//   uri: "https://www.coursera.org",

// }, function(error, response, body) {

//   console.log(body);

// });
