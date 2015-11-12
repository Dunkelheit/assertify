# assertify

Automatically generates `chai` assertions.

## Usage

```javascript
var assertify = require('assertify');

// Given a variable you want to make assertions for
var store = {
    id: '3605',
    name: 'Fnac Preciados',
    street: 'Calle Preciados, 28',
    zip: '28013',
    city: 'Madrid',
    latitude: 40.419027,
    longitude: -3.705254,
    openingTimes: [{
        date: 1439456166345,
        time: '08:00 - 20:00',
        today: true
    }],
    type: 'store',
    homeStore: false,
    newStore: true
};

assertify(store);

// Outputs
chai.expect(var).to.be.an('object');
chai.expect(var).to.have.keys('id', 'name', 'street', 'zip', 'city', 
    'latitude', 'longitude', 'openingTimes', 'type', 'homeStore', 'newStore');
chai.expect(var.id).to.be.a('string');
chai.expect(var.id).to.be.eql('3605');
chai.expect(var.name).to.be.a('string');
chai.expect(var.name).to.be.eql('Fnac Preciados');
chai.expect(var.street).to.be.a('string');
chai.expect(var.street).to.be.eql('Calle Preciados, 28');
chai.expect(var.zip).to.be.a('string');
chai.expect(var.zip).to.be.eql('28013');
chai.expect(var.city).to.be.a('string');
chai.expect(var.city).to.be.eql('Madrid');
chai.expect(var.latitude).to.be.a('number');
chai.expect(var.latitude).to.be.eql(40.419027);
chai.expect(var.longitude).to.be.a('number');
chai.expect(var.longitude).to.be.eql(-3.705254);
chai.expect(var.openingTimes).to.be.an('array');
chai.expect(var.openingTimes).to.have.length(1);
chai.expect(var.openingTimes[0].date).to.be.a('number');
chai.expect(var.openingTimes[0].date).to.be.eql(1439456166345);
chai.expect(var.openingTimes[0].time).to.be.a('string');
chai.expect(var.openingTimes[0].time).to.be.eql('08:00 - 20:00');
chai.expect(var.openingTimes[0].today).to.be.a('boolean');
chai.expect(var.openingTimes[0].today).to.be.eql('true');
chai.expect(var.type).to.be.a('string');
chai.expect(var.type).to.be.eql('store');
chai.expect(var.homeStore).to.be.a('boolean');
chai.expect(var.homeStore).to.be.eql('false');
chai.expect(var.newStore).to.be.a('boolean');
chai.expect(var.newStore).to.be.eql('true');

```
