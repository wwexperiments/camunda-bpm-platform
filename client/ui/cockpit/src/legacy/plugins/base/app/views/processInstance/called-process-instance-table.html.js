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

module.exports = `<!-- # CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processInstance/called-process-instance-table.html -->
<div cam-widget-loader
     loading-state="{{ loadingState }}"
     text-empty="{{ 'PLUGIN_CALLED_PROCESS_NO_PROCESS_INSTANCES' | translate }}">
  <table class="called-process-instance cam-table">

    <thead sortable-table-head
           head-columns="headColumns"
           on-sort-change="onSortChange(sortObj)"
           default-sort="sortObj">
    </thead>

    <tbody>
      <tr ng-repeat="calledProcessInstance in calledProcessInstances | orderBy:sortObj.sortBy:sortObj.sortReverse">
        <td class="state">
          <div ng-if="calledProcessInstance.incidents.length > -1" state-circle incidents="calledProcessInstance.incidents"></div>
          <div ng-if="calledProcessInstance.incidents == undefined">
            <span class="glyphicon glyphicon-refresh animate-spin"></span>
          </div>
        </td>
        <td class="called-process-instance"
            cam-widget-clipboard="calledProcessInstance.id">
          <a href="#/process-instance/{{ calledProcessInstance.id }}/runtime">
            {{ calledProcessInstance.id }}
          </a>
        </td>

        <td class="process-definition"
            cam-widget-clipboard="calledProcessInstance.processDefinitionId">
          <a href="#/process-definition/{{ calledProcessInstance.processDefinitionId }}/runtime?parentProcessDefinitionId={{ processInstance.definitionId }}">
            {{ calledProcessInstance.processDefinitionLabel}}
          </a>
        </td>

        <td class="activity">
          <span ng-if="!!calledProcessInstance.instance"
                cam-widget-clipboard="calledProcessInstance.instance.id">
            <a ng-href="#/process-instance/{{ processInstance.id }}/runtime?tab=called-process-instances-tab&{{ getSearchQueryForSearchType(calledProcessInstance.instance.id) }}">
              {{ calledProcessInstance.instance.name }}
            </a>
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</div>
<!-- / CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processInstance/called-process-instance-table.html -->
`;
