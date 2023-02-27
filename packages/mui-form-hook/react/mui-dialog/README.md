## UseDialog 组件的使用

---   

> 参数说明

|   参数名    | 是否必填 |                类型                |  默认值 | 描述                                                                                           |
| :---------: | :------: | :--------------------------------: | :----: | :--------------------------------------------------------------------------------------------- |
|    open     |   true   |              boolean               |        | 控制弹窗的打开状态                                                                             |
| handleClose |   true   |              Function              |        | 当组件请求关闭时触发回调,function(event: object, reason: string) => void event：回调的事件源。 |
|   scroll    |  false   |            `body paper`            | paper  | 确定滚动对话框的容器。                                                                         |
|  maxWidth   |  false   |       `xs sm md lg xl false`       | false | 确定对话框的最大宽度。对话框宽度随着屏幕的大小而增加。设置为 false 禁用 maxWidth。             |
| titleColor  |  false   |           `white green`            | white  | 弹窗标题的背景色                                                                               |
|    title    |  false   |      `string React.ReactNode`      |      | 弹窗的标题展示                                                                                 |
|  children   |  false   |          React.ReactNode           |      | 弹窗 Content 区域内容填充                                                                      |
| actionsList |  false   | `React.ReactNode[] ButtonProps[] ` |      | 弹窗 Actions 区域内容填充                                                                      |
---   



> 使用说明 
---

* 使用 import 引入即可
```
  import { UseDialog } from '@/pages/component/index'
```

* 具体使用方法
``` jsx

  const [isOpen, SETisOpen] = useState(false)

  // 弹窗标题 组件形式加入
  const CustomTitle = () => {
    return <div>
      这是弹窗标题
    </div>
  }

  // 组件形式
  const actionList: React.ReactNode[] = [
    <Button size='small' variant="outlined" onClick={() => { console.log('取消');SETisOpen(false)} }>取消</Button>,
    <Button size='small' variant="contained">确定</Button>
  ]
  // 对象数据形式
  const actionList2:ButtonProps[] = [
    { size: 'small', variant: 'outlined', children: '取消' },
    { size: 'small', variant: 'contained', children: '确定', onClick: () => {console.log('确定'); SETisOpen(false)} },
  ]

  // children组件作为 Content 内容填充
  const ContentFill = () => {
    return <div>
      这是children组件作为 Content 内容填充
    </div>
  }

  /** 
    <UseDialog 
      open={isOpen} 
      handleClose={() => SETisOpen(false)}
      scroll='body'
      maxWidth='md'
      titleColor='white'
      // title='弹窗标题'
      title={<CustomTitle />}
      //actionsList={actionList}
      actionsList={actionList2}
      children={<ContentFill />}
    />
  */

  //  或

  <UseDialog 
    open={isOpen} 
    handleClose={() => SETisOpen(false)}
    scroll='body'
    maxWidth='md'
    titleColor='white'
    // title='弹窗标题'
    title={<CustomTitle />}
    //actionsList={actionList}
    actionsList={actionList2}
  >
    <ContentFill />
  </UseDialog>

```