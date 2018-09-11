'use strict';

var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;
chai.Should();
chai.use(sinonChai);
// for requires moking
var proxyquire =  require('proxyquire');
expect(proxyquire).exist;

var validLogLevels = ['FATAL', 'ERROR', 'INFO', 'DEBUG', 'fatal', 'error', 'infO', 'Debug'];


describe('Perseo', function() {

    describe('#loadConfiguration', function() {
        afterEach(function () {
            delete process.env.PERSEO_LOG_LEVEL;
            delete process.env.PERSEO_SMTP_PORT;
            delete process.env.PERSEO_SMTP_HOST;
            delete process.env.PERSEO_SMTP_VERIFY_CA;
            delete process.env.PERSEO_SMTP_SECURE;
            delete process.env.PERSEO_SMTP_AUTH_USER;
            delete process.env.PERSEO_SMTP_AUTH_PASS;
        });
        it('should set default log level info if env var is not valid', function (done) {

            var invalidLevel = 'invalidLogLevel';
            var perseoMock = sinon.spy(function() {});
            var logWarnMock = sinon.spy(function() {});
            var logInfoMock = sinon.spy(function() {});
            var setLevelMock = sinon.spy(function() {});
            var config = sinon.spy(function() {return {}});

            // Set Log level
            process.env.PERSEO_LOG_LEVEL = invalidLevel;

            // Perseo autocall loadConfiguration when is required
            proxyquire('../../bin/perseo',
                {
                    '../lib/perseo': {
                        start : perseoMock
                    },
                    'logops': {
                        warn: logWarnMock,
                        info: logInfoMock,
                        setLevel: setLevelMock
                    },
                    '../config': config
                }
            );

            expect(config.logLevel).to.be.equal('INFO');
            logWarnMock.should.have.been.calledWith('Ignoring invalid PERSEO_LOG_LEVEL: %s', invalidLevel);
            logWarnMock.should.be.calledOnce;
            setLevelMock.should.have.been.calledWith('INFO');
            setLevelMock.should.be.calledOnce;
            logInfoMock.should.have.been.calledWith('Log level: %s', 'INFO');
            logInfoMock.should.be.calledOnce;
            done();

        });

        it('should set valid log level', function (done) {

            var perseoMock = sinon.spy(function() {});
            var logWarnMock = sinon.spy(function() {});
            var logInfoMock = sinon.spy(function() {});
            var setLevelMock = sinon.spy(function() {});
            var config = sinon.spy(function() {});

            // Set Log level
            process.env.PERSEO_LOG_LEVEL = 'FATAL';

            // Perseo autocall loadConfiguration when is required
            proxyquire('../../bin/perseo',
                {
                    '../lib/perseo': {
                        start : perseoMock
                    },
                    'logops': {
                        warn: logWarnMock,
                        info: logInfoMock,
                        setLevel: setLevelMock
                    },
                    '../config': config
                }
            );

            expect(config.logLevel).to.be.equal('FATAL');
            expect(setLevelMock).to.have.been.calledOnceWith('FATAL');
            logInfoMock.should.have.been.calledWith('Log level: %s', 'FATAL');
            logInfoMock.should.be.calledOnce;
            done();
        });


        it('should accept diferent ways to indicate the log level', function (done) {

            var perseoMock = sinon.spy(function() {});
            var logWarnMock = sinon.spy(function() {});
            var logInfoMock = sinon.spy(function() {});
            var setLevelMock = sinon.spy(function() {});
            var config = sinon.spy(function() {});

            validLogLevels.forEach(function(l) {
                // Set Log level
                process.env.PERSEO_LOG_LEVEL = l;
                // Perseo autocall loadConfiguration when is required
                proxyquire('../../bin/perseo',
                    {
                        '../lib/perseo': {
                            start : perseoMock
                        },
                        'logops': {
                            warn: logWarnMock,
                            info: logInfoMock,
                            setLevel: setLevelMock
                        },
                        '../config': config
                    }
                );
                expect(config.logLevel).to.be.equal(l);
                expect(setLevelMock).to.have.been.calledWith(l);
                expect(logInfoMock).to.have.been.calledWith('Log level: %s', l);
            });
            done();
        });


        it('should load valid SMTP environment variables', function (done) {

            var perseoMock = sinon.spy(function() {});
            var logWarnMock = sinon.spy(function() {});
            var logInfoMock = sinon.spy(function() {});
            var setLevelMock = sinon.spy(function() {});
            var config = sinon.spy(function() {});

            // Set Log level
            process.env.PERSEO_SMTP_PORT = 123;
            process.env.PERSEO_SMTP_HOST = 'examplehost';
            process.env.PERSEO_SMTP_VERIFY_CA = true;
            process.env.PERSEO_SMTP_SECURE = true;
            process.env.PERSEO_SMTP_AUTH_USER = 'fakeUser';
            process.env.PERSEO_SMTP_AUTH_PASS = 'fakePasword';

            // Perseo autocall loadConfiguration when is required
            proxyquire('../../bin/perseo',
                {
                    '../lib/perseo': {
                        start : perseoMock
                    },
                    'logops': {
                        warn: logWarnMock,
                        info: logInfoMock,
                        setLevel: setLevelMock
                    },
                    '../config': config
                }
            );
            expect(config.smtp.port).to.be.equal('123');
            expect(config.smtp.host).to.be.equal('examplehost');
            expect(config.smtp.secure).to.be.equal(true);
            expect(config.smtp.tls.rejectUnauthorized).to.be.equal(true);
            expect(config.smtp.auth.user).to.be.equal('fakeUser');
            expect(config.smtp.auth.pass).to.be.equal('fakePasword');
            done();
        });
        // TODO test the other env vars
    });
});
