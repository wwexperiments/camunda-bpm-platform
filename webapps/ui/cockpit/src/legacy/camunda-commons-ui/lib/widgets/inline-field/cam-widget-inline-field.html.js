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

module.exports = `<span ng-show="!editing"
      ng-click="startEditing()"
      ng-transclude
      class="view-value">
</span>

<span ng-if="editing && (varType === 'datetime' || varType === 'date' || varType === 'time')"
      class="preview">
  {{ dateValue | camDate }}
</span>

<span ng-if="editing"
      ng-form
      name="inlineForm"
      class="edit">

  <input ng-if="simpleField && !isNumber"
         class="form-control"
         type="{{ varType }}"
         ng-model="editValue"
         ng-keydown="handleKeydown($event)"
         placeholder="{{ placeholder }}" />

   <input ng-if="isNumber"
          name="numberField"
          class="form-control"
          ng-pattern="/^[0-9]{1,7}$/"
          ng-model="editValue"
          ng-keydown="handleKeydown($event)"
          placeholder="{{ placeholder }}" />


  <span ng-show="varType === 'datetime' || varType === 'date' || varType === 'time'"
        class="cam-widget-inline-field field-control datepicker">

    <div class="datepicker"
                uib-datepicker
                ng-if="varType === 'datetime' || varType === 'date'"
                type="text"
                ng-required="true"
                is-open="datePickerOptions.isOpen"
                show-button-bar="false"
                ng-click="$event.stopPropagation()"
                ng-keydown="trapKeyboard($event, true); cancelOnEsc($event);"

                ng-model="dateValue"
                ng-change="changeDate(this)"></div>

    <div class="timepicker"
                uib-timepicker
                ng-if="varType === 'datetime' || varType === 'time'"
                show-meridian="false"

                ng-model="dateValue"
                ng-keydown="cancelOnEsc($event);"
                ng-change="changeDate(this)"></div>
  </span>

  <input ng-if="varType === 'option' && options[0].value"
         class="form-control"
         type="text"
         ng-model="editValue"
         ng-keydown="handleKeydown($event)"
         uib-typeahead="option as option.value for option in options | filter:$viewValue:instantTypeahead"
         typeahead-on-select="saveSelection($item)"
         typeahead-focus-first="!disableAutoselect"
         instant-typeahead />
  <input ng-if="varType === 'option' && !options[0].value"
         class="form-control"
         type="text"
         ng-model="editValue"
         ng-keydown="handleKeydown($event)"
         uib-typeahead="option for option in options | filter:$viewValue:instantTypeahead"
         typeahead-on-select="saveSelection($item)"
         typeahead-focus-first="!disableAutoselect"
         instant-typeahead />

  <span ng-show="varType !== 'option'"
        class="cam-widget-inline-field btn-group">
    <button type="button"
            class="btn btn-xs btn-default"
            ng-click="changeType()"
            ng-if="flexible">
      <span class="glyphicon"
            ng-class="'glyphicon-' + (varType === 'text' ? 'calendar' : 'pencil')"></span>
    </button>

    <button type="button"
            class="btn btn-xs btn-default"
            ng-style="{visibility: !isNumber || inlineForm.numberField.$valid ? 'visible' : 'hidden'}"
            ng-click="applyChange($event);"
            ng-keydown="cancelOnEsc($event);">
      <span class="glyphicon glyphicon-ok"></span>
    </button>

    <button type="button"
            class="btn btn-xs btn-default"
            ng-click="cancelChange($event)"
            ng-keydown="trapKeyboard($event); cancelOnEsc($event);">
      <span class="glyphicon glyphicon-remove"></span>
    </button>
  </span>
</span>
`;
