
		

function setupMap(paramShowMarker,currentLat,currentLong,mapId) {
			
			
    var latLongEmbedHtml="";
    
    var myOptions = {
      zoom: 15,
      center: new google.maps.LatLng(currentLat,currentLong),

      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    if(mapId!=""){
        mapId=mapId;
    }else{
        mapId="map-canvas";
    }

    var map = new google.maps.Map(document.getElementById(mapId),
        myOptions);
    
    if(paramShowMarker==true){
    $(".paramLatLong").remove();
    latLongEmbedHtml="<input type=\"hidden\" name=\"paramLat\" id=\"paramLat\" class=\"paramLatLong\" value=\""+currentLat+"\">";
    latLongEmbedHtml+="<input type=\"hidden\" name=\"paramLong\" id=\"paramLong\" class=\"paramLatLong\" value=\""+currentLong+"\">";
    $("#paramLatLong").html(latLongEmbedHtml);
    
    var marker = new google.maps.Marker({
    map:map,
    position: new google.maps.LatLng(currentLat,currentLong),
    draggable: true
    });
    }
    
    var infowindow = new google.maps.InfoWindow({
    //map:map,
    //content: "ตำแหน่งที่ตั้ง",
    //position:  new google.maps.LatLng(13.857326299999999, 100.7267414)
    });
    


    google.maps.event.addListener(map,'click',function(event){
        
        if(!marker){
            alert("คลิ๊กปุ่มปักหมุดก่อนครับ");
            return false;
        }

        infowindow.open(map,marker);
        //infowindow.setContent('ปักหมุดตรงนี้' + event.latLng);
        infowindow.setContent('ปักหมุดตรงนี้');
        //alert(event.latLng);
        
        var latt="";
        var long="";
        //find lat
        latt=event.latLng+"";
        latt=latt.split(",");
        latt=latt[0].split("(");
        latt=latt[1];
        
        
        //find long
        long=event.latLng+"";
        long=long.split(",");
        long=long[1].split(")");
        long=long[0];
        
    
        
        
        infowindow.setPosition(event.latLng);
        marker.setPosition(event.latLng);
        
        /*
        alert(latt);
        alert(long);
        */
        
        $(".paramLatLong").remove();
        latLongEmbedHtml="<input type=\"hidden\" name=\"paramLat\" id=\"paramLat\" class=\"paramLatLong\" value=\""+latt+"\">";
        latLongEmbedHtml+="<input type=\"hidden\" name=\"paramLong\" id=\"paramLong\" class=\"paramLatLong\" value=\""+long+"\">";	
        $("#paramLatLong").html(latLongEmbedHtml);
    
    
    });


}

function createMap(jsonObjEncode,mapId,zoom) {

  var paramLat=13.847860;
  var paramLog=100.604274;
  var paramZoom=zoom;
  if(jsonObjEncode.length==1){
    
    paramLat=parseFloat(jsonObjEncode[0]['lat']);
    paramLog=parseFloat(jsonObjEncode[0]['lng']);
    paramZoom=15;
  }

	var mapOptions = {
	  center: {lat:paramLat, lng: paramLog},
	  zoom: paramZoom,
	}

	var maps = new google.maps.Map(document.getElementById(mapId),mapOptions);

	var marker, info;
	
	var jsonObj;
	if(jsonObjEncode==undefined){
					jsonObj = [];

          // jsonObj = [{"location":"วัดลาดปลาเค้า", "lat": "13.846876", "lng": "100.604481"},
	  			//   {"location":"หมู่บ้านอารียา", "lat": "13.847766", "lng": "100.605768"},
	  			//   {"location":"สปีดเวย์", "lat": "13.845235", "lng": "100.602711"},
	  			//   {"location":"สเต็ก ลุงหนวด", "lat": "13.862970", "lng": "100.613834"}];
	}else{
		jsonObj=jsonObjEncode;
	}
	 
	 var image = {
	          //url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
	          //url:"https://cdn0.iconfinder.com/data/icons/business-pack-4/512/billboard-512.png",
	          // This marker is 20 pixels wide by 32 pixels high.
	          size: new google.maps.Size(20, 32),
	          // The origin for this image is (0, 0).
	          origin: new google.maps.Point(0, 0),
	          // The anchor for this image is the base of the flagpole at (0, 32).
	          anchor: new google.maps.Point(0, 32)
	        };

	 
	$.each(jsonObj, function(i, item){

		marker = new google.maps.Marker({
		   position: new google.maps.LatLng(item.lat, item.lng),
		   map: maps,
		   icon: image,
		   title: item.location,
		   url:item.url
		});

	  info = new google.maps.InfoWindow();


	  google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
		return function() {
		   info.setContent(item.location);
		   info.open(maps, marker);
		}
	  })(marker, i));
	  google.maps.event.addListener(marker, 'click', (function(marker, i) {
		return function() {
		//    info.setContent(item.location);
		//    info.open(maps, marker);
		window.location.href = this.url;
		}
	  })(marker, i));
	});
}


// call total map start
var callDataForMap = function(id){
 // /api/public/check-master-list/check_list_master_by_role/5
 // /api/public/check-master-list/check_list_master_by_role/1
  var route="";
  if(id!="" && id!=null && id!='null'){
    route="/api/public/folder-cate/call_map_by_id/"+id;
  }else{
    // route="/api/public/folder-cate/call_map_all"
    route="/api/public/check-master-list/check_list_master_by_role/"+sessionStorage.getItem('galbalRole')
    
    ;
  }
  $.ajax({
    url:restURL+route,
    type:"get",
    dataType:"json",
     headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
    success:function(data){

      // id,folder_cate_name,map,mission_begin_date,mission_complete_date,folder_cate_seq
        
        var latLng=[];
        var jsonObj="[";
        $.each(data['data_category'],function(index,indexEntry){

          if(indexEntry['map']!=null){
            latLng=indexEntry['map'].split(",");
          }else{
            latLng[0]="";
            latLng[1]="";
          }
        
          if(index==0){
            jsonObj+="{";
          }else{
            jsonObj+=",{";
          }
          jsonObj+="\"location\":\""+indexEntry['folder_cate_name']+"\",\"lat\":\""+latLng[0]+"\",\"lng\":\""+latLng[1]+"\",\"url\":\"#/pages/check-list?openModal=true&id="+indexEntry['id']+"\"";

          jsonObj+="}";
        });
        jsonObj+="]";

        var jsonObjEncode=eval("("+jsonObj+")");
      //console.log(jsonObjEncode);
      createMap(jsonObjEncode,"map",10);
      
    }
  });
}
  // call total map end
//calendar start

  /* initialize the external events
     -----------------------------------------------------------------*/
    function init_events(ele) {
      ele.each(function () {

        // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
        // it doesn't need to have a start or end
        var eventObject = {
          title: $.trim($(this).text()) // use the element's text as the event title
        }

        // store the Event Object in the DOM element so we can get to it later
        $(this).data('eventObject', eventObject)

        // make the event draggable using jQuery UI
        $(this).draggable({
          zIndex        : 1070,
          revert        : true, // will cause the event to go back to its
          revertDuration: 0  //  original position after the drag
        })

      })
    }

    init_events($('#external-events div.external-event'))

    /* initialize the calendar
     -----------------------------------------------------------------*/
    //Date for the calendar events (dummy data)
    var date = new Date()
    var d    = date.getDate(),
        m    = date.getMonth(),
        y    = date.getFullYear()
   


    var callCalendar = function(events){

          $('#calendar').fullCalendar({
          header    : {
            left  : 'prev,next today',
            center: 'title',
            right : 'month,agendaWeek,agendaDay'
          },
          buttonText: {
            today: 'today',
            month: 'month',
            week : 'week',
            day  : 'day'
          },
          //Random default events
          events    :events,
          editable  : false,
          droppable : false, // this allows things to be dropped onto the calendar !!!
          drop      : function (date, allDay) { // this function is called when something is dropped

            // retrieve the dropped element's stored Event Object
            var originalEventObject = $(this).data('eventObject')

            // we need to copy it, so that multiple events don't have a reference to the same object
            var copiedEventObject = $.extend({}, originalEventObject)

            // assign it the date that was reported
            copiedEventObject.start           = date
            copiedEventObject.allDay          = allDay
            copiedEventObject.backgroundColor = $(this).css('background-color')
            copiedEventObject.borderColor     = $(this).css('border-color')

            // render the event on the calendar
            // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
            $('#calendar').fullCalendar('renderEvent', copiedEventObject, true)

            // is the "remove after drop" checkbox checked?
            if ($('#drop-remove').is(':checked')) {
              // if so, remove the element from the "Draggable Events" list
              $(this).remove()
            }

          }
        })

    }
//calendar end
var getColor = function(important){

  var color;
      if(important==1){
        color="#f56954";
      }else if(important==2){
        color="#f39c12";
      }else if(important==3){
        color="#0073b7";
      }else if(important==4){
        color="#00c0ef";
      }else{
        color="#00a65a";
      }
  return color;
}
var callDataForCalendar = function(){
 // /api/public/check-master-list/check_list_master_by_role/5
   $.ajax({
    url:restURL+"/api/public/folder-cate/call_map_all",
    type:"get",
    dataType:"json",
     headers:{Authorization:"Bearer "+sessionStorage.getItem('galbalToken')},
    success:function(data){

            // {
            //   title          : 'Click for Google',
            //   start          : new Date(y, m, 28),
            //   end            : new Date(y, m, 29),
            //   url            : 'http://google.com/',
            //   backgroundColor: '#3c8dbc', //Primary (light-blue)
            //   borderColor    : '#3c8dbc' //Primary (light-blue)
            // }
            // id,folder_cate_name,map,mission_begin_date,mission_complete_date,folder_cate_seq
        
        
        var jsonObj="[";
        $.each(data,function(index,indexEntry){

          if(index==0){
            jsonObj+="{";
          }else{
            jsonObj+=",{";
          }
          jsonObj+="\"title\":\""+indexEntry['folder_cate_name']+"\",\"start\":\""+indexEntry['mission_begin_date']+"\",";
          jsonObj+="\"end\":\""+indexEntry['mission_complete_date']+"\",\"url\":\"#/pages/map?id="+indexEntry['id']+"&map="+indexEntry['map']+"\",";

          jsonObj+="\"backgroundColor\":\""+getColor(indexEntry['folder_cate_seq'])+"\",\"borderColor\":\""+getColor(indexEntry['folder_cate_seq'])+"\"";
         
          jsonObj+="}";

        });
        jsonObj+="]";

        var jsonObjEncode=eval("("+jsonObj+")");
      console.log(jsonObjEncode);
      callCalendar(jsonObjEncode);
      
    }
  });
  
}

$(document).ready(function(){
  
    setTimeout(function(){
        
         //setupMap(true,13.857326299999999, 100.7267414,'map');
         callDataForMap($.urlParam('id'));

         
    },1000);
  
    $("#callCalendarModal").click(function(){
        // calendar start
        callDataForCalendar();
       
        $("#calendarModal").modal({backdrop: false, keyboard: false});
    });


   // alert($.urlParam('id'));

    



    
    
    
    
});