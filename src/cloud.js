Parse.Cloud.afterSave('_User', async request => {

    // Parse.Cloud.afterLogin(async request => {
    console.log(" ***********************************afterSave")
    console.log("afterSave")
    const { object: user } = request;
});

Parse.Cloud.beforeLogin(async request => {
    console.log(" ***********************************beforeLogin")
    console.log("beforeLogin")
    const { object: user } = request;

    if (user.get('isBanned')) {
        throw new Error('Access denied, you have been banned.')
    }
});

Parse.Cloud.afterLogin(async request => {

    console.log(" ***********************************afterLogin")
    console.log("afterLogin")
    const { object: user } = request;
});

Parse.Cloud.afterLogout(async request => {
    console.log("afterLogout")
    const { object: session } = request;
    const user = session.get('user');
    user.set('isOnline', false);
    user.save(null, { useMasterKey: true });
});