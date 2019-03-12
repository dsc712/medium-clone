module.exports = ( server, app ) => {
    const handler = app.getRequestHandler();

    server.get('*', ( req, res ) => {
        return handler( req, res );
    })
};