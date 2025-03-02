<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Asynchronous Progr. Example</title>
</head>
<body>

    <h1> A Asynchronous Programming Example</h1>
   ................... <br>
    <br>
    <br>
    <br>
    <br>
    <br>


    <h2>Callback</h2>
    <button id="callbackButton">Click me!</button>
    <div id="callbackOutput"></div>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>

    
    <h2>Example for Promises</h2>
    <button id="promiseButton">Click me!</button>
    <div id="promiseOutput"></div>   
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <h2>An Example for Async Await</h2>
    <button id="asyncButton">Click me!</button>
    <div id="asyncOutput"></div>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>

    <script>
        document.getElementById('callbackButton').addEventListener('click', function() {
            setTimeout(function() {
                document.getElementById('callbackOutput').innerText = "Callback executed after 5 seconds";
                retrieveDataWithCallback();
            }, 5000);
        });

        function retrieveDataWithCallback() {
            fetch('https://dummyjson.com/posts')
                .then(response => response.json())
                .then(data => {
                    const titles = data.posts.map(post => post.title).join(', ');
                    document.getElementById('callbackOutput').innerText = titles;
                })
                .catch(err => {
                    document.getElementById('callbackOutput').innerText = "Error fetching data: " + err;
                });
        }

      
        document.getElementById('promiseButton').addEventListener('click', function() {
            document.getElementById('promiseOutput').innerText = "Loading...";
            fetchDataWithPromise()
                .then(data => {
                    document.getElementById('promiseOutput').innerText = data;
                })
                .catch(err => {
                    document.getElementById('promiseOutput').innerText = err;
                });
        });

        function fetchDataWithPromise() {
            return new Promise((resolve, reject) => {
                const timeout = setTimeout(() => {
                    reject("Operation timed out.");
                }, 5000);

                fetch('https://dummyjson.com/posts')
                    .then(response => response.json())
                    .then(data => {
                        clearTimeout(timeout);
                        const titles = data.posts.map(post => post.title).join(', ');
                        resolve(titles);
                    })
                    .catch(err => {
                        clearTimeout(timeout);
                        reject("Error fetching data: " + err);
                    });
            });
        }

        
        document.getElementById('asyncButton').addEventListener('click', async function() {
            document.getElementById('asyncOutput').innerText = "Loading...";
            try {
                const data = await fetchDataAsync();
                document.getElementById('asyncOutput').innerText = data;
            } catch (err) {
                document.getElementById('asyncOutput').innerText = err;
            }
        });

        async function fetchDataAsync() {
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => {
                    reject("Operation timed out.");
                }, 5000);
            });

            const fetchPromise = fetch('https://dummyjson.com/posts')
                .then(response => response.json())
                .then(data => {
                    const titles = data.posts.map(post => post.title).join(', ');
                    return titles;
                });

            return Promise.race([fetchPromise, timeoutPromise]);
        }
    </script>
</body>
</html>
