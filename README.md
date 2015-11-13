# assertify

Automatically generates `chai` assertions.

For lazy developers that want to quickly write their unit tests.

## Example

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

// Just assertify it
assertify(store, { variableName: 'store' });

// The console will output:
chai.expect(store).to.be.an('object');
chai.expect(store).to.have.keys('id', 'name', 'street', 'zip', 'city', 
    'latitude', 'longitude', 'openingTimes', 'type', 'homeStore', 'newStore');
chai.expect(store.id).to.be.a('string');
chai.expect(store.id).to.be.eql('3605');
chai.expect(store.name).to.be.a('string');
chai.expect(store.name).to.be.eql('Fnac Preciados');
chai.expect(store.street).to.be.a('string');
chai.expect(store.street).to.be.eql('Calle Preciados, 28');
chai.expect(store.zip).to.be.a('string');
chai.expect(store.zip).to.be.eql('28013');
chai.expect(store.city).to.be.a('string');
chai.expect(store.city).to.be.eql('Madrid');
chai.expect(store.latitude).to.be.a('number');
chai.expect(store.latitude).to.be.eql(40.419027);
chai.expect(store.longitude).to.be.a('number');
chai.expect(store.longitude).to.be.eql(-3.705254);
chai.expect(store.openingTimes).to.be.an('array');
chai.expect(store.openingTimes).to.have.length(1);
chai.expect(store.openingTimes[0].date).to.be.a('number');
chai.expect(store.openingTimes[0].date).to.be.eql(1439456166345);
chai.expect(store.openingTimes[0].time).to.be.a('string');
chai.expect(store.openingTimes[0].time).to.be.eql('08:00 - 20:00');
chai.expect(store.openingTimes[0].today).to.be.a('boolean');
chai.expect(store.openingTimes[0].today).to.be.eql('true');
chai.expect(store.type).to.be.a('string');
chai.expect(store.type).to.be.eql('store');
chai.expect(store.homeStore).to.be.a('boolean');
chai.expect(store.homeStore).to.be.eql('false');
chai.expect(store.newStore).to.be.a('boolean');
chai.expect(store.newStore).to.be.eql('true');

```

## Usage

### assertify(variable, options)

**Arguments**

* `variable` - Anything you want to make assertions for
* `options` - An optional object defining a number of options:
    * `variableName` - The variable name to render, by default `'foo'`
    * `includeTypes` - Whether to include assertions to check the value type, by default `true`
    * `console` - If truthy, will `console.log` the chai assertions. Can also be a function in case you want custom logging. By default `false`.

## License

[MIT](LICENSE)
