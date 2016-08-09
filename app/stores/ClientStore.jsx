import Radium from 'radium';
import alt from '../alt';
import ClientActions from '../actions/ClientActions';

class ClientStore {

	constructor() {

        this.clients = [];

        this.bindListeners({
            createClient: ClientActions.create
        });

        this.on('unlisten', () => {
            localStorage.setItem("snapshot", alt.takeSnapshot());
        });

    }



    createClient(client) {
        this.clients = this.clients.concat([client]);
    }
}
export default alt.createStore(ClientStore, 'ClientStore');
