module.exports = function(body) {
    return `
    <!doctype html>
    <html class="no-js" lang="en">
        <head>
            <meta charset="utf-8">
            <meta http-equiv="x-ua-compatible" content="ie=edge">
            <title>throwaway email service</title>
            <meta name="description" content="">
            <meta name="theme-color" content="#000000">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro' rel='stylesheet' type='text/css'>
            <style>html{font-family: 'Source Sans Pro', sans-serif;}</style>
        </head>
        <body>
            ${body}
        </body>
    </html>
`;
}
