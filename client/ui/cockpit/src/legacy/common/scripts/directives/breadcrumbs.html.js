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

module.exports = `<!-- # CE - camunda-bpm-webapp/ui/common/scripts/directives/breadcrumbs.html -->
<ul class="cam-breadcrumb">
  <li ng-class="{ active: !breadcrumbs || !breadcrumbs.length }">
    <a href="#/"
       class="text">{{ 'DASHBOARD_DASHBOARD' | translate }}</a>
  </li>

  <li ng-repeat="(index, crumb) in breadcrumbs"
      ng-class="{ active: !!$last }"
      data-index="{{ index }}">
    <span class="divider" ng-click="crumb.hidden = !crumb.hidden">{{ crumb.divider || divider }}</span>

    <!-- using ng-show to separate logic of creating breadcrumbs elements from
         logic of dynamically showing and hidding them -->
    <a ng-if="!!crumb.href && !$last"
       ng-show="!crumb.hidden"
       href="{{ getHref(crumb) }}"
       class="text">{{ crumb.label | translate }}</a>

    <span ng-if="!!crumb.href && !!$last"
          ng-show="!crumb.hidden"
          class="text">{{ crumb.label }}</span>

    <a ng-if="!crumb.href && !!crumb.callback"
       ng-show="!crumb.hidden"
       ng-click="crumb.callback(index, breadcrumbs)"
       href
       class="text">{{ crumb.label }}</a>

    <span ng-if="!crumb.href && !crumb.callback"
          ng-show="!crumb.hidden"
          class="text">{{ crumb.label | translate }}</span>

    <span ng-if="(crumb.type === 'processDefinition' && crumb.processDefinition.suspended) || (crumb.type === 'processInstance' && crumb.processInstance.suspended)"
          ng-show="!crumb.hidden"
          class="badge badge-warning badge-suspended"
          uib-tooltip="{{ 'BREAD_CRUMBS_CURRENTLY_SUSPENDED' | translate }}"
          tooltip-placement="bottom">
      <span class="glyphicon glyphicon-pause white"></span>
    </span>

    <span ng-if="!!crumb.choices && crumb.choices.length === 1" ng-show="!crumb.hidden">
      <span class="divider">:</span>
      {{ getActiveChoice(crumb.choices) | translate }}
    </span>

    <span ng-if="!!crumb.choices && crumb.choices.length === 2"
          class="switcher"
          ng-show="!crumb.hidden"
          ng-init="choices = sortedChoices(crumb.choices)">
      <span class="divider">:</span>

      <span class="current">{{ choices[0].label | translate}}</span>
      <span class="divider">|</span>
      <a href ng-click="selectChoice($event, choices[1])">{{ choices[1].label | translate}}</a>
    </span>

    <span ng-if="!!crumb.choices && crumb.choices.length > 2"
          ng-show="!crumb.hidden"
          class="dropdown"
          uib-dropdown>
      <span class="divider">:</span>

      <a class="dropdown-toggle"
         uib-dropdown-toggle
         ng-show="!crumb.hidden"
         href>
        {{ getActiveChoice(crumb.choices) }}
        <span class="caret"></span>
      </a>

      <ul class="dropdown-menu dropdown-menu-right" ng-show="!crumb.hidden" uib-dropdown-menu>
        <li ng-repeat="choice in crumb.choices"
            ng-class="{active: choice.active}">
          <a href ng-click="selectChoice($event, choice)">{{ choice.label }}</a>
        </li>
      </ul>
    </span>
  </li>
</ul>
<!-- / CE - camunda-bpm-webapp/ui/common/scripts/directives/breadcrumbs.html -->
`;
