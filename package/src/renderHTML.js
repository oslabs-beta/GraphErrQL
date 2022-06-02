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
        <div id="root"></div>
        <script src="https://grapherrql-bucket.s3.us-east-2.amazonaws.com/grapherrqlLibrary.index.js"></script>
        <script type="text/javascript">
        window.addEventListener('load', function (event) {
            const root = document.getElementById('root');
            window.GraphERRQL.init(root);
        })
        </script>
    </body>
    </html>
    `;
};
