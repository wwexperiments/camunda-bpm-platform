'use strict';

var testHelper = require('../../test-helper');
var setupFile = require('./process-setup');

var dashboardPage = require('../pages/dashboard');
var definitionPage = require('../pages/process-definition');
var instancePage = require('../pages/process-instance');

describe('Cockpit Process Definition Filter Spec', function() {

  describe('filter by variable', function() {

    before(function() {
      return testHelper(setupFile, function() {
        dashboardPage.navigateToWebapp('Cockpit');
        dashboardPage.authentication.userLogin('admin', 'admin');
        dashboardPage.deployedProcessesList.selectProcess(0);
      });
    });


    it('should add new filter', function() {

      // when
      definitionPage.filter.addFilterByVariable('test = 1.5');

      browser.sleep(3000);

      // then
      expect(definitionPage.processInstancesTab.table().count()).to.eventually.eql(2);
    });


    it('should add second filter', function() {

      // when
      definitionPage.filter.addFilterByVariable('myString = \"abc dfg\"');

      browser.sleep(3000);

      // then
      expect(definitionPage.processInstancesTab.table().count()).to.eventually.eql(1);
      expect(definitionPage.processInstancesTab.instanceBusinessKey(0)).to.eventually.eql('Instance2');
    });


    it('should remove the first filter', function() {

      // when
      definitionPage.filter.removeVariableFilter(0);

      // then
      expect(definitionPage.processInstancesTab.table().count()).to.eventually.eql(2);
    });


    it('should add like filter', function() {

      // given
      definitionPage.filter.removeVariableFilter(0);

      // when
      definitionPage.filter.addFilterByVariable('myString like \"123%\"');

      browser.sleep(3000);

      // then
      expect(definitionPage.processInstancesTab.table().count()).to.eventually.eql(1);
      expect(definitionPage.processInstancesTab.instanceBusinessKey(0)).to.eventually.eql('Instance1');
    });

  });


  describe('filter by business key and variable', function() {

    before(function() {
      return testHelper(setupFile, function() {
        dashboardPage.navigateToWebapp('Cockpit');
        dashboardPage.authentication.userLogin('admin', 'admin');
        dashboardPage.deployedProcessesList.selectProcess(0);
      });
    });


    it('should add new filter', function() {

      // when
      definitionPage.filter.addFilterByBusinessKey('myBusinessKey')

      browser.sleep(3000);

      // then
      expect(definitionPage.processInstancesTab.table().count()).to.eventually.eql(1);
      expect(definitionPage.processInstancesTab.instanceBusinessKey(0)).to.eventually.eql('myBusinessKey');
    });


    it('should remove the filter', function() {

      // when
      definitionPage.filter.removeBusinessKeyFilter();

      // then
      expect(definitionPage.processInstancesTab.table().count()).to.eventually.eql(3);
    });


    it('should combine variable filter and business key filter', function(done) {

      // when
      definitionPage.filter.addFilterByVariable('test>1.49');

      // then
      expect(definitionPage.processInstancesTab.table().count()).to.eventually.eql(2);

      // when
      definitionPage.filter.addFilterByBusinessKey('Instance1');

      // then
      expect(definitionPage.processInstancesTab.table().count()).to.eventually.eql(1);
      expect(definitionPage.processInstancesTab.instanceBusinessKey(0)).to.eventually.eql('Instance1');
    });

  });


  describe.skip('filtering with long expressions', function() {

    before(function() {
      return testHelper(setupFile, function() {
        dashboardPage.navigateToWebapp('Cockpit');
        dashboardPage.authentication.userLogin('admin', 'admin');
        dashboardPage.deployedProcessesList.selectProcess(0);
      });
    });

    afterEach(function() {
      definitionPage.filter.removeVariableFilter(0);
    });

    it('should filter date', function() {

      // when
      definitionPage.filter.addFilterByVariable('myDate  =  2011-11-11T11:11:11');

      browser.sleep(3000);

      // then
      expect(definitionPage.processInstancesTab.table().count()).to.eventually.eql(1);
      expect(definitionPage.processInstancesTab.instanceBusinessKey(0)).to.eventually.eql('myBusinessKey');
    });


    it('should filter long variable', function() {

      // when
      definitionPage.filter.addFilterByVariable('extraLong=1234567890987654321');

      browser.sleep(3000);

      // then
      expect(definitionPage.processInstancesTab.table().count()).to.eventually.eql(1);
      expect(definitionPage.processInstancesTab.instanceBusinessKey(0)).to.eventually.eql('Instance1');
    });

  });


  describe('filtering dates', function() {

    before(function() {
      return testHelper(setupFile, function() {
        dashboardPage.navigateToWebapp('Cockpit');
        dashboardPage.authentication.userLogin('admin', 'admin');
        dashboardPage.deployedProcessesList.selectProcess(0);
      });
    });

    it('should add date filter', function() {

      // when
      definitionPage.processInstancesTab.instanceStartTime(0).then(function(startTime) {
        definitionPage.filter.addFilterByStartDate('after', startTime);
      });

      // then
      expect(definitionPage.processInstancesTab.table().count()).to.eventually.eql(3);
    });

  });

});
