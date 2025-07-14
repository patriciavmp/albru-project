window.onload = function() {
    
    var currentTime = new Date();
    
    var hours = currentTime.getHours().toString().padStart(2, '0'); 
    var minutes = currentTime.getMinutes().toString().padStart(2, '0');
    
    document.getElementById('validationTime').value = hours + ':' + minutes;
};
