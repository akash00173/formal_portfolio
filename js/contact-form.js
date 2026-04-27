emailjs.init("8Uf4p3BXmLiMUMrdY");

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const btn = this.querySelector('.btn-submit');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
    
    const templateParams = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    console.log("Params:", templateParams);
    
    emailjs.send('service_1qv7css', 'template_aif8qxf', templateParams)
        .then(function(response) {
            console.log("SUCCESS!", response);
            btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
            btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            document.getElementById('contact-form').reset();
            setTimeout(function() {
                btn.innerHTML = originalText;
                btn.disabled = false;
                btn.style.background = '';
            }, 3000);
        })
        .catch(function(error) {
            console.log("ERROR:", error);
            btn.innerHTML = '<i class="fas fa-times"></i> Failed';
            btn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
            setTimeout(function() {
                btn.innerHTML = originalText;
                btn.disabled = false;
                btn.style.background = '';
            }, 3000);
        });
});