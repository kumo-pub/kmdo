---
slug: /cmd/mirror/index
---
# kmdo mirror index 命令文档
## 概述
kmdo mirror index 命令用于管理镜像仓库的组件索引，支持组件的添加、隐藏/显示、废弃/恢复操作，通过维护组件核心信息（名称、所有者、状态等），控制组件在镜像中的可见性和可用性，适配组件全生命周期管理场景。

## 命令结构
kmdo mirror index [COMMAND] [ARGUMENTS] [FLAGS]

## 基础命令列表
| 命令 | 描述 |
|------|------|
| kmdo mirror index | 显示 index 命令帮助信息（无参数时自动触发） |
| kmdo mirror index add | 从 JSON 文件添加组件到镜像索引 |
| kmdo mirror index hide | 隐藏/显示镜像索引中的组件（控制可见性） |
| kmdo mirror index deprecate | 标记/取消标记组件为废弃状态（提示组件过时） |

## 命令 Flags 总览
| 命令 | Flag | 简写 | 类型 | 默认值 | 描述 |
|------|------|------|------|--------|------|
| add | --dump | -d | 布尔值 | false | 生成组件配置 JSON 示例文件 |
| add | --json | -j | 字符串 | component.json | JSON 配置文件路径（生成/读取用） |
| hide | --force | -f | 布尔值 | false | 跳过确认，强制执行隐藏/显示操作 |
| hide | --unhide | -u | 布尔值 | false | 恢复组件可见性（而非隐藏） |
| deprecate | --force | -f | 布尔值 | false | 跳过确认，强制执行废弃/恢复操作 |
| deprecate | --undeprecate | -u | 布尔值 | false | 取消组件废弃标记（而非标记废弃） |

## 详细子命令说明
### 1. kmdo mirror index add
#### 功能
从 JSON 配置文件添加新组件到镜像索引，支持生成示例 JSON 文件供参考，JSON 文件需包含组件名称、所有者、描述等核心信息。
#### 用法
# 生成示例 JSON 文件（默认路径 component.json）
```shell
kmdo mirror index add --dump [--json <文件路径>]

# 从指定 JSON 文件添加组件
kmdo mirror index add --json <文件路径>

# 从默认文件（component.json）添加组件
kmdo mirror index add
#### 示例
# 生成示例文件到 component-example.json
kmdo mirror index add -d -j component-example.json

# 从自定义文件 my-component.json 添加组件
kmdo mirror index add -j my-component.json

# 从默认文件 component.json 添加组件
kmdo mirror index add
#### 输出说明
# 生成示例文件成功
success dump example json component file to: component-example.json
```
# 添加组件成功
success add component from file: my-component.json

### 2. kmdo mirror index hide
#### 功能
隐藏镜像索引中的组件（使其不可见，不删除数据），或通过 --unhide 恢复隐藏组件的可见性，默认需确认操作（--force 跳过确认）。
#### 用法

```shell
# 隐藏组件（需确认）
kmdo mirror index hide <component-name>

# 强制隐藏组件（无确认）
kmdo mirror index hide <component-name> --force

# 恢复组件可见性（需确认）
kmdo mirror index hide <component-name> --unhide

# 强制恢复组件可见性（无确认）
kmdo mirror index hide <component-name> -u -f
#### 示例
# 隐藏组件 mycomponent
kmdo mirror index hide mycomponent

# 强制隐藏组件 mycomponent
kmdo mirror index hide mycomponent -f

# 恢复组件 mycomponent 可见性
kmdo mirror index hide mycomponent -u
#### 输出说明
# 隐藏成功
success hide component from mirror: mycomponent

# 恢复可见成功
success unhide component from mirror: mycomponent

# 用户取消操作
user canceled

### 3. kmdo mirror index deprecate
#### 功能
标记组件为废弃状态（提示组件过时，不推荐使用），或通过 --undeprecate 取消废弃标记，默认需确认操作（--force 跳过确认）。
#### 用法
# 标记组件为废弃（需确认）
kmdo mirror index deprecate <component-name>

# 强制标记组件为废弃（无确认）
kmdo mirror index deprecate <component-name> --force

# 取消组件废弃标记（需确认）
kmdo mirror index deprecate <component-name> --undeprecate

# 强制取消组件废弃标记（无确认）
kmdo mirror index deprecate <component-name> -u -f
#### 示例
# 标记组件 mycomponent 为废弃
kmdo mirror index deprecate mycomponent

# 强制标记组件 mycomponent 为废弃
kmdo mirror index deprecate mycomponent -f

# 取消组件 mycomponent 的废弃标记
kmdo mirror index deprecate mycomponent -u
#### 输出说明
# 标记废弃成功
success deprecate component from mirror: mycomponent

# 取消废弃标记成功
success undeprecate component from mirror: mycomponent

# 用户取消操作
user canceled
```

## 注意事项
1. 所有子命令需指定正确参数：add 命令依赖 JSON 文件（缺失会报错），hide/deprecate 命令必须传入组件名称（否则触发帮助信息）。
2. 隐藏与废弃的区别：隐藏组件不可见，废弃组件可见但标记为过时，均不删除组件数据，可通过对应命令恢复状态。
3. --force 标志适用于自动化场景，执行前需确认操作对象正确性，避免误隐藏/废弃核心组件。
4. 生成的示例 JSON 文件包含组件必填字段，添加组件时需确保自定义 JSON 格式与示例一致，否则可能添加失败。
