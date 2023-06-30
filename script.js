$(document).ready(function() {


	// Clears the header form for starting a new job
	$('#clearFormBtn').click(function(){
		$('input[id="0_percent"]').prop('checked', true);
		$('.items-across').val("");
		$('.items-down').val("");
		$('.total-items').val("")
		$('.item-quantity').val("");
		$('#copyTotal').text("");
		$('#frameItemsPill').text("");
		$('#jobLengthPill').text("");
		$('#addedItemsPill').text("");
	});

//////////////////////////////////////////////////////////////////////////////////////////////////////////

	// Clear the items - can be used if items needed to be re-entered but job is still the same
	$('#clearItemsBtn').click(function(){
		$('#itemsTable tbody').empty();
		$('#totalMeterContainer').empty();
	});

//////////////////////////////////////////////////////////////////////////////////////////////////////////

	// calculates the number of labels on a frame based on the number of ac and ar 
	$('.items-down').on('change', function(){
		var itemsAcross = parseInt($('.items-across').val());
		var itemsDown = parseInt($('.items-down').val());
		var itemsOnFrame = (itemsAcross * itemsDown);

		$('.total-items').val(itemsOnFrame)
		$('.item-quantity').focus();
	});

//////////////////////////////////////////////////////////////////////////////////////////////////////////	

	//This section does all the math and calculations 
	$('.item-quantity').on('change',function(){

		// Variables and some math
		$('#itemTotalContainer').css('visibility', 'visible');
		var itemAmount = parseInt($('.item-quantity').val());
		var overagePercentage = $('#selectPercentage').val();
		var itemsAcross = parseInt($('.items-across').val());
		var itemsDown = parseInt($('.items-down').val());
		var itemsOnFrame = (itemsAcross * itemsDown);
		var totFrames = Math.ceil(itemAmount / itemsOnFrame);
		var TenPercent = 1.1;
		var FifPercent = 1.15;
		var FivePercent = 1.05;
		var ZeroPercent = 1.03;
		var JobLength = totFrames; 

		// Calculation for 0 percent overage
		if($('input[name=percentageButtonGrp]:checked').val() == "0") {
			var zeroFramesTot = Math.ceil((totFrames + 3) * ZeroPercent);
			var addedItems = Math.ceil((itemAmount * ZeroPercent) - itemAmount);
			
			$('#copyTotal').text(zeroFramesTot);
			$('#frameItemsPill').text("Item Qty: " + itemAmount);
			$('#addedItemsPill').text(addedItems);
		}

		// Calculation for 5 percent overage
		if($('input[name=percentageButtonGrp]:checked').val() == "5") {
			var fiveFramesTot = Math.ceil(totFrames* FivePercent);
			var addedItems = Math.ceil((itemAmount * FivePercent) - itemAmount);
			
			$('#copyTotal').text(fiveFramesTot);
			$('#frameItemsPill').text("Item Qty: " + itemAmount);
			$('#addedItemsPill').text(addedItems);
		}

		// Calculation for 10 percent overage
		if($('input[name=percentageButtonGrp]:checked').val() == "10") {
			var tenFramesTot = Math.ceil(totFrames * TenPercent);
			var addedItems = Math.ceil((itemAmount * TenPercent) - itemAmount);
			
			$('#copyTotal').text(tenFramesTot);
			$('#frameItemsPill').text("Item Qty: " + itemAmount);
			$('#addedItemsPill').text(addedItems);

		}

		// Calculation for 15 percent overage
		if($('input[name=percentageButtonGrp]:checked').val() == "15") {
			var fifFramesTot = Math.ceil(totFrames * FifPercent);
			var addedItems = Math.ceil((itemAmount * FifPercent) - itemAmount);
			
			$('#copyTotal').text(fifFramesTot);
			$('#frameItemsPill').text("Item Qty: " + itemAmount);
			$('#addedItemsPill').text(addedItems);
		}


		$('#jobLengthPill').text(JobLength + " Meters");
		$('#addItemBtn').focus();
	});

//////////////////////////////////////////////////////////////////////////////////////////////////////////

	// This section adds the items information to a table to review if necessary
	$('#addItemBtn').click(function(){
		$('#totalMeterContainer').empty();
		var totalCopies = $('#copyTotal').text();
		var itemAmount = parseInt($('.item-quantity').val());
		var overagePercentage = $('input[name=percentageButtonGrp]:checked').val();
		var itemsAcross = parseInt($('.items-across').val());
		var itemsDown = parseInt($('.items-down').val());
		var itemsOnFrame = (itemsAcross * itemsDown);
		var totFrames = Math.ceil(itemAmount / itemsOnFrame);
		var JobLength = totFrames;
		var totalItemQty = Math.ceil(parseInt($('#addedItemsPill').text()) + itemAmount);
		var itemArray = [itemAmount, overagePercentage, totalItemQty, totalCopies, JobLength ];
		var itemNumber = $('#itemsTable').find('tr').length ;
		$('#itemsTable tbody').append('<tr><td>' + itemNumber + ' </td><td>' + itemArray[0] + ' </td><td>' + itemArray[1] + '%' + ' </td><td>' + totalItemQty + '</td><td>' + itemArray[3] + ' </td><td class="itemLength">' + itemArray[3] + ' Meters / ? Feet</td></tr>');

		var result = [];
		 $('#itemsTable tr').each(function(){
		  $('.itemLength', this).each(function(index, val){
		    if(!result[index]) result[index] = 0;
		     result[index] += parseInt($(val).text());
		   });
		});


		$('#totalMeterContainer').append('<span class="badge bg-success bg-secondary" >Total Job Length: <span id="jobLengthText">' + result + '</span></span>')
		$('.item-quantity').val('');
		$('.item-quantity').focus();
		
	});

//////////////////////////////////////////////////////////////////////////////////////////////////////////

});