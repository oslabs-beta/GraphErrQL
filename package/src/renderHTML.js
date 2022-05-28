export const renderHTML = (options) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <h1>hey</h1>
        <div id="root"></div>
        <script type="text/javascript">
        window.addEventListener('load', function (event) {
            const root = document.getElementById('root');
            console.log(window.GraphERRQL)
            window.GraphERRQL.init(root);
        })
        </script>
    </body>
    </html>
    `;
};