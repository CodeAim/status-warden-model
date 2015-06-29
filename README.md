# Status Warden Model

The status warden model is the mongoose data model used throughout the status warden application stack for interfacing with the underlying mongodb database.

### Installation

```bash
$ npm install status-warden-model
```
### Example Usage

```js
var model = require('status-warden-model');

var monitor = new Monitor({
	job: (job-id)
	name: 'Status Warden Monitor',
	url: 'http://www.statuswarden.com',
	user: (user-id)
});

monitor.save(function(err, monitor) {
  	if (err) return console.error(err);
  	console.dir(monitor);
});
```

### Model Entities

Job - A job is a defined task scheduled to be carried out at a point in the future eg. email notifications, url status check.

Monitor - A monitor contains a web address that is periodically requested to monitor the urls status for a particular user.

MonitorEvent - A monitor event stores information regarding events occuring on a particular monitor.

User - This holds details of a particular user account, including authentication details, email, display name and roles.

# Status Warden

Status Warden is a status monitoring service for supervising web address health. The warden monitors the status of a web address at a configurable interval and provides serviceable intelligence through email notifications and a web based dashboard.

### Features

* Periodic monitoring of web addresses
* Email notifications on status change
* Configurable monitoring interval
* Basic authentication
* REST style facade API
* Web based dashboard

### Related Links & Documents

- [Status Warden](http://www.statuswarden.com), the software as a service implementation
- The status warden model [npm package](https://www.npmjs.com/package/status-warden-model)
- Other status warden github repositories
 - [status-warden-api](https://github.com/codeaim/status-warden-api) - The status warden rest api
 - [status-warden-database](https://github.com/codeaim/status-warden-database) - The status warden mongodb database
 - [status-warden-scheduler](https://github.com/codeaim/status-warden-scheduler) - The status warden scheduler and background processor
 - [status-warden-web](https://github.com/codeaim/status-warden-web) - The status warden web based dashboard
