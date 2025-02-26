import React from 'react';
import {registerEditorPlugin} from 'amis-editor-core';
import {
  BaseEventContext,
  BasePlugin,
  RendererPluginEvent
} from 'amis-editor-core';
import {getSchemaTpl} from 'amis-editor-core';
import {getEventControlConfig} from '../renderer/event-control/helper';

import type {SchemaObject} from 'amis/lib/Schema';

export class SearchBoxPlugin extends BasePlugin {
  // 关联渲染器名字
  rendererName = 'search-box';
  $schema = '/schemas/SearchBoxSchema.json';

  // 组件名称
  name = '搜索框';
  isBaseComponent = true;
  description =
    '用于展示一个简单搜索框，通常需要搭配其他组件使用。比如 page 配置 initApi 后，可以用来实现简单数据过滤查找，name keywords 会作为参数传递给 page 的 initApi。';
  docLink = '/amis/zh-CN/components/search-box';
  icon = 'fa fa-search';
  pluginIcon = 'search-box-plugin';
  tags = ['表单项'];

  scaffold: SchemaObject = {
    type: 'search-box',
    body: {
      type: 'tpl',
      tpl: '搜索框',
      wrapperComponent: '',
      inline: false
    },
    level: 'info'
  };

  previewSchema: any = {
    ...this.scaffold,
    className: 'text-left',
    showCloseButton: true
  };

  regions = [{key: 'body', label: '内容区', placeholder: '搜索框内容'}];

  // 事件定义
  events: RendererPluginEvent[] = [
    {
      eventName: 'search',
      eventLabel: '点击搜索',
      description: '点击搜索图标时触发',
      dataSchema: [
        {
          type: 'object',
          properties: {
            'event.data.value': {
              type: 'string',
              title: '搜索内容'
            }
          }
        }
      ]
    },
    {
      eventName: 'change',
      eventLabel: '值变化',
      description: '输入框值变化时触发',
      dataSchema: [
        {
          type: 'object',
          properties: {
            'event.data.value': {
              type: 'string',
              title: '搜索内容'
            }
          }
        }
      ]
    },
    {
      eventName: 'focus',
      eventLabel: '获取焦点',
      description: '输入框获取焦点时触发',
      dataSchema: [
        {
          type: 'object',
          properties: {
            'event.data.value': {
              type: 'string',
              title: '搜索内容'
            }
          }
        }
      ]
    },
    {
      eventName: 'blur',
      eventLabel: '失去焦点',
      description: '输入框失去焦点时触发',
      dataSchema: [
        {
          type: 'object',
          properties: {
            'event.data.value': {
              type: 'string',
              title: '搜索内容'
            }
          }
        }
      ]
    }
  ];

  notRenderFormZone = true;
  panelTitle = '搜索框';
  panelJustify = true;
  panelBodyCreator = (context: BaseEventContext) => {
    return getSchemaTpl('tabs', [
      {
        title: '属性',
        body: getSchemaTpl('collapseGroup', [
          {
            title: '基础',
            body: [
              getSchemaTpl('formItemName', {
                required: true
              }),
              getSchemaTpl('switch', {
                label: '可清除',
                name: 'clearable'
              }),
              getSchemaTpl('switch', {
                label: '清除后立即搜索',
                name: 'clearAndSubmit'
              }),
              getSchemaTpl('switch', {
                label: '立即搜索',
                name: 'searchImediately'
              }),
              getSchemaTpl('switch', {
                label: 'mini版本',
                name: 'mini'
              }),
              getSchemaTpl('switch', {
                label: '加强样式',
                name: 'enhance',
                visibleOn: '!data.mini'
              }),
              getSchemaTpl('placeholder')
            ]
          },
          getSchemaTpl('status')
        ])
      },
      {
        title: '外观',
        body: getSchemaTpl('collapseGroup', [
          getSchemaTpl('style:classNames', {isFormItem: false})
        ])
      },
      {
        title: '事件',
        className: 'p-none',
        body: getSchemaTpl('eventControl', {
          name: 'onEvent',
          ...getEventControlConfig(this.manager, context)
        })
      }
    ]);
  };
}
registerEditorPlugin(SearchBoxPlugin);
