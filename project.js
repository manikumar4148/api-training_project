const Hapi = require('hapi');
const MySQL = require('mysql');
require('dotenv').config()
const init = async () => {

	 const server = Hapi.server({
        port: 4000,
        host: 'localhost'
    });


 

server.route({
    method: 'GET',
    path: '/api/producer',
    handler: function (request, reply) {
    	return new Promise((resolve,reject)=>{
    		
        var connection = MySQL.createConnection({
            host     : process.env.DB_HOST,
            user     : process.env.DB_USER,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_NAME
          });
          connection.connect();

    	
       connection.query(`SELECT *from producer`, function (error, results, fields) {
       if (error) reject(error);
       resolve(results);
   		});

       connection.end();
    });
  }
});


server.route({
    method: 'POST',
    path: '/api/producer',
    handler:(request, reply)=>{
    		var newPro=request.payload;
    		var pname=request.payload.pname;
    		var email=request.payload.email;
    		var twitter_name=request.payload.twitter_name;
    		var sname=request.payload.soundcloud_name;
    		if(pname.length>32)
    			return "name less than 32";
    		else if(pname.includes("XxXxStr8FirexxXxX"))
    			return "give valid name";
    		else if(email.length>256)
    			return "eamil less than 252";
    		else if((email.includes("@gmail.com")==false) &&(email.includes("@yahoo.com")==false))
    			return "email must be valid";
    		else if(twitter_name.length>16)
    			return "tname must be less than 16";
    		 else if(sname.length>12)
    			return "scname must be less than 32";
    		else
    		{
    			return new Promise((resolve,reject)=>{
    		   var connection = MySQL.createConnection({
            host     : process.env.DB_HOST,
            user     : process.env.DB_USER,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_NAME
          });
          connection.connect();
connection.query(`insert into producer(pname,email,password_hash,twitter_name,soundcloud_name,producer_status) values('${newPro.pname}','${newPro.email}','${newPro.password_hash}','${newPro.twitter_name}','${newPro.soundcloud_name}','${newPro.producer_status}')`, function (error, results, fields) {
       if (error) reject(error);
       resolve(results);
   		});

       connection.end();
   
    });
  }
}
});



server.route({
    method: 'GET',
    path: '/api/producer/{id}',
    handler: function (request, reply) {
    	return new Promise((resolve,reject)=>{
    		var id=request.params.id;
    		    		
        var connection = MySQL.createConnection({
            host     : process.env.DB_HOST,
            user     : process.env.DB_USER,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_NAME
          });
          connection.connect();

    	
       connection.query(`SELECT *from producer where pid=${id}`, function (error, results, fields) {
       if (error) reject(error);
       resolve(results);
   		});

       connection.end();
    });
  }
});




server.route({
    method: 'DELETE',
    path: '/api/producer/{id}',
    handler: function (request, reply) {
    	return new Promise((resolve,reject)=>{
    		var id=request.params.id;
    		    		
        var connection = MySQL.createConnection({
            host     : process.env.DB_HOST,
            user     : process.env.DB_USER,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_NAME
          });
          connection.connect();

    	
       connection.query(`DELETE from producer where pid=${id}`, function (error, results, fields) {
       if (error) reject(error);
       resolve(results);
   		});

       connection.end();
    });
  }
});






server.route({
    method: 'PUT',
    path: '/api/producer/{id}',
    handler: function (request, reply) {

    		var pname=request.payload.pname;
    		var email=request.payload.email;
    		var twitter_name=request.payload.twitter_name;
    		var soundcloud_name=request.payload.soundcloud_name;


    		 if(pname.length>=32)
          	return "producer name must be lessthan 32 charecters";
          else if(pname.includes('XxXxStr8FirexxXxX')==true)
          	return "producer name can't contain text like 'XxXxStr8FirexXxX";
          else if(email.length>256)
    			return "eamil less than 252";
    		else if((email.includes("@gmail.com")==false) &&(email.includes("@yahoo.com")==false))
    			return "email must be valid";
          else if(twitter_name.length>=16)
          	return "twitter name must be less than 16 charecters";
          else if(soundcloud_name.length>=32)
          	return "soundcloud_name must be less than 32 charecters";
else
{
    	return new Promise((resolve,reject)=>{
    		var newPro=request.payload;
    	var id=request.params.id;       
    		
        var connection = MySQL.createConnection({
            host     : process.env.DB_HOST,
            user     : process.env.DB_USER,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_NAME
          });
          connection.connect();
    	
       connection.query(`UPDATE producer
            SET pname='${newPro.pname}',producer_status='${newPro.producer_status}',soundcloud_name='${newPro.soundcloud_name}',email='${newPro.email}',twitter_name='${newPro.twitter_name}'
            WHERE pid=${id}`, function (error, results, fields) {
       if (error) reject(error);
       resolve(results);
   		});

       connection.end();
   
    });
  }
}
});





server.route({
    method: 'GET',
    path: '/api/producer/{id}/beat',
    handler: function (request, reply) {
    	return new Promise((resolve,reject)=>{
    		var id=request.params.id;
    		
    		    		
        var connection = MySQL.createConnection({
            host     : process.env.DB_HOST,
            user     : process.env.DB_USER,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_NAME
          });
          connection.connect();

    	
       connection.query(`SELECT *from beat where pid=${id} and approved=1`, function (error, results, fields) {
       if (error) reject(error);
       resolve(results);
   		});

       connection.end();
    });
  }
});






server.route({
    method: 'POST',
    path: '/api/beat',
    handler:(request, reply)=>{
    		var newBeat=request.payload;
    		var bname=request.payload.bname;
    		var beat_url=request.payload.beat_url;
    		var approved=request.payload.approved;
    		var submit_date=request.payload.submit_date;
    		var aproval_date=request.payload.aproval_date;
    		var post_date=request.payload.post_date;
    		var pid=request.payload.pid;
    		if(bname.length>32)
    			return "beat name less than 32";
    		
    		else
    		{
    			return new Promise((resolve,reject)=>{
    		   var connection = MySQL.createConnection({
            host     : process.env.DB_HOST,
            user     : process.env.DB_USER,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_NAME
          });
          connection.connect();
connection.query(`insert into beat(bname,beat_url,approved,submit_date,aproval_date,post_date,pid) values('${bname}','${beat_url}','${approved}','${submit_date}','${aproval_date}','${post_date}','${pid}')`, function (error, results, fields) {
       if (error) reject(error);
       resolve(results);
   		});

       connection.end();
   
    });
  }
}
});




server.route({
    method: 'GET',
    path: '/api/beat/{id}',
    handler: function (request, reply) {
    	return new Promise((resolve,reject)=>{
    		var id=request.params.id;
    		    		
        var connection = MySQL.createConnection({
            host     : process.env.DB_HOST,
            user     : process.env.DB_USER,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_NAME
          });
          connection.connect();

    	
       connection.query(`SELECT *from beat where bid=${id}`, function (error, results, fields) {
       if (error) reject(error);
       resolve(results);
   		});

       connection.end();
    });
  }
});




server.route({
    method: 'DELETE',
    path: '/api/beat/{id}',
    handler: function (request, reply) {
    	return new Promise((resolve,reject)=>{
    		var id=request.params.id;
    		    		
        var connection = MySQL.createConnection({
            host     : process.env.DB_HOST,
            user     : process.env.DB_USER,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_NAME
          });
          connection.connect();

    	
       connection.query(`DELETE from beat where bid=${id}`, function (error, results, fields) {
       if (error) reject(error);
       resolve(results);
   		});

       connection.end();
    });
  }
});




server.route({
    method: 'PUT',
    path: '/api/beat/{id}',
    handler: function (request, reply) {

    		var bname=request.payload.bname;
    		var beat_url=request.payload.beat_url;
    		var submit_date=request.payload.submit_date;
    		

    		 if(bname.length>=32)
          	return "producer name must be lessthan 32 charecters";
        
else
{
    	return new Promise((resolve,reject)=>{
    		var newBeat=request.payload;
    	var id=request.params.id;       
    		
        var connection = MySQL.createConnection({
            host     : process.env.DB_HOST,
            user     : process.env.DB_USER,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_NAME
          });
          connection.connect();
    	
       connection.query(`UPDATE beat
            SET bname='${newBeat.bname}',beat_url='${newBeat.beat_url}',submit_date='${newBeat.submit_date}'
            WHERE bid=${id}`, function (error, results, fields) {
       if (error) reject(error);
       resolve(results);
   		});

       connection.end();
   
    });
  }
}
});




server.route({
    method: 'GET',
    path: '/api/beat/submitted',
    handler: function (request, reply) {
    	return new Promise((resolve,reject)=>{
    		var id=request.params.id;
    		
    		    		
        var connection = MySQL.createConnection({
            host     : process.env.DB_HOST,
            user     : process.env.DB_USER,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_NAME
          });
          connection.connect();

    	
       connection.query(`SELECT *from beat where approved=0`, function (error, results, fields) {
       if (error) reject(error);
       resolve(results);
   		});

       connection.end();
    });
  }
})




server.route({
    method: 'GET',
    path: '/api/beat/posted/{start}/{end}',
    handler: function (request, reply) {
    	return new Promise((resolve,reject)=>{
    		var start=request.params.start;
    		var end=request.params.end;
    		    		
        var connection = MySQL.createConnection({
            host     : process.env.DB_HOST,
            user     : process.env.DB_USER,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_NAME
          });
          connection.connect();

    	
       connection.query(`select *from beat where post_date > '${start}' and post_date < '${end}'`, function (error, results, fields) {
       if (error) reject(error);
       resolve(results);
   		});

       connection.end();
    });
  }
})




server.route({
    method: 'GET',
    path: '/api/beat/posted/{start}',
    handler: function (request, reply) {
    	return new Promise((resolve,reject)=>{
    		var start=request.params.start;
    		
    		    		
        var connection = MySQL.createConnection({
            host     : process.env.DB_HOST,
            user     : process.env.DB_USER,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_NAME
          });
          connection.connect();

    	
       connection.query(`select *from beat where post_date > '${start}' and post_date < current_date() `, function (error, results, fields) {
       if (error) reject(error);
       resolve(results);
   		});

       connection.end();
    });
  }
})





server.route({
    method: 'GET',
    path: '/api/beat/pending',
    handler: function (request, reply) {
    	return new Promise((resolve,reject)=>{
    		
    		
    		    		
        var connection = MySQL.createConnection({
            host     : process.env.DB_HOST,
            user     : process.env.DB_USER,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_NAME
          });
          connection.connect();

    	
       connection.query(`select *from beat where aproval_date >  current_date() and approved=1`, function (error, results, fields) {
       if (error) reject(error);
       resolve(results);
   		});

       connection.end();
    });
  }
})



server.route({
    method: 'GET',
    path: '/api/producer/{id}/submittedbeat',
    handler: function (request, reply) {
    	return new Promise((resolve,reject)=>{
    		var id=request.params.id;
    		    		
        var connection = MySQL.createConnection({
            host     : process.env.DB_HOST,
            user     : process.env.DB_USER,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_NAME
          });
          connection.connect();

    	
       connection.query(`select bname,pname from beat inner join producer on producer.pid=beat.pid where bid='${id}'`, function (error, results, fields) {
       if (error) reject(error);
       resolve(results);
   		});

       connection.end();
    });
  }
});




server.route({
    method: 'PUT',
    path: '/api/beat/{id}/approve',
    handler: function (request, reply) {
    	
    	return new Promise((resolve,reject)=>{
    		
    	var id=request.params.id;  
    	var aproval_date=request.payload.aproval_date;
    	var post_date=request.payload.post_date;    
    	var submit_date=request.payload.submit_date; 
    		
        var connection = MySQL.createConnection({
            host     : process.env.DB_HOST,
            user     : process.env.DB_USER,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_NAME
          });
          connection.connect();
    	
       connection.query(`UPDATE beat set approved=1,submit_date='${submit_date}',aproval_date='${aproval_date}' ,post_date='${post_date}' where pid='${id}'`, function (error, results, fields) {
       if (error) reject(error);
       resolve(results);
   		});

       connection.end();
   
    });
  }

});






server.route({
    method: 'PUT',
    path: '/api/beat/{id}/unapprove',
    handler: function (request, reply) {
    	
    	return new Promise((resolve,reject)=>{
    		
    	var id=request.params.id;  
    	
    		
        var connection = MySQL.createConnection({
            host     : process.env.DB_HOST,
            user     : process.env.DB_USER,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_NAME
          });
          connection.connect();
    	
       connection.query(`UPDATE beat set approved=0,aproval_date=null, post_date=null where bid='${id}'`, function (error, results, fields) {
       if (error) reject(error);
       resolve(results);
   		});

       connection.end();
   
    });
  }

});



await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();