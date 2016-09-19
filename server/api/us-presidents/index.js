import { createJsonServer, readOnlyRoute } from '../utils';
import db from './db';
import votes from './votes';
import summary from './summary';

export default createJsonServer(db)(server => {
    server.use('/candidates/:id?', readOnlyRoute(['put', 'delete']));
    server.use('/votes/:id?', readOnlyRoute(['put', 'delete']));

    server.use('/votes', votes(db));
    server.use('/summary', summary(db));
});
