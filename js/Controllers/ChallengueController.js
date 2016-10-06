app.controller('ChallengueController',['$scope','ChallengueResource','$window','$compile',function($scope,ChallengueResource,$window,$compile){
		
		$scope.title = 'Retos';
		$scope.col_row = '';
		$scope.connect = {};
		
		$scope.generate = function(id){
			console.log('id relacionado '+id);
		} 

		var init = function () {			
			
   			var request = ChallengueResource.count();		
				request.then(function(response){
					console.log('success');
					$scope.col_row = response.data;
					forms();
					
			},function(error){
				console.log('error');
				$scope.connect = {message: 'Ha ocurrido un error'}
			});
		};

	
		init();

		var forms = function () {			 
                                      
			html = "<table>"

             for(var j=0;j<10;j++)
             {
             	html += "<tr>"
	                for(var i=0;i<10;i++)
	                { 
	                      
		                if(((j*10)+i)<Object.keys($scope.col_row).length)
		                {
		           			html+="<td style='text-align:center' >" 
		                	html+="<div class='block' ng-click='generate(5)'  title='"+$scope.col_row[i].titulo+"'></div>"   
		                	html+="</td>" 	
		                }         
	               
	                          
	                } 
                html += "</tr>"
              }

            html = html+"</table>";
                
              document.getElementById("table_matriz").innerHTML=html;

              $compile( document.getElementById('table_matriz') )($scope);
		}

	  	 
		
}]);