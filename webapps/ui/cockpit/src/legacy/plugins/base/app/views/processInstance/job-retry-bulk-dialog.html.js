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

module.exports = `<!-- # CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processInstance/job-retry-bulk-dialog.html -->
<div class="modal-header">
  <h3>{{ 'PLUGIN_JOB_RETRY_BULK_INCREMENT_RETRIES' | translate }}</h3>
</div>

<div class="job-retry-bulk modal-body">
  <div notifications-panel></div>

  <form name="selectFailedJobsForm"
        ng-hide="status === 'finished' || status === 'performing'">
    <fieldset>
      <p>{{ 'PLUGIN_JOB_RETRY_BULK_SELECT_FAILED_JOB' | translate }}</p>
      <div cam-widget-loader
           loading-state="{{ loadingState }}"
           text-empty="{{ 'PLUGIN_JOB_RETRY_BULK_THERE_ARE_NO_FAILED_JOBS' | translate }}">
        <table class="cam-table">
          <thead>
            <tr>
              <th class="row-select">
                <input type="checkbox"
                       title="Select all"
                       ng-model="allJobsSelected"
                       ng-change="selectAllJobs(allJobsSelected)">
              </th>
              <th class="job-id uuid">{{ 'PLUGIN_JOB_RETRY_BULK_ID' | translate }}</th>
              <th class="scope">{{ 'PLUGIN_JOB_RETRY_BULK_SCOPE' | translate }}</th>
              <th class="exception">{{ 'PLUGIN_JOB_RETRY_BULK_EXCEPTION' | translate }}</th>
            </tr>
          </thead>

          <tbody>
            <tr ng-repeat="job in failedJobs">
              <td class="row-select">
                <input type="checkbox"
                       ng-model="job.selected"
                       ng-change="selectFailedJob(job)">
              </td>

              <td class="job-id uuid">{{ job.id }}</td>

              <td class="scope">{{ job.instance.name }}</td>

              <td class="exception">{{ job.exceptionMessage }}</td>
            </tr>
          </tbody>
        </table>


        <ul uib-pagination ng-if="jobPages.total > jobPages.size"
                    class="pagination-sm"

                    page="jobPages.current"
                    ng-model="jobPages.current"

                    total-items="jobPages.total"
                    items-per-page="jobPages.size"

                    max-size="7"
                    boundary-links="true"></ul>
      </div>
    </fieldset>
  </form>

  <div ng-show="status === 'finished' || status === 'performing'">

    <table class="cam-table">
      <thead>
        <tr>
          <th class="job-id uuid">{{ 'PLUGIN_JOB_RETRY_BULK_ID' | translate }}</th>
          <th class="scope">{{ 'PLUGIN_JOB_RETRY_BULK_SCOPE' | translate }}</th>
          <th class="status">{{ 'PLUGIN_JOB_RETRY_BULK_STATUS' | translate }}</th>
        </tr>
      </thead>

      <tbody>
        <tr ng-repeat="job in showJobsRetried">
          <td class="job-id uuid">{{ job.id }}</td>

          <td class="scope">{{ job.instance.name }}</td>

          <td class="status">
            <span ng-show="job.status && job.status === 'performing'">
              <span class="glyphicon glyphicon-loading"></span>
            </span>
            <span ng-show="job.status && job.status === 'successful'">
              <span class="glyphicon glyphicon-ok"></span>&nbsp;{{ 'PLUGIN_JOB_RETRY_BULK_SUCCESSFUL' | translate }}
            </span>
            <span ng-show="job.status && job.status === 'failed'">
              <span class="glyphicon glyphicon-remove"></span>&nbsp;{{ 'PLUGIN_JOB_RETRY_BULK_FAILED' | translate }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>


    <ul uib-pagination ng-if="summarizePages.total > summarizePages.size"
                class="pagination-sm"

                page="summarizePages.current"
                ng-model="summarizePages.current"

                total-items="summarizePages.total"
                items-per-page="summarizePages.size"

                max-size="7"
                boundary-links="true"></ul>
  </div>

</div>

<div class="modal-footer">
  <button class="btn btn-default"
          ng-click="close()"
          ng-hide="status === 'finished' || status === 'performing'">
    {{ 'PLUGIN_JOB_RETRY_BULK_CLOSE' | translate }}
  </button>

  <button class="btn btn-primary"
          ng-click="retryFailedJobs(selectedFailedJobIds)"
          ng-disabled="!failedJobs || !failedJobs.length || !selectedFailedJobIds.length"
          ng-hide="status === 'finished' || status === 'performing'">
    {{ 'PLUGIN_JOB_RETRY_BULK_RETRY' | translate }}
    <span ng-if="selectedFailedJobIds.length > 1"
          translate="PLUGIN_JOB_RETRY_BULK_JOBS"
          translate-values="{count: selectedFailedJobIds.length}"></span>
  </button>

  <button class="btn btn-primary"
          ng-click="close()"
          ng-disabled="status === 'performing'"
          ng-show="status === 'performing' || status === 'finished'">
    {{ 'PLUGIN_JOB_RETRY_BULK_OK' | translate }}
  </button>
</div>
<!-- / CE - camunda-bpm-webapp/webapp/src/main/resources-plugin/base/app/views/processInstance/job-retry-bulk-dialog.html -->
`;
