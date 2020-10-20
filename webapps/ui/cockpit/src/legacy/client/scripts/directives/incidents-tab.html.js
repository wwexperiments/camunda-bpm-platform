/*
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership. Camunda licenses this file to you under the Apache License,
 * Version 2.0; you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

module.exports = `<!-- # CE - camunda-cockpit-ui/client/scripts/directives/incidents-tab.html -->
<div cam-widget-loader
     loading-state="{{ loadingState }}"
     text-empty="{{ 'PLUGIN_INCIDENTS_TAB_NO_INCIDENTS' | translate }}">


<table class="incidents-tab cam-table">

  <thead sortable-table-head
         head-columns="headColumns"
         on-sort-change="onSortChange(query, pages, sortObj)"
         default-sort="sortObj">
  </thead>

  <tbody>
    <tr ng-repeat="incident in incidents">
      <td class="state"
          ng-if="incidentsContext === 'history'">
          {{getIncidentState(incident)}}
      </td>
      <td class="message"
          ng-if="incident.incidentType === 'failedJob'">
        <!--
          it would be great to be able to copy the stacktrace from here
          using the clipboard widget but it comes from an API endpoint...
        -->
        <a ng-if="incident.rootCauseIncidentMessage"
           ng-click="viewVariable(incident)"
           uib-tooltip="{{'PLUGIN_INCIDENTS_TAB_TOOLTIP_STACKTRACE'|translate}}"
           tooltip-placement="top"
           class="auto-cutoff">
          {{ incident.rootCauseIncidentMessage }}
        </a>
        <a ng-if="!incident.rootCauseIncidentMessage"
           ng-click="viewVariable(incident)"
           uib-tooltip="{{'PLUGIN_INCIDENTS_TAB_TOOLTIP_STACKTRACE'|translate}}"
           tooltip-placement="top">
          <i>Message is null.</i>
        </a>
      </td>
      <td class="message"
          uib-tooltip="{{'PLUGIN_INCIDENTS_TAB_TOOLTIP_STACKTRACE'|translate}}"
          tooltip-placement="top"
          ng-if="incident.incidentType === 'failedExternalTask'">
        <a ng-click="viewVariable(incident)">
          <span ng-show="incident.rootCauseIncidentMessage">
            {{ incident.rootCauseIncidentMessage }}
          </span>
          <span ng-show="!incident.rootCauseIncidentMessage">
            <i>Message is null.</i>
          </span>
        </a>
      </td>
      <td class="message"
          ng-if="['failedExternalTask', 'failedJob'].indexOf(incident.incidentType) === -1 && incident.rootCauseIncidentMessage">
        <div class="auto-cutoff"
             cam-widget-clipboard="incident.rootCauseIncidentMessage">
          {{ incident.rootCauseIncidentMessage }}
        </div>
      </td>
      <td class="message"
          ng-if="['failedExternalTask', 'failedJob'].indexOf(incident.incidentType) === -1 && !incident.rootCauseIncidentMessage">
        <i>Message is null.</i>
      </td>

      <td ng-if="processDefinition && incidentsContext === 'history'"
          class="process-instance"
          cam-widget-clipboard="incident.processInstanceId" >
        <a href="#/process-instance/{{ incident.processInstanceId }}/history"> {{incident.processInstanceId}} </a>
      </td>

      <td ng-if="processDefinition && incidentsContext !== 'history'"
          class="process-instance"
          cam-widget-clipboard="incident.processInstanceId" >
        <a href="#/process-instance/{{ incident.processInstanceId }}/runtime"> {{incident.processInstanceId}} </a>
      </td>

      <td  ng-if="incidentsContext !== 'history'" class="timestamp">
        {{ incident.incidentTimestamp | camDate }}
      </td>
      <td ng-if="incidentsContext === 'history'" class="create-time">
        {{ incident.createTime | camDate }}
      </td>
      <td ng-if="incidentsContext === 'history'" class="end-time">
        {{ incident.endTime | camDate }}
      </td>
      <td class="activity">
        <span ng-show="incident.linkable && processDefinition"
              cam-select-activity="incident.activityId"
              cam-widget-clipboard="incident.activityId">
          <a ng-href="#/process-definition/{{ processDefinition.id }}/runtime?activityIds={{ incident.activityId }}&amp;tab=incidents-tab">
            {{ incident.activityName }}
          </a>
        </span>
        <span ng-show="incident.linkable && processInstance"
              cam-widget-clipboard="incident.activityId">
          <a ng-href="#/process-instance/{{ processInstance.id }}/runtime?activityIds={{ incident.activityId }}&amp;tab=incidents-tab">
            {{ incident.activityName }}
          </a>
        </span>
        <span ng-hide="incident.linkable">
          {{ incident.activityName }}
        </span>
      </td>

      <td class="failedActivityId">
        <span ng-if="incident.failedActivityId"
              cam-widget-clipboard="incident.failedActivityId">
          {{ incident.failedActivityName }}
        </span>
      </td>

      <td class="cause instance-id">
        <span ng-show="incident.causeIncidentProcessInstanceId !== incident.processInstanceId"
              cam-widget-clipboard="incident.causeIncidentProcessInstanceId">
          <a ng-href="#/process-instance/{{incident.causeIncidentProcessInstanceId}}/{{ incidentsContext || 'runtime' }}?activityIds={{ incident.causeIncidentActivityId }}&amp;tab=incidents-tab">
            {{ incident.causeIncidentProcessInstanceId }}
          </a>
        </span>
      </td>

      <td class="cause-root instance-id">
        <span ng-show="incident.rootCauseIncidentProcessInstanceId !== incident.processInstanceId"
              cam-widget-clipboard="incident.rootCauseIncidentProcessInstanceId">
          <a ng-href="#/process-instance/{{incident.rootCauseIncidentProcessInstanceId}}/{{ incidentsContext || 'runtime' }}?activityIds={{ incident.rootCauseIncidentActivityId }}&amp;tab=incidents-tab">
            {{ incident.rootCauseIncidentProcessInstanceId }}
          </a>
        </span>
      </td>

      <td class="type">
        {{ getIncidentType(incident) }}
      </td>

      <td class="action">
        <span ng-if="incidentHasActions(incident)"
              ng-repeat="actionProvider in incidentActions">
          <view provider="actionProvider"
            vars="incidentVars" />
        </span>
      </td>
    </tr>
  </tbody>
</table>
<div cam-pagination="onPaginationChange(pages)" total="pages.total"> </div>
</div>
<!-- / CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processInstance/incidents-tab.html -->
`;
