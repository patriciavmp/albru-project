document.addEventListener('DOMContentLoaded', function() {
    const validationTimeInput = document.getElementById('validationTime');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    validationTimeInput.value = `${hours}:${minutes}`;
});
document.querySelector('form').addEventListener('submit', function(event) {
    const mailInput = document.getElementById('mail');
    const mailValue = mailInput.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(mailValue)) {
        alert('Por favor, introduce un correo electrónico válido.');
        event.preventDefault(); // Evita que el formulario se envíe
    }
});
document.getElementById('dni').addEventListener('input', function() {
    if (this.value.length > 8) {
        this.value = this.value.slice(0, 8);
    }
});
document.querySelector('form').addEventListener('submit', function(event) {
    if (!confirm('¿Estás seguro de que deseas enviar este formulario?')) {
        event.preventDefault(); // Evita el envío si el usuario cancela
    }
});
document.getElementById('customerName').addEventListener('input', function() {
    this.value = this.value.toUpperCase();
});
document.getElementById('numberRecord').addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9]/g, '');
});
document.getElementById('installationCost').addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9.]/g, ''); // Permite números y el punto decimal
    if (parseFloat(this.value) < 0) {
        this.value = ''; // O puedes mostrar un mensaje de error
    }
});
document.getElementById('dateInstallation').addEventListener('input', function() {
    const selectedDateTime = new Date(this.value);
    if (!isNaN(selectedDateTime)) {
        const formattedDateTime = selectedDateTime.toLocaleString(); // Formato local
        console.log('Fecha y hora seleccionada:', formattedDateTime);
        // Aquí podrías actualizar algún otro elemento en tu página para mostrar la vista previa
    } else {
        console.log('Fecha y hora inválida');
    }
});