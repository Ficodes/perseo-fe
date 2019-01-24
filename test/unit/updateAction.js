'use strict';

var should = require('should');
var rewire = require('rewire');
var updateAction = rewire('../../lib/models/updateAction.js');
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;
chai.Should();
chai.use(sinonChai);

var noticeExampleV1 = JSON.stringify({
    'subscriptionId': '5b34e37052a01bc4c7e67c34',
    'originator': 'localhost',
    'contextResponses': [
        {
            'contextElement': {
                'type': 'tipeExample1',
                'isPattern': 'false',
                'id': 'sensor-1',
                'attributes': [
                    {
                        'name': 'Attr1',
                        'type': 'Number',
                        'value': '123'
                    }
                ]
            }
        }
    ],
    'subservice': '/test/notices/unit',
    'service': 'utest'
});

var noticeExampleV2 =  JSON.stringify({
    'subscriptionId': '5b311ccb29adb333f843b5f3',
    'data': [
        {
            'id': 'sensorv2-1',
            'type': 'tipeExamplev21',
            'Attr1': {
                'type': 'Number',
                'value': 122,
                'metadata': {}
            }
        }
    ],
    'subservice': '/test/notices/unitv2',
    'service': 'utestv2'
});

// Core mocks
var coreNotice1 = {
    'id': 'ent1',
    'type': 'Room',
    'service': 'utest',
    'subservice': '/test/notices/unit'
};

// StructuredValue
var svValueJson = {
    'aString': 'my string test',
    'aBoolean': true,
    'aNumber': 55,
    'aStringNumber': '77',
    'aJSON': {
        'a1': 'example',
        'a2': 23,
        'a3': {
            'aa1': 'the end'
        }
    }
};
var svValueArray = [1,'dos', '3', {}, [], [1,2,3], {'a': 1, 'b': '2'}];



var action1 = {
    'type': 'update',
    'parameters': {
        'id':'${id}_NGSIv2Test',
        'type':'NGSIv2TypesTest',
        'version': '2',
        'attributes': [
            {
                'name':'streetLightID',
                'type': 'Text',
                'value': '${id}'
            },
            {
                'name':'illuminanceLevel',
                'type': 'Number',
                'value': '${ilumLevel}'
            },
            {
                'name':'lastchange',
                'type': 'DateTime',
                'value': '${lastchange}'
            },
            {
                'name':'district',
                'type': 'Text',
                'value': '${areaServed}'
            },
            {
                'name':'status',
                'type': 'Text',
                'value': '${laststatus}'
            },
            {
                'name':'address',
                'type': 'Address',
                'value': '${streetAddress} ${postalCode}, ${addressLocality}'
            },
            {
                'name':'powerState',
                'type': 'Text',
                'value': '${powerState}'
            },
            {
                'name':'location',
                'type': '${locationType}',
                'value': '${fulllocation}'
            },
            {
                'name': 'fulllatlongArray',
                'type': 'StructuredValue',
                'value': '${fulllatlongArray}'
            }
        ]
    }
};
var event1 = {
    'ruleName': 'switch_on',
    'id': 'AmbientLightSensor:1',
    'stream_1': {
        'lightEv': {
            'underlying': {
                'dateModified__minute': 31,
                'powerState__type': 'Text',
                'dateModified__hour': 12,
                'illuminanceLevel': 80,
                'type': 'Streetlight',
                'isPattern': false,
                'subservice': '/',
                'address__addressCountry': 'Sweden',
                'dateModified__year': 2018,
                'dateModified__monthUTC': 12,
                'dateModified__yearUTC': 2018,
                'dateModified__type': 'DateTime',
                'powerState': 'off',
                'illuminanceLevel__metadata__TimeInstant__type': 'structuredValue',
                'dateModified__dayUTC': 5,
                'id': 'Streetlight:D0CF5EFFFE8A9019',
                'dateModified__iso': '2018-12-05T11:31:39.00Z',
                'dateModified__ts': 1544009499000,
                'dateModified__millisecond': 0,
                'status__type': 'Text',
                'areaServed': 'Stockholm center',
                'dateModified__second': 39,
                'dateModified__hourUTC': 11,
                'noticeTS': 1545091611401,
                'dateModified__month': 12,
                'noticeId': 'd1ef4f90-0258-11e9-990d-8f01eeb8de94',
                'dateModified__millisecondUTC': 0,
                'illuminanceLevel__type': 'Number',
                'service': 'dev_capelon',
                'address__addressLocality': 'Stockholm',
                'dateModified__day': 5,
                'address__streetAddress': 'Vasagatan 1',
                'dateModified__secondUTC': 39,
                'areaServed__type': 'Text',
                'illuminanceLevel__metadata__TimeInstant__attr2': 69,
                'address__type': 'PostalAddress',
                'dateModified__minuteUTC': 31,
                'illuminanceLevel__metadata__TimeInstant__attr1': 'a1',
                'status': 'ok'
            },
            'eventType': {
                'writeableProperties': [
                    {
                        'requiresMapkey': false,
                        'requiresIndex': false,
                        'fragment': false,
                        'indexed': false,
                        'propertyName': 'service',
                        'propertyType': 'class java.lang.String',
                        'mapped': false
                    },
                    {
                        'requiresMapkey': false,
                        'requiresIndex': false,
                        'fragment': false,
                        'indexed': false,
                        'propertyName': 'id',
                        'propertyType': 'class java.lang.String',
                        'mapped': false
                    },
                    {
                        'requiresMapkey': false,
                        'requiresIndex': false,
                        'fragment': false,
                        'indexed': false,
                        'propertyName': 'type',
                        'propertyType': 'class java.lang.String',
                        'mapped': false
                    },
                    {
                        'requiresMapkey': false,
                        'requiresIndex': false,
                        'fragment': false,
                        'indexed': false,
                        'propertyName': 'subservice',
                        'propertyType': 'class java.lang.String',
                        'mapped': false
                    }
                ],
                'metadata': {
                    'propertyAgnostic': false,
                    'applicationPreConfiguredStatic': false,
                    'applicationConfigured': true,
                    'publicName': 'iotEvent',
                    'applicationPreConfigured': true,
                    'typeClass': {
                        'public': true
                    },
                    'primaryName': 'iotEvent',
                    'optionalApplicationType': {}
                },
                'types': {
                    'service': 'class java.lang.String',
                    'id': 'class java.lang.String',
                    'type': 'class java.lang.String',
                    'subservice': 'class java.lang.String'
                },
                'eventTypeId': 1,
                'deepSuperTypes': 'java.util.Collections$EmptyIterator@41526e22',
                'reader': {},
                'underlyingType': 'interface java.util.Map',
                'propertyNames': [
                    'service',
                    'id',
                    'type',
                    'subservice'
                ],
                'name': 'iotEvent',
                'propertyDescriptors': [
                    {
                        'requiresMapkey': false,
                        'requiresIndex': false,
                        'fragment': false,
                        'indexed': false,
                        'propertyName': 'service',
                        'propertyType': 'class java.lang.String',
                        'mapped': false
                    },
                    {
                        'requiresMapkey': false,
                        'requiresIndex': false,
                        'fragment': false,
                        'indexed': false,
                        'propertyName': 'id',
                        'propertyType': 'class java.lang.String',
                        'mapped': false
                    },
                    {
                        'requiresMapkey': false,
                        'requiresIndex': false,
                        'fragment': false,
                        'indexed': false,
                        'propertyName': 'type',
                        'propertyType': 'class java.lang.String',
                        'mapped': false
                    },
                    {
                        'requiresMapkey': false,
                        'requiresIndex': false,
                        'fragment': false,
                        'indexed': false,
                        'propertyName': 'subservice',
                        'propertyType': 'class java.lang.String',
                        'mapped': false
                    }
                ]
            },
            'properties': {
                'dateModified__minute': 31,
                'powerState__type': 'Text',
                'dateModified__hour': 12,
                'illuminanceLevel': 80,
                'type': 'Streetlight',
                'isPattern': false,
                'subservice': '/',
                'address__addressCountry': 'Sweden',
                'dateModified__year': 2018,
                'dateModified__monthUTC': 12,
                'dateModified__yearUTC': 2018,
                'dateModified__type': 'DateTime',
                'powerState': 'off',
                'illuminanceLevel__metadata__TimeInstant__type': 'structuredValue',
                'dateModified__dayUTC': 5,
                'id': 'Streetlight:D0CF5EFFFE8A9019',
                'dateModified__iso': '2018-12-05T11:31:39.00Z',
                'dateModified__ts': 1544009499000,
                'dateModified__millisecond': 0,
                'status__type': 'Text',
                'areaServed': 'Stockholm center',
                'dateModified__second': 39,
                'dateModified__hourUTC': 11,
                'noticeTS': 1545091611401,
                'dateModified__month': 12,
                'noticeId': 'd1ef4f90-0258-11e9-990d-8f01eeb8de94',
                'dateModified__millisecondUTC': 0,
                'illuminanceLevel__type': 'Number',
                'service': 'dev_capelon',
                'address__addressLocality': 'Stockholm',
                'dateModified__day': 5,
                'address__streetAddress': 'Vasagatan 1',
                'dateModified__secondUTC': 39,
                'areaServed__type': 'Text',
                'illuminanceLevel__metadata__TimeInstant__attr2': 69,
                'address__type': 'PostalAddress',
                'dateModified__minuteUTC': 31,
                'illuminanceLevel__metadata__TimeInstant__attr1': 'a1',
                'status': 'ok'
            }
        }
    },
    'stream_0': {
        'ev': {
            'underlying': {
                'dateModified__minute': 31,
                'dateModified__hour': 12,
                'type': 'AmbientLightSensor',
                'isPattern': false,
                'subservice': '/',
                'illuminance__type': 'Number',
                'dateModified__year': 2018,
                'dateModified__monthUTC': 12,
                'dateModified__yearUTC': 2018,
                'dateModified__type': 'DateTime',
                'dateModified__dayUTC': 5,
                'id': 'AmbientLightSensor:1',
                'dateModified__iso': '2018-12-05T11:31:40.00Z',
                'dateModified__ts': 1544009500000,
                'dateModified__millisecond': 0,
                'dateModified__second': 40,
                'dateModified__hourUTC': 11,
                'noticeTS': 1545091618126,
                'dateModified__month': 12,
                'noticeId': 'd5f176e0-0258-11e9-990d-8f01eeb8de94',
                'dateModified__millisecondUTC': 0,
                'illuminance': 12,
                'service': 'dev_capelon',
                'dateModified__day': 5,
                'dateModified__secondUTC': 40,
                'dateModified__minuteUTC': 31
            },
            'eventType': {
                'writeableProperties': [
                    {
                        'requiresMapkey': false,
                        'requiresIndex': false,
                        'fragment': false,
                        'indexed': false,
                        'propertyName': 'service',
                        'propertyType': 'class java.lang.String',
                        'mapped': false
                    },
                    {
                        'requiresMapkey': false,
                        'requiresIndex': false,
                        'fragment': false,
                        'indexed': false,
                        'propertyName': 'id',
                        'propertyType': 'class java.lang.String',
                        'mapped': false
                    },
                    {
                        'requiresMapkey': false,
                        'requiresIndex': false,
                        'fragment': false,
                        'indexed': false,
                        'propertyName': 'type',
                        'propertyType': 'class java.lang.String',
                        'mapped': false
                    },
                    {
                        'requiresMapkey': false,
                        'requiresIndex': false,
                        'fragment': false,
                        'indexed': false,
                        'propertyName': 'subservice',
                        'propertyType': 'class java.lang.String',
                        'mapped': false
                    }
                ],
                'metadata': {
                    'propertyAgnostic': false,
                    'applicationPreConfiguredStatic': false,
                    'applicationConfigured': true,
                    'publicName': 'iotEvent',
                    'applicationPreConfigured': true,
                    'typeClass': {
                        'public': true
                    },
                    'primaryName': 'iotEvent',
                    'optionalApplicationType': {}
                },
                'types': {
                    'service': 'class java.lang.String',
                    'id': 'class java.lang.String',
                    'type': 'class java.lang.String',
                    'subservice': 'class java.lang.String'
                },
                'eventTypeId': 1,
                'deepSuperTypes': 'java.util.Collections$EmptyIterator@41526e22',
                'reader': {},
                'underlyingType': 'interface java.util.Map',
                'propertyNames': [
                    'service',
                    'id',
                    'type',
                    'subservice'
                ],
                'name': 'iotEvent',
                'propertyDescriptors': [
                    {
                        'requiresMapkey': false,
                        'requiresIndex': false,
                        'fragment': false,
                        'indexed': false,
                        'propertyName': 'service',
                        'propertyType': 'class java.lang.String',
                        'mapped': false
                    },
                    {
                        'requiresMapkey': false,
                        'requiresIndex': false,
                        'fragment': false,
                        'indexed': false,
                        'propertyName': 'id',
                        'propertyType': 'class java.lang.String',
                        'mapped': false
                    },
                    {
                        'requiresMapkey': false,
                        'requiresIndex': false,
                        'fragment': false,
                        'indexed': false,
                        'propertyName': 'type',
                        'propertyType': 'class java.lang.String',
                        'mapped': false
                    },
                    {
                        'requiresMapkey': false,
                        'requiresIndex': false,
                        'fragment': false,
                        'indexed': false,
                        'propertyName': 'subservice',
                        'propertyType': 'class java.lang.String',
                        'mapped': false
                    }
                ]
            },
            'properties': {
                'dateModified__minute': 31,
                'dateModified__hour': 12,
                'type': 'AmbientLightSensor',
                'isPattern': false,
                'subservice': '/',
                'illuminance__type': 'Number',
                'dateModified__year': 2018,
                'dateModified__monthUTC': 12,
                'dateModified__yearUTC': 2018,
                'dateModified__type': 'DateTime',
                'dateModified__dayUTC': 5,
                'id': 'AmbientLightSensor:1',
                'dateModified__iso': '2018-12-05T11:31:40.00Z',
                'dateModified__ts': 1544009500000,
                'dateModified__millisecond': 0,
                'dateModified__second': 40,
                'dateModified__hourUTC': 11,
                'noticeTS': 1545091618126,
                'dateModified__month': 12,
                'noticeId': 'd5f176e0-0258-11e9-990d-8f01eeb8de94',
                'dateModified__millisecondUTC': 0,
                'illuminance': 12,
                'service': 'dev_capelon',
                'dateModified__day': 5,
                'dateModified__secondUTC': 40,
                'dateModified__minuteUTC': 31
            }
        }
    },
    'lastLightIllum': 80,
    'subservice': '/',
    'service': 'dev_capelon',
    'fiwarePerseoContext': {
        'path': '/actions/do',
        'op': '/actions/do',
        'comp': 'perseo-fe',
        'trans': 'f8636710-5fc6-4070-9b1e-8d414fc6522a',
        'corr': 'd5f0a9cc-0258-11e9-b678-0242ac160003; perseocep=15',
        'srv': 'dev_capelon',
        'subsrv': '/'
    }
};

var expectedChanges = {
    'illuminanceLevel2': {
        'value': {},
        'type': 'Number'
    },
    'lastLightIllum': {
        'value': 80,
        'type': 'Number'
    },
    'id': 'AmbientLightSensor:1',
    'type': '[?]'
};

describe('doIt', function() {

    describe('#NGSIv2 simple updateAction', function() {
        var v1notice, v2notice;

        beforeEach(function () {
            v1notice = JSON.parse(noticeExampleV1);
            v2notice = JSON.parse(noticeExampleV2);
        });

        it('should accept NGSIv1 entities', function (done) {

            // Mocks
            var createEntityThen = sinon.spy(function (successCB, errorCB) {
                setTimeout(function () {
                    successCB({'httpCode': '200', 'message': 'all right'}); // success callback
                }, 0);
                return '__TEST';
            });
            var createEntityMock = sinon.spy(
                function (changes, options) {
                    return {'then': createEntityThen};
                }
            );
            var NGSICloseMock = sinon.spy(
                function () {
                    return 'closed';
                }
            );
            var NGSIConnectionMock = sinon.spy(
                function () {
                    return {
                        'v2': {'createEntity': createEntityMock},
                        'close': NGSICloseMock
                    };
                }
            );

            updateAction.__with__({
                'NGSI.Connection': NGSIConnectionMock
            })(function () {
                var callback = function (e, request) {
                    should.exist(request);
                    request.should.not.be.instanceof(Error);
                    should.equal(request.httpCode, 200);
                    createEntityMock.should.be.calledOnceWith(expectedChanges, {upsert: true});
                    done();
                };
                updateAction.doIt(action1, event1, callback);
            });
        });

    });
});