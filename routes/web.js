module.exports = ( server, app ) => {
    const handler = app.getRequestHandler();

    server.get('/stories/:story', (req,res) => {
        app.render(req, res, '/story/new', Object.assign({}, req.params, req.query ));
    });
    server.get('*', ( req, res ) => {
        return handler( req, res );
    })
};