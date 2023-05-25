//PAYMENT 

const paymentForm = document.getElementById("payment-form");

if (paymentForm) {
    paymentForm.addEventListener("submit", function(event){
        event.preventDefault(); 
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Vas a finalizar la compra",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, finalizar compra'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Tu compra ha sido realizada con éxito.',
                    'success'
                ).then((result) => {
                    localStorage.removeItem('cart'); //Limpia el carrito
                    window.location.href = 'index.html'; // Redirige a la página inicial
                });
            }
        });
    });
}