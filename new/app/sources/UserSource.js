import _ from 'lodash';
import UserActions from '../actions/UserActions';

export default {
    fetchRemoteUsers: {
        remote(state, account) {
            return account.getRecommendations(100)
                .then((users) => {
                    _.forEach(users, (user) => {
                        user.email = account.email;
                    });

                    users = _.filter(users, (user) => {
                        return !_.isNull(user);
                    });


                    return users;
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    //this.actions.loadingUsers();
                })
        },
        loading: UserActions.loadingUsers,
        success: UserActions.receivedUsers,
        error: UserActions.fetchingUserFailed,
    }
}

