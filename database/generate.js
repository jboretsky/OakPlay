var Facility = require('../models/facility');
var User = require('../models/user');
var Booking = require('../models/booking');

// generate facilities
var facilities_promise = new Promise(function(resolve) {
    Facility.remove({}, function() {

        var f;
        for(var i = 1; i < 6; i++) {
            f = new Facility();
            f.name = 'Tennis';
            f.id = i;
            f.description = 'Tennis Court #' + i + 'is a good tennis court';
            f.save();
        }
        f = new Facility();
        f.name = 'Pool';
        f.id = 1;
        f.description = 'The swimming pool is a good swimming pool';
        f.save();
        for(var i = 1; i < 5; i++) {
            f = new Facility();
            f.name = 'Squash';
            f.id = i;
            f.description = 'Squash Court #' + i + 'is a good squash court';
            f.save();
        }
        for(var i = 1; i < 4; i++) {
            f = new Facility();
            f.name = 'Workout';
            f.id = i;
            f.description = 'Workout room #' + i + 'is a good workout room';
            f.save();
        }
        for(var i = 1; i < 3; i++) {
            f = new Facility();
            f.name = 'Spin';
            f.id = i;
            f.description = 'Spin room #' + i + 'is a good spin room';
            f.save();
        }

        console.log('generated facilities');
        resolve(f._id);
    });
});

// generate users
var users_promise = new Promise(function(resolve) {
    User.remove({}, function() {

        var user = new User();
        user.username = 'user';
        user.password = '$2a$10$C.AlRthdMJsCZ06U3YE1oOyQ9wmvc3cAzV.A.hgjAZzMEMWR/NuB6';
        user.first_name = 'fizzurzt';
        user.last_name = 'lastylast';
        user.info = 'i like green eggs and ham';
        user.email = 'user@gmail.com';
        user.save();

        var admin = new User();
        admin.username = 'admin';
        admin.password = '$2a$10$C.AlRthdMJsCZ06U3YE1oOyQ9wmvc3cAzV.A.hgjAZzMEMWR/NuB6';
        admin.first_name = '1337';
        admin.last_name = 'h4x0r';
        admin.info = 'there is no spoon';
        admin.email = 'admin@gmail.com';
        admin.admin = true;
        admin.save();

        console.log('generated users');
        resolve(user._id);
    });
})

// generate bookings
// this code is called after the facilities_promise and users_promise are "resolved"
// then the ids of our user and one of our facilities is passed using promise_result
// we can then use these ids to build a sample booking
Promise.all([facilities_promise, users_promise]).then(function(promise_result) {
    Booking.remove({}, function() {

        var b = new Booking();
        b.day = 'Mon';
        b.res_id = 0;
        b.timeslot = 2;
        b.duration = 2;
        b.facility = promise_result[0];
        b.user = promise_result[1];
        b.save();

        b = new Booking();
        b.day = 'Tues';
        b.res_id = 1;
        b.timeslot = 7;
        b.duration = 1;
        b.facility = promise_result[0];
        b.user = promise_result[1];
        b.save();

        b = new Booking();
        b.day = 'Wed';
        b.res_id = 2;
        b.timeslot = 5;
        b.duration = 3;
        b.facility = promise_result[0];
        b.user = promise_result[1];
        b.save();

        console.log('generated bookings');
    });
})
