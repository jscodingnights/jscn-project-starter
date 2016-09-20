var server = _http2.default.createServer(app);

server.listen(process.env.PORT || 3000, '0.0.0.0', function () {
    console.log('JSCN Server is running: 3000');
});

exports.default = app;
