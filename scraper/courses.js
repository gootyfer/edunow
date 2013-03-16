var nodeio = require('node.io');
var service_edx = "https://www.edx.org";
var methods = {
    input: false,
    run: function() {
    	this.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.56 Safari/537.17');
    	this.setHeader('Cookie', 'AWSELB=39F95FB7021EA33CF55B6DD002383D35A3615C24FE240D89537BBFA8CBDCF10CF1F07BE7E6CF89A50712E3ED592C85F004E69553F0717BB266A03A334BC670A0D60F098317; video_speed=1.0; hide_captions=true; sessionid=0e5d7caa0717261b82fe8aac7bc2d188; csrftoken=6PJPS9c8AzAXnLBnPF4twMpkihVtZAjZ; __utma=201676869.1807490548.1358768758.1361437051.1363436036.9; __utmb=201676869.6.10.1363436036; __utmc=201676869; __utmz=201676869.1358768758.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)');
        this.getHtml(service_edx+'/dashboard', function(err, $) {

            //Handle any request / parsing errors
            if (err) this.exit(err);

            var courses = [];
            //console.log($('body').fulltext);
	    	$('.my-course').each(function() {
		    	var course = {};
		    	//console.log("patata");
		    	//console.log(jQuery(this).text().trim()+'\n');
		    	course.img = $(this).find('.cover > img').attr('src');
		    	console.log("img:"+course.img);
		    	var date_info = $(this).find('.date-block').text;
		    	console.log("date_info:"+date_info);
		    	
		    	course.status = date_info.split("-")[0].trim();
		    	course.date = date_info.split("-")[1].trim();
		    	console.log("status:"+course.status);
		    	console.log("date:"+course.date);

		    	course.link = $(this).find('h3 > a').attr('href');
		    	console.log("link:"+course.link);
		    	course.name = $(this).find('h3 > a').text;
		    	console.log("course:"+course.name);
		    	console.log("\n");
		        //console.log("my course is "+course+" date is "+date_info+" and link is "+link);
		        courses.push(course);

		    });

            // var titles = [], scores = [], output = [];

            // //Select all titles on the page
            // $('div#siteTable a.title').each(function(a) {
            //     titles.push(a.text); 
            // });

            // //Select all scores on the page
            // $('div#siteTable div.score.unvoted').each(function(div) {
            //     scores.push(div.rawtext); //rawtext doesn't decode entities or trim the text
            // });

            // //Mismatch? page probably didn't load properly
            // if (scores.length != titles.length) {
            //     this.exit('Title / score mismatch');
            // }

            // for (var i = 0, len = scores.length; i < len; i++) {
            //     //Ignore upcoming stories
            //     if (scores[i] == '&bull;') continue;

            //     //Check the data is ok
            //     this.assert(scores[i]).isInt();

            //     //Output = [score] title
            //     output.push('['+scores[i]+'] '+titles[i]);
            // }

            this.emit(courses);
        });
    }
}

exports.job = new nodeio.Job({timeout:10}, methods);