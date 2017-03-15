//file = "./Industrial Marketing Management/paper2.pdf";
//file = "./Industrial Marketing Management/paper1.pdf";
//file="./physics/paper1.pdf";
//file="./pediatrics/paper1.pdf";
//file="./chemical physics/paper1.pdf";
//file="./frontiers/paper1.pdf";
//file="./ieee/paper21.pdf";
file="./qualitative/paper1.pdf";


var index=0;
var abstractcount;
//var  files = ['./Industrial Marketing Management/paper3.pdf','./Industrial Marketing Management/paper5.pdf','./Industrial Marketing Management/paper4.pdf','./Industrial Marketing Management/paper1.pdf','./Industrial Marketing Management/paper2.pdf'];
//var  files = ['./chemical physics/paper2.pdf','./chemical physics/paper3.pdf','./chemical physics/paper4.pdf','./chemical physics/paper5.pdf','./chemical physics/paper6.pdf','./chemical physics/paper7.pdf','./chemical physics/paper1.pdf',];
//var  files = ['./frontiers/paper7.pdf','./frontiers/paper1.pdf','./frontiers/paper3.pdf','./frontiers/paper4.pdf','./frontiers/paper5.pdf','./frontiers/paper6.pdf','./frontiers/paper2.pdf'];
 //var  files = ['./ieee/paper31.pdf','./ieee/paper71.pdf','./ieee/paper51.pdf','./ieee/paper61.pdf','./ieee/paper21.pdf','./ieee/paper41.pdf'];
  // var  files = ['./ieee/paper1.pdf'];

   // var  files = ['./pediatrics/paper2.pdf','./pediatrics/paper3.pdf','./pediatrics/paper4.pdf','./pediatrics/paper5.pdf','./pediatrics/paper6.pdf','./pediatrics/paper7.pdf','./pediatrics/paper1.pdf'];
    //   var  files = ['./physics/paper2.pdf','./physics/paper3.pdf','./physics/paper4.pdf','./physics/paper5.pdf','./physics/paper6.pdf','./physics/paper7.pdf','./physics/paper1.pdf'];
      var  files = ['./qualitative/paper2.pdf','./qualitative/paper3.pdf','./qualitative/paper4.pdf','./qualitative/paper1.pdf','./qualitative/paper5.pdf'];


$(function() {

    function updateResult(data,obj) {
        $('#noOfPages').html(noOfPages);
        $('#titleText').html(data.str);
        $('#titleFont').html(data.fontSize);
       // $('#titleLength').html(data.str.split(' ').length);
        $('#titleLength').html(data.str.length > 0 ? data.str.split(' ').length : 0); 
      //  console.log(data.str.length);
      /*  if(data.str.length>0)
        {
            titlelength=data.str.split(' ').length;
            console.log(titlelength);
           // ('#titlelength').html(titlelength);
        }*/
     //   $('#titlelength').html(titlelength);
        $('#abstract').html(data.abstract);
     //   $('#abstract-length').html(data.abstractLength);
          $('#abstract-length').html(data.abstract.length > 0 ? data.abstract.split(' ').length : 0);
        if(limit < data.abstractLength) {
            $('#abstract-length-warning').html('Abstract length should not exceed given limit '+ limit);
        } else {
            $('#abstract-length-warning').html('Abstract length should not be longer than:'+max_val);
        }
      
         if(data.abstractLength==0) {
            $('#abstract-length-warning').html('no abstract');
        } 
        
     if(data.abstractLength>limit){
                $('#hint').html('Abstract usually is ' +abstractcount+ ' words longer');
        }
                 else{
            $('#hint').html('Abstract is of correct length');
        }
        $('#keywords').html(data.keywords);
        $('#minvalue').html(min_val);
        $('#maxvalue').html(max_val);
        $('#avgvalue').html(final_avg_val);
        $('#kminvalue').html(kmin_val);
        $('#kmaxvalue').html(kmax_val);
        $('#kavgvalue').html(kfinal_avg_val);
      
        $('#keywords-length').html(data.keyWordsCount);
        console.log(data.keyWordsCount);

    /*keywords limit*/
          
            if(keywordslimit < data.keyWordsCount) {
              
            $('#keyword-length-warning').html('keyword length should not exceed given limit '+ keywordslimit);
             console.log(keywordslimit);
        } else {
            $('#keyword-length-warning').html('keyword length should not be longer than: 8');
        }
      
         if(data.keyWordsCount==0) {
            $('#keyword-length-warning').html('no keywords');
        } 
        
     if(data.keyWordsCount>keywordslimit){
                $('#keywordshint').html('keywords usually are ' +keywordscount+ ' words longer');
        }
                 else{
            $('#keywordshint').html('keywords are of correct length');
        }
           
      //  $('#detailsContainer').toggleClass('not_visible');
      //  $('.pdf-container').toggleClass('not_visible');
        var jsonstring=JSON.stringify(obj);
        $('#json').html(jsonstring);
         $('iframe').attr('src', file);
        console.log("ending update result");
    }

    function extractHeaderAndShow(text) {
        var items = text.items, tempNo = 0, avgHeight, item,
            abstractTextIndex, abstractIndex,
            keywordsStart,
            keywordsEnd,
            keywords="",
            abstract="", abstractTextEnd,
            relatedTextIndex,relatedIndex,relatedTextEnd,relatedwork="",
            main_title={str: ""},
            count = 0;
            console.log("File name is : "+file);
        for(var i=0; i< items.length; i++ ) {
            tempNo = tempNo+ parseInt(items[i].height, 10);
        }
        console.log("test");
console.log("temp no "+tempNo);

console.log("items.length "+items.length);
        avgHeight = tempNo/items.length;
        console.log(avgHeight + " >>> average text height");
     console.log(items);

        for(i=0; i< items.length; i++ ) {
            item = items[i];
            /*Title */
            if(item.height > avgHeight ) {

                item.line=i;
                main_titles.push(item);
                          }
                      
           
           //title ends here

            // Journal type
            var file_name = file.substr(2,file.indexOf("/",2)-2);
            switch(file_name)
            {
              case "Industrial Marketing Management" :
              limit = 250;
                keywordslimit=6;
                      break;
               
              case "chemical physics" :limit = 200;
                keywordslimit=6;
                    break;
              case "frontiers" :
              keywordslimit=8;
              limit = 150;
                    break;
              case "ieee" :limit = 250;
                keywordslimit=6;
                    break;
              case "pediatrics" :limit = 180;
                keywordslimit=4;
                    break;
              case "physics" :limit = 250;
                keywordslimit=8;
                    break;
              case "qualitative" :limit = 226;
                keywordslimit=6;
                    break;
          
                    default: break;

            }
         
            /*GET Abstract */
            if(item.str.indexOf("abstract") !== -1
               || item.str.indexOf("Abstract") !== -1
               || item.str.indexOf("A B S T R A C T") !== -1)
            {
                abstractIndex = i;
            }
            if(abstractIndex
               && i > abstractIndex
               && items[i].height <= items[abstractIndex].height){
                abstractTextIndex = i;
            } else {
                abstractTextIndex = null;
            }
            if(abstractTextIndex && items[i+1]
               && items[i+1].height===item.height
               && !abstractTextEnd) {
                if(item.str.indexOf('Keywords') != -1
                   || item.str.indexOf('introduction') != -1
                   || item.str.indexOf('Table of Contents') != -1)  {
                    abstractTextEnd = true;
                } else {
                    count = count + 1;
                    abstract += item.str;
                    abstractTextEnd = false;
                }
            } else {
                if(count<10) {
                    abstractTextEnd = undefined;
                    abstractTextIndex = i;
                    abstract="";
                }
                if(abstractTextEnd != undefined) {
                    abstractTextEnd = true;
                }
            }
            /*abstract length*/
            var abstractLength,abstractArr;
            abstractArr=  abstract==''?null:abstract.split(' ');
            abstractLength= abstractArr==null?0:abstractArr.length;
            /*keywords*/
            var possibilities = ["Keywords:", 'Key words', 'Key words:', 'Keywords','Key words :'],
                match,
                sameline;

            if(item.str.indexOf('Keywords:') != -1
               || item.str.indexOf('Key words:') != -1
               || item.str.indexOf('Key words') != -1
               || item.str.indexOf('Keywords') != -1) {
                for(var k=0; k<possibilities.length; k++){
                    if(item.str.indexOf(possibilities[k]) != -1) {
                        match = k;
                    };
                }
                if(match && (item.str.length-possibilities[match].length) === 0) {
                    keywordsStart = i + 1;
                } else {
                    keywordsStart = i;
                    sameline=true;
                }
            }

            if(keywordsStart) {
                if(item.height <= items[keywordsStart].height) {
                    if(sameline) {
                        var temp = item.str.slice(possibilities[match].length);
                        keywords = keywords + " " + temp;
                        sameline=false;
                    } else if( i >= keywordsStart && item.str.trim() && item.str.length > 2) {
                        if(keywords.trim() && keywords.indexOf(';') === -1) {
                            keywords = keywords + "," + item.str;
                            console.log(keywords);
                        }else {
                            keywords = keywords + " " + item.str;
                            console.log(keywords);
                        }
                    }
                } else {
                    keywordsStart = undefined;
                }
            }
        }
      
            
        /*keyword length*/

      var keyWordsCount, keywordsArr;
            console.log("test keywords " + keywords);
            
             if(keywords.indexOf(';') !=-1)
                 {
            keywordsArr= keywords.split(';');
            console.log(keywordsArr);
         keyWordsCount = keywordsArr.length;
         console.log(keyWordsCount);
        }
    else  if(keywords.indexOf(',') !=-1){
            keywordsArr=keywords.split(',');
            keyWordsCount = keywordsArr.length;
             console.log(keyWordsCount);
        }
             
        if(keywords==''){
            keyWordsCount=0;
        }

          for(var j = 0; j < main_titles.length; j++) {
            if(main_titles[j-1]){
                if(main_titles[j].str !== "" &&
                   (main_titles[j].line - main_titles[j-1].line <= 2)
                   && (main_titles[j-1].height == main_titles[j].height)) {
                    main_title.str= main_title.str +" "+ main_titles[j].str;
                    main_title.fontSize = main_titles[j].height;
                } else {
                    break;
                }
            } else if(main_titles[j].str !== "" && main_titles[j].height == main_titles[j+1].height){
                main_title.str= main_title.str +" "+ main_titles[j].str;
            } else if(main_titles[j].height != main_titles[j+1].height) {
                main_title.str= main_titles[j].str;
                main_title.fontSize = main_titles[j].height;
            }
          }
     /*    if(main_title.str.length>0)
        {
            titlelength=main_title.str.split(' ').length;
            console.log(titlelength);
           // ('#titlelength').html(titlelength);
        }*/
            if(main_title.str.length>0)
          {
            titlelength=main_title.str.split(' ').length;
            console.log(titlelength);
           // ('#titlelength').html(titlelength);
        }
        

   
      abstractcount=abstractLength-limit;
    //  abstractcount=max_val-abstractLength;
        console.log(abstractcount);

     keywordscount=keyWordsCount-keywordslimit;
        console.log(keywordscount);

             
        //loop ends here
        main_title.keywords = keywords.trim();
        main_title.keyWordsCount = keyWordsCount;
        main_title.abstract = abstract.trim();
        main_title.abstractLength = abstractLength;
      
        
        console.log("calling update result");
        
        resu = {abs : abstractLength, keyw : keyWordsCount ,np: noOfPages };
        //MIN
        if(min_val> parseInt(resu.abs))
        {
            min_val = resu.abs;
        }
        //MAX
        if(max_val<resu.abs)
        {
            max_val = resu.abs;
        }
        //AVG
        avg_val += resu.abs;
        final_avg_val = avg_val/files.length+1;
        console.log("min : "+min_val+"max : "+max_val+"avg val : "+final_avg_val);
        //keywords min
          if(kmin_val> parseInt(resu.keyw))
        {
            kmin_val = resu.keyw;
        }
        //MAX
        if(kmax_val<resu.keyw)
        {
            kmax_val = resu.keyw;
        }
        //AVG
        kavg_val += resu.keyw;
        kfinal_avg_val = kavg_val/files.length+1;
        console.log("min : "+kmin_val+"max : "+kmax_val+"avg val : "+kfinal_avg_val);
        pavg_val +=resu.np;
        console.log(pavg_val);
        pfinal_avg_val= pavg_val/files.length+1;
        console.log(pfinal_avg_val);

            
      
               
                  var obj={
	"type": "object",
	"title": "Template",
	"properties": {
     "Pages":{
        "type":"object",
        "title":"Pages",
        "properties":{
            "No. of pages":{
                "type":"string",
                "title":"No. of Pages",
             "default":noOfPages
            }

        }
        
        
    },
		"title": {
			"type": "object",
			"title": "Title",
			"properties": {
				"title": {
					"type": "string",
					"title": "Title Name",
                    "default":main_title.str
				},
				"font-size": {
					"type": "number",
					"title": "Font-Size",
					"minimum": 1,
					"maximum": 40,
					"default": main_title.fontSize
				},
               "title-length": {
					"type": "number",
					"title": "Title-Length",
					"minimum": 1,
					"maximum": 40,
					"default": titlelength
				}
			}
		},
		"Keywords": {
			"type": "object",
			"title": "Keywords",
			"properties": {
				"keywords": {
					"type": "string",
					"title": "Keywords",
                    "default":keywords
				},

				"keyword length": {
					"type": "number",
					"title": "Keywords length",
                    "default":keyWordsCount
				},
                   "avg length": {
					"type": "number",
					"title": "Keyword Average length",
                    "default":kfinal_avg_val
				},
                  "minimum length": {
					"type": "number",
					"title": "Keyword Minimum length",
                    "default":kmin_val
				},
                "maximum length": {
					"type": "number",
					"title": "Keyword Maximum length",
                    "default":kmax_val
				}

			}
		},
		"abstract": {
			"type": "object",
			"title": "Abstract",
			"properties": {
				"abstract": {
					"type": "string",
					"title": "Abstract",
                    "default":abstract
				},

				"abstract length": {
					"type": "number",
					"title": "Abstract length",
                    "default":abstractLength
				},
                "average length": {
					"type": "number",
					"title": "Abstract average length",
                    "default":final_avg_val
				},
                  "min length": {
					"type": "number",
					"title": "Abstract minimum length",
                    "default":min_val
				},
                "max length": {
					"type": "number",
					"title": "Abstract maximum length",
                    "default":max_val
				}
                
            }
		}
	}


        }
        if(index==files.length){
        updateResult(main_title,obj);
               }

        if(index<files.length){
            console.log("Index value :"+index);
            console.log("length value :"+files.length);
            file = files[index];
            index++;
            start(file);
            
        }
        
        return {abs : abstractLength, keyw : keyWordsCount ,abstractcount, np:noOfPages };
      
    }

    $('.pdf-load').on('click', function() {
                min_val=1000;
                max_val=0;
                avg_val=0;
                final_avg_val=0;
                  kmin_val=1000;
                kmax_val=0;
                kavg_val=0;
                kfinal_avg_val=0;
                 pavg_val=0;
                pfinal_avg_val=0;
                start(file);
      });

        function start(newFile){
            main_titles = [];
            other_headers = [];
            main_title ={str: ""};
            noOfPages=0;resu=[];
            limit=0;
            keywordslimit=0;
            file = newFile;
            PDFJS.getDocument(file).then(function(pdf) {
                            noOfPages= pdf.numPages;
                        //  for (var i = 1; i <= noOfPages; i++) {
                           pdf.getPage(1).then(function(page) {
                        page.getTextContent().then(function(text) {
                                        resu  = extractHeaderAndShow(text);
                                                                       });
                   
                           
                                                               });
                          //}
                           
                                                         });
                            
             
                                 }
    });
