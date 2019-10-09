window.addEventListener('load', () => {

    var form = document.querySelector('form');

    form.addEventListener('submit', function(event){
        event.preventDefault();

        var firstname = document.querySelector('input');

        var data = new URLSearchParams();
        data.append('firstname', firstname.value);
        data.append('lastname', 'Gavi');

        var promise = fetch('/api/people', {
                method: 'POST',
                body: data
            });
        
        promise.then((raw) => {
                return raw.json();
            })
            .then((info) => {
                console.log(info);
            });
    });

});