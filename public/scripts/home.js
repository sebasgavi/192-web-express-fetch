window.addEventListener('load', () => {

    var form = document.querySelector('form');

    form.addEventListener('submit', function(event){
        event.preventDefault();

        // transforma el formulario como DOM (lo que el usuario puede ver)
        // a una colección de datos (variables con valores)
        var formInfo = new FormData(form);
        // agrego esos datos a lo que vamos a enviar
        var data = new URLSearchParams(formInfo);
        data.append('adittional', 'algo adicional');
        data.append('date', Date.now());
        data.delete('firstname');

        var promise = fetch('/api/people', {
                method: 'POST',
                body: data
            });
        
        promise.then((raw) => {
                return raw.json();
            })
            .then((info) => {
                form.reset();
                console.log(info);
            });
    });

});