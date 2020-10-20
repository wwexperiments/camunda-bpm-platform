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

module.exports = `<!-- # CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/jobDefinition/app/actions/override-job-priority/override-job-priority-dialog.html -->
<div class="modal-header">
  <h3>{{ 'PLUGIN_JOBDEFINITION_ACTION_OVERRIDE_JP' | translate }}</h3>
</div>

<div class="job-definition-override-job-priority modal-body">
  <div notifications-panel></div>

  <div ng-hide="status === 'SUCCESS' || status === 'FAIL'">

    <p>{{ 'PLUGIN_JOBDEFINITION_ACTION_OVERRIDE_TEXT' | translate }}</p>

    <form class="form-horizontal"
          name="overrideJobPriorityForm"
          novalidate
          request-aware
          ng-submit="isValid() && submit()">

      <fieldset>

        <div class="form-group" ng-show="hasOverridingJobPriority()">
          <label class="col-xs-4 control-label"
                 for="execute">
            {{ 'PLUGIN_JOBDEFINITION_ACTION_EXECUTE' | translate }}
            <span class="glyphicon glyphicon-question-sign"
                  uib-tooltip="{{ 'PLUGIN_JOBDEFINITION_ACTION_EXECUTE_TOOLTIP' | translate }}"
                  tooltip-placement="right">
            </span>
          </label>

          <div class="col-xs-8">
            <div class="radio">
              <label>
                <input ng-model="setJobPriority"
                       ng-value="false"
                       type="radio"
                       name="execute" />
                {{ 'PLUGIN_JOBDEFINITION_ACTION_CLEAR_OVERR' | translate }}
              </label>
            </div>

            <div class="radio">
              <label>
                <input ng-model="setJobPriority"
                       ng-value="true"
                       type="radio"
                       name="execute" />
                {{ 'PLUGIN_JOBDEFINITION_ACTION_SET_OVERR' | translate }}
              </label>
            </div>
          </div>
        </div>

        <div class="form-group" ng-show="setJobPriority">
          <label class="col-xs-4 control-label"
                 for="priority">
            {{ 'PLUGIN_JOBDEFINITION_ACTION_PRIORITY' | translate }}
            <span class="glyphicon glyphicon-question-sign"
                  uib-tooltip="{{ 'PLUGIN_JOBDEFINITION_ACTION_PRIORITY_TOOLTIP' | translate }}"
                  tooltip-placement="right">
            </span>
          </label>

          <div class="col-xs-8">
            <input name="priority"
                   ng-model="data.priority"
                   class="form-control"
                   numeric integer="true"
                   required />
            <p class="invalid"
               ng-show="this.overrideJobPriorityForm.priority.$error.numeric">
              {{ 'PLUGIN_JOBDEFINITION_ACTION_INVALID_VALUE' | translate }}
            </p>
          </div>
        </div>

        <div class="form-group" ng-show="setJobPriority">
          <label class="col-xs-4 control-label"
                 for="includeJobsPriority">
            {{ 'PLUGIN_JOBDEFINITION_ACTION_INCLUDE_EXISTING_JOB' | translate }}
            <span class="glyphicon glyphicon-question-sign"
                  uib-tooltip="{{ 'PLUGIN_JOBDEFINITION_ACTION_INCLUDE_EXISTING_JOB_TOOLTIP' | translate }}"
                  tooltip-placement="right">
            </span>
          </label>

          <div class="col-xs-8 checkbox">
            <label>
              <input name="includeJobsPriority"
                     type="checkbox"
                     ng-model="data.includeJobs" />
            </label>
          </div>
        </div>

      </fieldset>
    </form>

    <p>
      {{ 'PLUGIN_JOBDEFINITION_ACTION_TEXT_1' | translate }}
    </p>

  </div>

  <div ng-show="status === 'SUCCESS'">
    <p ng-show="setJobPriority"
       translate="PLUGIN_JOBDEFINITION_ACTION_TEXT_2"
       translate-values="{data: data.priority}">
    </p>
    <p ng-hide="setJobPriority">
      {{ 'PLUGIN_JOBDEFINITION_ACTION_TEXT_3' | translate }}
    </p>
  </div>

  <div ng-show="status === 'FAIL'">
    <p ng-show="setJobPriority"
       translate="PLUGIN_JOBDEFINITION_ACTION_TEXT_4"
       translate-values="{data: data.priority}">
    </p>
    <p ng-hide="setJobPriority">
      {{ 'PLUGIN_JOBDEFINITION_ACTION_TEXT_5' | translate }}
    </p>
  </div>
</div>

<div class="modal-footer">
  <button class="btn btn-link"
          ng-click="close(status)"
          ng-disabled="status === 'PERFORM_UDPATE'"
          ng-hide="status === 'SUCCESS' || status === 'FAIL'">
    {{ 'PLUGIN_JOBDEFINITION_ACTION_CLOSE' | translate }}
  </button>

  <button type="submit"
          class="btn btn-primary"
          ng-click="submit()"
          ng-hide="setJobPriority || status === 'SUCCESS' || status === 'FAIL'"
          ng-disabled="!isValid() || status === 'PERFORM_UDPATE'">
    {{ 'PLUGIN_JOBDEFINITION_ACTION_CLEAR' | translate }}
  </button>

  <button type="submit"
          class="btn btn-primary"
          ng-click="submit()"
          ng-hide="!setJobPriority || status === 'SUCCESS' || status === 'FAIL'"
          ng-disabled="!isValid() || status === 'PERFORM_UDPATE'">
    {{ 'PLUGIN_JOBDEFINITION_ACTION_OVERRIDE' | translate }}
  </button>

  <button class="btn btn-primary"
          ng-click="close(status)"
          ng-show="status === 'SUCCESS' || status === 'FAIL'">
    {{ 'PLUGIN_JOBDEFINITION_ACTION_OK' | translate }}
  </button>
</div>
<!-- / CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/jobDefinition/app/actions/override-job-priority/override-job-priority-dialog.html -->
`;
