'use strict'

var should = require('should');
var rewire = require('rewire');
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;
chai.use(sinonChai);

var perseo = rewire('../../bin/perseo');
var getNormalizedBoolVar = perseo.__get__('getNormalizedBoolVar');
var loadConfiguration = perseo.__get__('loadConfiguration');

var validPositiveBoolVars = ['true', 'on', '1', 'TRUE', 'True', '  true', '  true  ', '1  ', 'ON', '  ON'];
var validNegativeBoolVars = ['false', 'off', '0', 'FALSE', 'False', '  false', ' False  ', '0  ', 'OFF', '  OFF'];

var validLogLevels = ['FATAL', 'ERROR', 'INFO', 'DEBUG', 'fatal', 'error', 'infO', 'Debug'];

describe('Perseo', function() {

    describe('#loadConfiguration', function() {

        it('should set default log level info if env var is not valid', function (done) {

            var invalidLevel = 'InvLev';
            var logWarnMock = sinon.spy(function() {});
            var logInfoMock = sinon.spy(function() {});
            var setLevelMock = sinon.spy(function() {});
            var config = sinon.spy(function() {});
            var endpoint = sinon.spy(function() {});
            perseo.__with__({
                'config': config,
                'config.endpoint': endpoint,
                'process.env.PERSEO_LOG_LEVEL': invalidLevel,
                'logger.warn': logWarnMock,
                'logger.info': logInfoMock,
                'logger.setLevel': setLevelMock
            })(function () {
                loadConfiguration();
                expect(config.logLevel).to.be.equal('INFO');
                expect(logWarnMock).to.have.been.calledOnceWith('Ignoring invalid PERSEO_LOG_LEVEL: %s', invalidLevel);
                expect(setLevelMock).to.have.been.calledOnceWith('INFO');
                expect(logInfoMock).to.have.been.calledOnceWith('Log level: %s', 'INFO');
                done();
            });
        });

        it('should set valid log level', function (done) {

            var logWarnMock = sinon.spy(function() {});
            var logInfoMock = sinon.spy(function() {});
            var setLevelMock = sinon.spy(function() {});
            var config = sinon.spy(function() {});
            var endpoint = sinon.spy(function() {});
            perseo.__with__({
                'config': config,
                'config.endpoint': endpoint,
                'process.env.PERSEO_LOG_LEVEL': 'FATAL',
                'logger.warn': logWarnMock,
                'logger.info': logInfoMock,
                'logger.setLevel': setLevelMock
            })(function () {
                loadConfiguration();
                expect(config.logLevel).to.be.equal('FATAL');
                expect(setLevelMock).to.have.been.calledOnceWith('FATAL');
                expect(logInfoMock).to.have.been.calledOnceWith('Log level: %s', 'FATAL');
                done();
            });
        });


        it('should accept diferent ways to indicate the log level', function (done) {

            var logWarnMock = sinon.spy(function() {});
            var logInfoMock = sinon.spy(function() {});
            var setLevelMock = sinon.spy(function() {});
            var config = sinon.spy(function() {});
            var endpoint = sinon.spy(function() {});
            perseo.__with__({
                'config': config,
                'config.endpoint': endpoint,
                'logger.warn': logWarnMock,
                'logger.info': logInfoMock,
                'logger.setLevel': setLevelMock
            })(function () {
                validLogLevels.forEach(function(l) {
                    process.env.PERSEO_LOG_LEVEL = l;
                    loadConfiguration();
                    expect(config.logLevel).to.be.equal(l);
                    expect(setLevelMock).to.have.been.calledWith(l);
                    expect(logInfoMock).to.have.been.calledWith('Log level: %s', l);
                });
                done();
            });
        });


        it('should load valid SMTP environment variables', function (done) {

            var config = sinon.spy(function() {});
            var endpoint = sinon.spy(function() {});
            perseo.__with__({
                'config': config,
                'config.endpoint': endpoint,
                'process.env.PERSEO_SMTP_PORT': 123,
                'process.env.PERSEO_SMTP_HOST': 'examplehost',
                'process.env.PERSEO_SMTP_VERIFY_CA': true,
                'process.env.PERSEO_SMTP_SECURE': true,
                'process.env.PERSEO_SMTP_AUTH_USER': 'fakeUser',
                'process.env.PERSEO_SMTP_AUTH_PASS': 'fakePasword'
            })(function () {
                loadConfiguration();
                expect(config.smtp.port).to.be.equal('123');
                expect(config.smtp.host).to.be.equal('examplehost');
                expect(config.smtp.secure).to.be.equal(true);
                expect(config.smtp.tls.rejectUnauthorized).to.be.equal(true);
                expect(config.smtp.auth.user).to.be.equal('fakeUser');
                expect(config.smtp.auth.pass).to.be.equal('fakePasword');
                done();
            });
        });
        /* TODO test the other env vars */
    });

    describe('#getNormalizedBoolVar', function() {

        it('should normalize TRUE valid boolean vars correctly', function (done) {
            perseo.__with__({
                'process.env.exampleBoolVar' : 'ImGoingToFail'
            })(function () {
                validPositiveBoolVars.forEach(function(v) {
                    process.env.exampleBoolVar = v;
                    expect(getNormalizedBoolVar('exampleBoolVar', false)).to.be.true;
                });
                done();
            });
        });

        it('should normalize FALSE valid boolean vars correctly', function (done) {
            perseo.__with__({
                'process.env.exampleBoolVar' : 'VoyAFallar'
            })(function () {
                validNegativeBoolVars.forEach(function(v) {
                    process.env.exampleBoolVar = v;
                    expect(getNormalizedBoolVar('exampleBoolVar', true)).to.be.false;
                });
                done();
            });
        });

        it('should return default value if not exist the environment variable', function (done) {

            expect(getNormalizedBoolVar('nonExistentBoolVar', true)).to.be.true;
            done();
        });

        it('should return default value and log with invalid environment variable', function (done) {

            var logErrorMock = sinon.spy(function() {});
            perseo.__with__({
                'logger.warn': logErrorMock,
                'process.env.exampleBoolVar' : 'VoyAFallar'
            })(function () {
                expect(getNormalizedBoolVar('exampleBoolVar', true)).to.be.true;
                expect(logErrorMock).to.have.been.calledOnceWith('Invalid "%s" environment var value. (%s) Should be ' +
                                                                 'Boolean', 'exampleBoolVar', 'VoyAFallar');
                done();
            });
        });
    });
});